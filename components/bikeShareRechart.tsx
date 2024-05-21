import { useFetchBikeShare } from "@/hooks/useFetchBikeShare";
import {
  XAxis,
  YAxis,
  Bar,
  BarChart,
} from "recharts";
import classes from "./bikeShareRechart.module.css";

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

const BikeShareChartRechart: React.FC = () => {
  const { data } = useFetchBikeShare();
  if (!data) {
    return null;
  }
    const chartData = parseBikeSharesByState(data);
  return (
    <div className={classes.chart}>
      <BarChart
        width={300}
        height={600}
        data={chartData}
        layout="vertical"
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis
          orientation="top"
          type="number"
          label={{ value: "Count", position: "insideTop", offset: -2}}
        >
        </XAxis>
        <YAxis
          dataKey="state"
          type="category"
          interval={0}
          label={{ value: "State", angle: -90, position: "insideLeft" }}
        ></YAxis>
        <Bar dataKey="count" fill="#fc2e1c" barSize={20} />
      </BarChart>
    </div>
  );
};

export default BikeShareChartRechart;
