import { Checkbox, Stack } from '@mantine/core';

import { BIKE_SHARE_TYPES } from '@/constants.ts';

type BikeShareFilterProps = {
  bikeShareTypes: string[];
  handleBikeShareTypes: (value: string[]) => void;
};

const BikeShareTypeFilter: React.FC<BikeShareFilterProps> = ({
  bikeShareTypes,
  handleBikeShareTypes,
}) => {
  return (
    <Checkbox.Group
      value={bikeShareTypes}
      onChange={handleBikeShareTypes}
      label="Filter bike share programs by type">
      <Stack>
        {BIKE_SHARE_TYPES.map(type => (
          <Checkbox key={type.value} value={type.value} label={type.label} />
        ))}
      </Stack>
    </Checkbox.Group>
  );
};

export default BikeShareTypeFilter;
