import { useFetchBikeShare } from "@/hooks/useFetchBikeShare";
import { BarChart } from "@mantine/charts";
import classes from "./bikeShareChart.module.css";

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

const BikeShareChart: React.FC = () => {
  const { data } = useFetchBikeShare();
  if (!data) {
    return null;
  }
  const chartData = parseBikeSharesByState(data);
  return (
    <div className={classes.chart}>
      <BarChart
        h={600}
        data={chartData}
        dataKey="state"
        tickLine="y"
        orientation="vertical"
        xAxisProps={{
          orientation: "top",
          label: { position: "insideTop", offset: 0, value: "Count" },
        }}
        yAxisProps={{
          interval: 0,
          padding: { top: 5 },
          label: {
            position: "insideLeft",
            offset: 5,
            value: "State",
            angle: -90,
          },
        }}
        gridAxis="y"
        series={[{ name: "count", color: "orange" }]}
      />
    </div>
  );
};

export default BikeShareChart;
