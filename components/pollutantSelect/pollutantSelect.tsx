import { useCallback, useMemo } from 'react';
import { Select } from '@mantine/core';

import { useFelt, useFeltLayers } from '@/utils/felt';
import { POLLUTANTS } from '@/constants.ts';
import { Pollutant } from '@/types';
import { usePollutant } from '@/context/pollutant';

const PollutantSelect = () => {
  const { pollutant, setPollutant } = usePollutant();
  const feltLayers = useFeltLayers(pollutant);
  const felt = useFelt();

  const pollutantLayers: Pollutant[] = useMemo(() => {
    if (!feltLayers.data) return [];

    const pollutantsInMap = feltLayers.data.reduce((accum, item) => {
      item.type === 'layerGroup' &&
      Object.keys(POLLUTANTS).some(key => item.group.name.includes(key))
        ? accum.push({ name: item.group.name, id: item.group.id })
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
          groupIds: layers.map(({ id }) => id),
        });
      }

      return accum;
    }, []);
  }, [feltLayers.data]);

  const handlePollutantChange = useCallback(
    (_value: string, option: Pollutant) => {
      setPollutant(_value);
      const hiddenLayers = pollutantLayers
        .filter(({ value }) => value !== _value)
        .map(({ groupIds }) => groupIds)
        .flat();

      felt.setLayerGroupVisibility({
        show: option.groupIds,
        hide: hiddenLayers,
      });
    },
    [pollutantLayers, felt, setPollutant],
  );

  return (
    <Select
      data={pollutantLayers ?? []}
      value={pollutant}
      defaultValue={pollutant}
      onChange={handlePollutantChange}
      label="Select Pollutant"
      allowDeselect={false}
      checkIconPosition="right"
    />
  );
};

export default PollutantSelect;
