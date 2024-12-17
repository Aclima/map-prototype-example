import { useCallback, useMemo, useState } from 'react';
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

  const pollutantLayers = useMemo(() => {
    if (!layersQuery.data) return [];

    const pollutantsInMap = layersQuery.data.reduce((accum, item) => {
      item.type === 'layer' && item.layer.name in POLLUTANTS
        ? accum.push(item.layer.name)
        : null;
      return accum;
    }, []);

    return Object.values(POLLUTANTS).filter(pollutant => {
      return pollutantsInMap.includes(pollutant.value);
    });
  }, [layersQuery.data]);

  return (
    <Select
      data={pollutantLayers ?? []}
      value={value}
      onChange={setValue}
      label="Select Pollutant"
    />
  );
};

export default PollutantSelect;
