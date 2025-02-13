import {
  Title,
  Group,
  ActionIcon,
  Divider,
  Loader,
  Stack,
  Text,
} from '@mantine/core';
import { Layer } from '@feltmaps/js-sdk';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import { useFelt, useFeltLayers, useLiveLayer } from '../../utils/felt';

const Layers: React.FC = () => {
  const feltLayers = useFeltLayers('layers');

  return (
    <Stack flex={1} gap={0}>
      <Title size="md" p={3} py={2}>
        Layers
      </Title>
      <Divider />
      <Stack flex={1}>
        {feltLayers.isLoading && <Loader my={8} />}
        {feltLayers.data &&
          feltLayers.data.map(n => {
            if (n.type === 'layer') {
              return <LayerItem layer={n.layer} key={n.layer.id} />;
            }
          })}
      </Stack>
    </Stack>
  );
};

function LayerItem({ layer }: { layer: Layer }) {
  const felt = useFelt();

  const currentLayer = useLiveLayer(felt, layer);

  if (!currentLayer) return null;

  return (
    <Group
      opacity={currentLayer.visible ? undefined : 0.4}
      p={3}
      id={currentLayer.id}
      onDoubleClick={() => {
        if (currentLayer.bounds) {
          felt.fitViewportToBounds({ bounds: currentLayer.bounds });
        }
      }}>
      <Text flex={1} c={currentLayer.name ? undefined : 'fg.subtle'} truncate>
        {currentLayer.name || '(No name)'}
      </Text>
      <ActionIcon
        className="layer-visibility-button"
        hidden
        my={-1.5}
        mr={-1.5}
        size="xs"
        variant="ghost"
        aria-label={currentLayer.visible ? 'Hide layer' : 'Show layer'}
        onDoubleClick={e => {
          e.stopPropagation();
        }}
        onClick={() => {
          if (currentLayer.visible) {
            felt.setLayerVisibility({ hide: [currentLayer.id] });
          } else {
            felt.setLayerVisibility({ show: [currentLayer.id] });
          }
        }}>
        {currentLayer.visible ? <IconEye /> : <IconEyeOff />}
      </ActionIcon>
    </Group>
  );
}

export default Layers;
