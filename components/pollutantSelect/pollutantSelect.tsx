import { use, useCallback, useMemo, useState } from 'react';
import { Select } from '@mantine/core';
import { Layer, LayerGroup } from '@feltmaps/js-sdk';
import useSWR from 'swr';

import { assembleLayerTree, useFelt } from '@/utils/felt';

export const POLLUTANTS = {
  ['pm_2.5']: {
    value: 'pm_2.5',
    label: 'Fine Particulate Matter',
    html: 'PM<sub>2.5</sub>',
  },
  blackcarbon: { value: 'blackcarbon', label: 'Black Carbon', html: 'BC' },
  ch4: { value: 'ch4', label: 'Methane', html: 'CH<sub>4</sub>' },
  co: { value: 'co', label: 'Carbon Monoxide', html: 'CO' },
  no: { value: 'no', label: 'Nitric Oxide', html: 'NO' },
  no2: { value: 'no2', label: 'Nitrogen Dioxide', html: 'NO<sub>2</sub>' },
  voc: { value: 'voc', label: 'Volatile Organic Compounds', html: 'VOC' },
  o3: { value: 'o3', label: 'Ozone', html: 'O<sub>3</sub>' },
};

type Pollutant = {
  value: string;
  label: string;
  layerIds: string[];
};

const PollutantSelect = () => {
  const [value, setValue] = useState<string | null>('blackcarbon');

  const felt = useFelt();

  const fetchLayersAndGroups = useCallback(async () => {
    const [layers, layerGroups] = await Promise.all([
      felt.getLayers().then(layers => layers.filter(Boolean) as Layer[]),
      felt
        .getLayerGroups()
        .then(groups => groups.filter(Boolean) as LayerGroup[]),
    ]);
    return assembleLayerTree(layers, layerGroups);
  }, [felt]);

  const layersQuery = useSWR('layers', fetchLayersAndGroups);

  const pollutantLayers: Pollutant[] = useMemo(() => {
    if (!layersQuery.data) return [];

    const pollutantsInMap = layersQuery.data.reduce((accum, item) => {
      item.type === 'layer' &&
      Object.keys(POLLUTANTS).some(key => item.layer.name.includes(key))
        ? accum.push({ name: item.layer.name, id: item.layer.id })
        : null;
      return accum;
    }, []);

    return Object.values(POLLUTANTS).reduce((accum, pollutant) => {
      const layers = pollutantsInMap.filter(({ name }) =>
        name.includes(pollutant.value),
      );

      if (layers.length) {
        accum.push({
          value: pollutant.value,
          label: pollutant.label,
          layerIds: layers.map(({ id }) => id),
        });
      }

      return accum;
    }, []);
  }, [layersQuery.data]);

  const handlePollutantChange = useCallback(
    (_value: string, option: Pollutant) => {
      setValue(_value);
      option.layerIds.forEach(layerId => {
        felt.setLayerVisibility({ show: [layerId] });
      });

      pollutantLayers.forEach(({ value, layerIds }) => {
        if (value !== _value) {
          layerIds.forEach(layerId => {
            felt.setLayerVisibility({ hide: [layerId] });
          });
        }
      });
    },
    [pollutantLayers, felt],
  );

  return (
    <Select
      data={pollutantLayers ?? []}
      value={value}
      onChange={handlePollutantChange}
      label="Select Pollutant"
      allowDeselect={false}
    />
  );
};

export default PollutantSelect;
