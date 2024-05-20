import React from 'react';
import { AppShell } from '@mantine/core';
import { PanelContents } from './panel';
import { Map } from './map';
import { AmtrakResponse, BikeShareResponse } from '@/types';
import classes from './prototype.module.css';

type MapDataResponses = {
  bikeShareData: BikeShareResponse;
  amtrakData: AmtrakResponse;
};
export const MapContainer: React.FC<MapDataResponses> = ({
  bikeShareData,
  amtrakData,
}) => {
  return (
    <Map
      bikeShareData={bikeShareData?.features ?? []}
      amtrakData={amtrakData ?? { type: 'FeatureCollection', features: [] }}
    />
  );
};

export const Prototype: React.FC<MapDataResponses> = ({
  bikeShareData,
  amtrakData,
}) => {
  return (
    <div>
      <PanelContents />
      <AppShell.Main className={classes.main}>
        <MapContainer bikeShareData={bikeShareData} amtrakData={amtrakData} />
      </AppShell.Main>
    </div>
  );
};
