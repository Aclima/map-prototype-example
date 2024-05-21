import { useFetchBikeShare } from "@/hooks/useFetchBikeShare";
import { BarChart } from "@mantine/charts";

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

const BikeShareChartMantine: React.FC = () => {
  const { data } = useFetchBikeShare();
  if (!data) {
    return null;
  }
  const chartData = parseBikeSharesByState(data);
  return (
    <BarChart
      h={575}
      data={chartData}
      dataKey="state"
      tickLine="y"
      orientation="vertical"
      xAxisLabel="Count"
      yAxisLabel="State"
      xAxisProps={{ orientation: "top", height: 100}}
      yAxisProps={{ interval: 0, padding: { top: 25}}}
      gridAxis="y"
      series={[{ name: "count", color: "red" }]}
    />
  );
};

export default BikeShareChartMantine;
