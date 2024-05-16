import React from 'react';
import {Map as ReactGlMap, NavigationControl, useControl} from 'react-map-gl';
import {GeoJsonLayer, ArcLayer} from 'deck.gl';
import {MapboxOverlay as DeckOverlay} from '@deck.gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

// this is modified from this deckgl example, just to get a map on the page: https://github.com/visgl/deck.gl/blob/9.0-release/examples/get-started/react/mapbox/app.jsx
// TODO: add different data, add legend, etc
// source: Natural Earth http://www.naturalearthdata.com/ via geojson.xyz
const AIR_PORTS =
  'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson';

const INITIAL_VIEW_STATE = {
  latitude: 51.47,
  longitude: 0.45,
  zoom: 4,
  bearing: 0,
  pitch: 30
};

const MAP_STYLE = 'mapbox://styles/mapbox/light-v9';
const DeckGLOverlay = (props) => {
  const overlay = useControl(() => new DeckOverlay(props));
  overlay.setProps(props);
  return null;
}

const onClick = info => {
  if (info.object) {
    // eslint-disable-next-line
    alert(`${info.object.properties.name} (${info.object.properties.abbrev})`);
  }
};

const layers = [
  new GeoJsonLayer({
    id: 'airports',
    data: AIR_PORTS,
    // Styles
    filled: true,
    pointRadiusMinPixels: 2,
    pointRadiusScale: 2000,
    getPointRadius: f => 11 - f.properties.scalerank,
    getFillColor: [200, 0, 80, 180],
    // Interactive props
    pickable: true,
    autoHighlight: true,
    onClick
  }),
  new ArcLayer({
    id: 'arcs',
    data: AIR_PORTS,
    dataTransform: (d: any) => d.features.filter(f => f.properties.scalerank < 4),
    // Styles
    getSourcePosition: f => [-0.4531566, 51.4709959], // London
    getTargetPosition: f => f.geometry.coordinates,
    getSourceColor: [0, 128, 200],
    getTargetColor: [200, 0, 80],
    getWidth: 1
  })
];

export const Map = () => {
  return (
    <ReactGlMap
      initialViewState={INITIAL_VIEW_STATE}
      mapStyle={MAP_STYLE}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
    >
      <DeckGLOverlay layers={layers} />
      <NavigationControl position="bottom-right" />
    </ReactGlMap>
  );
}