import { useFetchPointDataByH3 } from "@/hooks/useFetchPointDataByH3";
import { ScatterChart } from "@mantine/charts";
import { Alert } from "@mantine/core";
import classes from "./clickedElement.module.css";

export const MeasurementScatterPlot: React.FC<{ modality: string; h3Id: string }> = ({
  modality,
  h3Id,
}) => {
  const { data } = useFetchPointDataByH3({ modality, h3Id });
  const chartData = data
    ? [
        {
          color: "blue.5",
          name: "Group 1",
          data: data.map((point) => {
            return {
              timestamp: new Date(point.timestamp).getTime(),
              value: parseFloat(point.value),
            };
          }),
        },
      ]
    : [];
  return (
    <>
      <ScatterChart
        className={classes.chart}
        h={350}
        data={chartData}
        dataKey={{ x: "timestamp", y: "value" }}
        xAxisLabel="Observation Time"
        yAxisLabel="Concentration"
        xAxisProps={{
          type: "number",
          dataKey: "timestamp",
          domain: ["auto", "auto"],
          tickFormatter: (value) =>
            `${new Date(value).toLocaleTimeString()} ${new Date(
              value
            ).toLocaleDateString()}`,
        }}
      />
      <Alert title="Warning: Incomplete Data" color="orange">
        {data
          ? "This chart shows only the first 5 measurements in this hexbin for demonstration purposes. Do not use to draw conclusions about the data or for ANY external usage."
          : "Loading..."}
      </Alert>
    </>
  );
};