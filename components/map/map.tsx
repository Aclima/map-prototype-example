import React, { useCallback } from 'react';
import { Map as ReactGlMap, NavigationControl, useControl } from 'react-map-gl';
import { GeoJsonLayer, PickingInfo, ScatterplotLayer } from 'deck.gl';
import { MapboxOverlay as DeckOverlay } from '@deck.gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import {
  AmtrakFeatureProperties,
  AmtrakResponse,
  BikeShareFeature,
} from '@/types';

const INITIAL_VIEW_STATE = {
  longitude: -122.4,
  latitude: 37.74,
  zoom: 11,
};

const MAP_STYLE = 'mapbox://styles/mapbox/light-v9';
const DeckGLOverlay = props => {
  const overlay = useControl(() => new DeckOverlay(props));
  overlay.setProps(props);
  return null;
};

type MapProps = {
  bikeShareData: BikeShareFeature[];
  amtrakData: AmtrakResponse;
};

const Map: React.FC<MapProps> = ({ bikeShareData, amtrakData }) => {
  const getTooltip = useCallback(
    ({ object }: PickingInfo<BikeShareFeature>) => {
      const details = [object?.attributes?.docklessnm, object?.attributes?.docknm, object?.attributes?.scooternm].filter(detail => !!detail);
      return object && `${object.attributes.type} \n ${details.join('\n')}`;
    },
    []
  );
  const layers = [
    new GeoJsonLayer<AmtrakFeatureProperties>({
      id: 'GeoJsonLayer',
      data: amtrakData,
      stroked: true,
      filled: true,
      pickable: false,
      getFillColor: [160, 160, 180, 200],
      lineWidthMinPixels: 2,
      lineWidthMaxPixels: 10,
    }),
    new ScatterplotLayer({
      id: 'bikeshares',
      data: bikeShareData,
      // Styles
      getPosition: ({ geometry }) => [geometry.x, geometry.y],
      radiusMinPixels: 3,
      radiusMaxPixels: 15,
      getFillColor: [255, 140, 0],
      getLineColor: [0, 0, 0],
      getLineWidth: 10,
      // Interactive props
      pickable: true,
      autoHighlight: true,
    }),
  ];

  return (
    <ReactGlMap
      initialViewState={INITIAL_VIEW_STATE}
      mapStyle={MAP_STYLE}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
    >
      <DeckGLOverlay layers={layers} getTooltip={getTooltip}/>
      <NavigationControl position="bottom-right" />
    </ReactGlMap>
  );
};

export default Map;
