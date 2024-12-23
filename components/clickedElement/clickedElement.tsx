import React from 'react';
import { useClickedElement, useFelt } from '@/utils/felt';
import { Table } from '@mantine/core';
import { usePollutant } from '@/context/pollutant';
import { useFetchPointDataByH3 } from '@/hooks/useFetchPointDataByH3';
import { ScatterChart } from "@mantine/charts";

const PointChart: React.FC = ({ pointData }) => {
  const data = [
    {
      color: "blue.5",
      name: "Group 1",
      data: pointData.map((point) => {return {timestamp: new Date(point.timestamp).getTime(), value: parseFloat(point.value)}}),
    },
  ];
  console.log(data);
  return (
    <ScatterChart
      h={350}
      data={data}
      dataKey={{ x: "timestamp", y: "value" }}
      xAxisLabel="Time"
      yAxisLabel="Value"
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
  );
}

const ClickedElement: React.FC = () => {
  const felt = useFelt();
  const clickedElement = useClickedElement(felt);
  const pollutant = usePollutant();
  const {data, error, isLoading} = useFetchPointDataByH3({ modality: pollutant, h3Id: clickedElement?.properties.hexagons });

  return (
    <div>
      {clickedElement ? (
        <div>
          <h2>Clicked Hexagon</h2>
          <Table variant="vertical" layout="fixed" withTableBorder>
            <Table.Tbody>
              <Table.Tr>
                <Table.Th w={160}>Hex ID</Table.Th>
                <Table.Td>{clickedElement.properties.hexagons}</Table.Td>
              </Table.Tr>

              <Table.Tr>
                <Table.Th>Mean</Table.Th>
                <Table.Td>
                  {clickedElement.properties.mean.toFixed(2)} µg/m³
                </Table.Td>
              </Table.Tr>

              <Table.Tr>
                <Table.Th>Median</Table.Th>
                <Table.Td>
                  {clickedElement.properties.median.toFixed(2)} µg/m³
                </Table.Td>
              </Table.Tr>

              <Table.Tr>
                <Table.Th>Standard deviation</Table.Th>
                <Table.Td>
                  {clickedElement.properties.std.toFixed(2)} µg/m³
                </Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
          {data && <PointChart pointData={data} />}
        </div>
      ) : (
        <p>No element clicked yet.</p>
      )}
    </div>
  );
};

export default ClickedElement;
