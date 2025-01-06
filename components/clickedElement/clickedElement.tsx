import React from 'react';
import { useClickedElement, useFelt } from '@/utils/felt';
import { Table } from '@mantine/core';
import { usePollutant } from '@/context/pollutant';
import { MeasurementScatterPlot } from './scatterPlot';



const ClickedElement: React.FC = () => {
  const felt = useFelt();
  const clickedElement = useClickedElement(felt);
  const pollutant = usePollutant();

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

            <MeasurementScatterPlot
              pollutant={pollutant.pollutant}
              h3Id={clickedElement?.properties.hexagons}
            />

        </div>
      ) : (
        <p>No element clicked yet.</p>
      )}
    </div>
  );
};

export default ClickedElement;
