// copied from https://github.com/felt/js-sdk-starter-react/blob/main/src/feltUtils.ts
import {
  Felt,
  FeltController,
  FeltEmbedOptions,
  Layer,
  LayerGroup,
} from '@feltmaps/js-sdk';
import { useState, useEffect, useRef, createContext, useContext } from 'react';
import useSWR from 'swr';

export function useFeltEmbed(mapId: string, embedOptions: FeltEmbedOptions) {
  const [felt, setFelt] = useState<FeltController | null>(null);
  const hasLoadedRef = useRef(false);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadFelt() {
      if (hasLoadedRef.current) return;
      if (!mapRef.current) return;

      hasLoadedRef.current = true;
      const felt = await Felt.embed(mapRef.current, mapId, embedOptions);
      setFelt(felt);
    }

    loadFelt();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    felt,
    mapRef,
  };
}

export const FeltContext = createContext<FeltController>({} as FeltController);
export const useFelt = () => useContext(FeltContext);

export function useLiveLayerGroup(
  felt: FeltController,
  initialGroup: LayerGroup,
) {
  const [currentGroup, setGroup] = useState<LayerGroup | null>(initialGroup);

  useEffect(() => {
    return felt.onLayerGroupChange({
      options: { id: initialGroup.id },
      handler: ({ layerGroup }) => setGroup(layerGroup),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialGroup.id]);

  return currentGroup;
}

export function useLiveLayer(felt: FeltController, initialLayer: Layer) {
  const [currentLayer, setLayer] = useState<Layer | null>(initialLayer);

  useEffect(() => {
    return felt.onLayerChange({
      options: { id: initialLayer.id },
      handler: ({ layer }) => setLayer(layer),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialLayer.id]);

  return currentLayer;
}

export type LayerTree = Array<LayerGroupNode | LayerNode>;

export type LayerGroupNode = {
  type: 'layerGroup';
  group: LayerGroup;
  layers: Layer[];
};

type LayerNode = { type: 'layer'; layer: Layer };

export function assembleLayerTree(
  layers: Layer[],
  layerGroups: LayerGroup[],
): LayerTree {
  const groupsById = new Map<string, LayerGroupNode>();
  const result: LayerTree = [];
  for (const layer of layers) {
    if (!layer.groupId) {
      result.push({
        type: 'layer',
        layer,
      });
    } else {
      const group = groupsById.get(layer.groupId);
      if (!group) {
        const node: LayerGroupNode = {
          type: 'layerGroup',
          group: layerGroups.find(g => g.id === layer.groupId)!,
          layers: [layer],
        };

        groupsById.set(layer.groupId, node);
        result.push(groupsById.get(layer.groupId)!);
      } else {
        group.layers.push(layer);
      }
    }
  }
  return result;
}

export function useFeltLayers(refreshKey: string) {
  const felt = useFelt();
  const fetchLayersAndGroups = async () => {
    const [layers, layerGroups] = await Promise.all([
      felt.getLayers().then(layers => layers.filter(Boolean) as Layer[]),
      felt
        .getLayerGroups()
        .then(groups => groups.filter(Boolean) as LayerGroup[]),
    ]);
    return assembleLayerTree(layers, layerGroups);
  };

  return useSWR(refreshKey, fetchLayersAndGroups);
}
