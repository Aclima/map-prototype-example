import { FeatureCollection, MultiLineString } from 'geojson';

// https://geodata.bts.gov/datasets/usdot::bikeshare-scooter-systems/api
export type BikeShareFeature = {
  geometry: { x: number; y: number };
  attributes: {
    scooterct: number;
    docklessct: number;
    asofdate: string;
    city: string;
    year: number;
    stationct_bin: string;
    notesscooter: string;
    lon: number;
    datedocklesslaunch: string;
    dockct: number;
    scooterct_jul: number;
    dockct_jul: number;
    type: string;
    notesdock: string;
    datedockedlaunch: string;
    datedockedend: string;
    scooternm: string;
    yearplaceid: '2015AL001';
    datedocklessend: string;
    state: string;
    datescooterend: string;
    docknm: string;
    lat: number;
    docklessnm_jul: string;
    dockid: string;
    docklessnm_campusonly: string;
    scooternm_jul: string;
    scooternm_campusonly: string;
    datescooterlaunch: string;
    placeid: string;
    scooter_bin: string;
    citystate: string;
    docknm_campusonly: string;
    stationct_pct: number;
    docklessct_jul: number;
    dockless_bin: string;
    notesdockless: string;
    docklessnm: string;
    geoid: string;
    x: number;
    y: number;
    docknm_jul: string;
    objectid: number;
  };
};

export type BikeShareResponse = {
  exceededTransferLimit: boolean;
  features: BikeShareFeature[];
  fields: Record<string, string | number | null>;
  geometryType: string;
  hasM: boolean;
  hasZ: boolean;
  orjectIdFieldName: string;
  spatialReference: Record<string, number>;
};

export type AmtrakFeatureProperties = {
  name: string;
  SHAPE__Length: number;
  shape_leng: number;
  objectid: number;
};

export type AmtrakResponse = FeatureCollection<
  MultiLineString,
  AmtrakFeatureProperties
>;

export type Pollutant = {
  value: string;
  label: string;
  groupIds: string[];
};
