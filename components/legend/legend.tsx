import { Paper, Text } from '@mantine/core';
import classes from './legend.module.css';
import { usePollutant } from '@/context/pollutant';
import { useSelectedFeltLayers } from '@/utils/felt';

const Legend = () => {
  const { pollutant } = usePollutant();
  const selectedFeltLayer = useSelectedFeltLayers(pollutant);
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
