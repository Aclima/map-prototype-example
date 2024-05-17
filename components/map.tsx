import React from 'react';
import { Map as ReactGlMap, NavigationControl, useControl } from 'react-map-gl';
import { GeoJsonLayer, ScatterplotLayer } from 'deck.gl';
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

const onClick = info => {
  if (info.object) {
    // eslint-disable-next-line
    alert(`${info.object.properties.name} (${info.object.properties.abbrev})`);
  }
};

type MapProps = {
  bikeShareData: BikeShareFeature[];
  amtrakData: AmtrakResponse;
};

export const Map: React.FC<MapProps> = ({ bikeShareData, amtrakData }) => {
  const layers = [
    new GeoJsonLayer<AmtrakFeatureProperties>({
      id: 'GeoJsonLayer',
      data: amtrakData,
      stroked: true,
      filled: true,
      pickable: true,
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
      onClick,
    }),
  ];

  return (
      <ReactGlMap
        initialViewState={INITIAL_VIEW_STATE}
        mapStyle={MAP_STYLE}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      >
        <DeckGLOverlay layers={layers} />
        <NavigationControl position="bottom-right" />
        <style jsx>{`
          div {
            height: 100%;
            width: 100%;
          }
        `}</style>
      </ReactGlMap>
  );
};
