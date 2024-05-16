import React from 'react';
import { Map as ReactGlMap, NavigationControl, useControl } from 'react-map-gl';
import { ScatterplotLayer } from 'deck.gl';
import { MapboxOverlay as DeckOverlay } from '@deck.gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

// this is modified from this deckgl example, just to get a map on the page: https://github.com/visgl/deck.gl/blob/9.0-release/examples/get-started/react/mapbox/app.jsx
// TODO: add different data, add legend, etc
// source: Natural Earth http://www.naturalearthdata.com/ via geojson.xyz
const AIR_PORTS =
  'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson';

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
};

export const Map: React.FC<MapProps> = ({ bikeShareData }) => {
  const layers = [
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
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}>
      <DeckGLOverlay layers={layers} />
      <NavigationControl position="bottom-right" />
    </ReactGlMap>
  );
};
