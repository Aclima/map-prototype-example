import React from "react";
import { Panel } from "./panel";
import { Map } from "./map";
import theme from "@/utils/theme";

const MapContainer: React.FC<{ bikeShareData: BikeShareResponse }> = ({bikeShareData}) => {
  return (
    <div>
      <Map bikeShareData={bikeShareData?.features ?? []} />
      <style jsx>{`
        div {
          height: 500px;
          width: 100%;
          order: -1;
          flex-shrink: 0;
          @media (min-width: ${theme.breakpoints.mobile}) {
            order: 0;
            height: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export const Prototype: React.FC<{ bikeShareData: BikeShareResponse }> = ({
  bikeShareData,
}) => {
  return (
    <div>
      <Panel />
      <MapContainer bikeShareData={bikeShareData} />
      <style jsx>{`
        div {
          height: 100%;
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
