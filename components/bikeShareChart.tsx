import { useFetchBikeShare } from "@/hooks/useFetchBikeShare";
import { AxisLeft, AxisTop } from "@visx/axis";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear } from "@visx/scale";
import { Bar } from "@visx/shape";

const parseBikeSharesByState = (data) => {
  const stateAggregatedData = data.features.reduce((acc, feature) => {
    const state = feature.attributes.state;
    if (!acc[state]) {
      acc[state] = 0;
    }
    acc[state] += 1;
    return acc;
  }, {});
  return Object.keys(stateAggregatedData)
    .map((state) => {
      return {
        state,
        count: stateAggregatedData[state],
      };
    })
    .sort((a, b) => b.count - a.count);
};

const width = 350;
const height = 550;
const margin = { top: 20, bottom: 10, left: 60, right: 10 };
const xMax = width - margin.left - margin.right;
const yMax = height - margin.top - margin.bottom;
const x = (d) => d.count;
const y = (d) => d.state;

const BikeShareChart: React.FC = () => {
  const { data } = useFetchBikeShare();
  if (!data) {
    return null;
  }
  const chartData = parseBikeSharesByState(data);
  const yScale = scaleBand({
    range: [0, yMax],
    round: true,
    domain: chartData.map(y),
    padding: 0.3,
  });
  const xScale = scaleLinear({
    range: [0, xMax],
    round: true,
    domain: [0, Math.max(...chartData.map(x))],
  });
  const compose = (scale, accessor) => (data) => scale(accessor(data));
  const xPoint = compose(xScale, x);
  const yPoint = compose(yScale, y);
  return (
    <div>
      <style jsx>{`
        div {
          background-color: #fff;
          padding: 1rem;
        }
      `}</style>
      <svg width={width} height={height}>
        <Group>
          {chartData.map((d, i) => {
            if (i===0) {
                console.log(d);
                console.log("xmax", xMax);
                console.log("xpoint", xPoint(d));
            }
            return (
              <Bar
                x={margin.left}
                y={yPoint(d) + margin.top}
                height={yScale.bandwidth()}
                width={xPoint(d)}
                fill="#fc2e1c"
                key={d.state}
              />
            );
          })}
          <AxisLeft
            scale={yScale}
            label="State"
            stroke="#000000"
            tickStroke="#000000"
            numTicks={chartData.length}
            left={margin.left}
            top={margin.top}
            tickLabelProps={() => ({
              fill: "#000000",
              fontSize: 8,
              textAnchor: "end",
            })}
          />
          <AxisTop
            top={40}
            left={margin.left}
            scale={xScale}
            label="Bikeshare Count"
            stroke="#000000"
            tickLabelProps={() => ({
              fill: "#000000",
              fontSize: 11,
            })}
          />
        </Group>
      </svg>
    </div>
  );
};

export default BikeShareChart;
