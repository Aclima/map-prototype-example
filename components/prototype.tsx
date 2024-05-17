import React from "react";
import { Panel } from "./panel";
import { Map } from "./map";
import theme from "@/utils/theme";
import { AmtrakResponse, BikeShareResponse } from "@/types";

type MapDataResponses = {
  bikeShareData: BikeShareResponse;
  amtrakData: AmtrakResponse;
};
const MapContainer: React.FC<MapDataResponses> = ({bikeShareData, amtrakData}) => {
  return (
    <div>
      <Map
        bikeShareData={bikeShareData?.features ?? []}
        amtrakData={amtrakData ?? { type: "FeatureCollection", features: [] }}
      />
      <style jsx>{`
        div {
          height: 500px;
          width: 100%;
          min-width: 0;
          order: -1;
          flex-shrink: 0;
          @media (min-width: ${theme.breakpoints.mobile}) {
            order: 0;
            height: 100%;
            flex-grow: 1;
            overflow: auto;
            width: auto;
          }
        }
      `}</style>
    </div>
  );
};

export const Prototype: React.FC<MapDataResponses> = ({
  bikeShareData,
  amtrakData,
}) => {
  return (
    <div>
      <Panel />
      <MapContainer bikeShareData={bikeShareData} amtrakData={amtrakData}/>
      <style jsx>{`
        div {
          height: 100%;
          width: 100%;
          display: flex;
          flex-direction: column;
          @media (min-width: ${theme.breakpoints.mobile}) {
            flex-direction: row;
          }
        }
      `}</style>
    </div>
  );
};
