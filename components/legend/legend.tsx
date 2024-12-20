import { Paper, Text } from '@mantine/core';
import classes from './legend.module.css';
import { usePollutant } from '@/context/pollutant';
import {
  //   useFelt,
  useSelectedFeltLayers,
  //   useHoveredElement,
} from '@/utils/felt';

const Legend = () => {
  const { pollutant } = usePollutant();
  //   const felt = useFelt();
  const selectedFeltLayer = useSelectedFeltLayers(pollutant);
  //   const hoveredElement = useHoveredElement(felt);
  // @ts-ignore

  const colorScale = selectedFeltLayer?.[0]?.style?.paint?.color ?? [];

  return (
    <Paper shadow="md" p="xl" className={classes.legend}>
      <Text>{pollutant}</Text>
      <div className={classes.swatchContainer}>
        {colorScale?.map((color: string) => (
          <div
            key={color}
            className={classes.swatch}
            style={{ background: color }}
          />
        ))}
      </div>
    </Paper>
  );
};

export default Legend;
