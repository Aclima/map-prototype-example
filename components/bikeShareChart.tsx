import { useFetchBikeShare } from "@/hooks/useFetchBikeShare";
import { AxisBottom } from "@visx/axis";
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
const height = 200;
const margin = { top: 10, bottom: 40, left: 10, right: 10 };
const xMax = width - margin.left - margin.right;
const yMax = height - margin.top - margin.bottom;
const x = (d) => d.state;
const y = (d) => d.count;

const BikeShareChart: React.FC = () => {
  const { data } = useFetchBikeShare();
  if (!data) {
    return null;
  }
  const chartData = parseBikeSharesByState(data);
  const xScale = scaleBand({
    range: [0, xMax],
    round: true,
    domain: chartData.map(x),
    padding: 0.4,
  });
  const yScale = scaleLinear({
    range: [yMax, 0],
    round: true,
    domain: [0, Math.max(...chartData.map(y))],
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
          {chartData.map((d) => {
            const barHeight = yMax - yPoint(d);
            return (
              <Bar
                x={xPoint(d)}
                y={yMax - barHeight}
                height={barHeight}
                width={xScale.bandwidth()}
                fill="#fc2e1c"
                key={d.state}
              />
            );
          })}
          <AxisBottom
            scale={xScale}
            top={yMax + margin.top}
            numTicks={chartData.length}
            label="State"
            stroke="#000000"
            tickLabelProps={() => ({
              fill: "#000000",
              fontSize: 5,
            })}
          />
        </Group>
      </svg>
    </div>
  );
};

export default BikeShareChart;
