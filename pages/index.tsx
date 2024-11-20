import '@mantine/core/styles.css';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { AppShell, MantineProvider } from '@mantine/core';

import Header from '@/components/header/header';
import PanelContents from '@/components/panel/panel';
import Map from '@/components/map/map';
import { BIKE_SHARE_TYPES } from '@/constants.ts';
import { useFetchAmtrakRoutes } from '@/hooks/useFetchAmtrakRoutes';
import { useFetchBikeShare } from '@/hooks/useFetchBikeShare';
import { theme } from '../theme';
import classes from './index.module.css';

export default function Home() {
  const { data: bikeShareData } = useFetchBikeShare();
  const { data: amtrakData } = useFetchAmtrakRoutes();

  const [filteredBikeShareData, setFilteredBikeShareData] = useState([]);
  const [selectedBikeShareTypes, setSelectedBikeShareTypes] = useState(
    BIKE_SHARE_TYPES.map(type => type.value),
  );

  useEffect(() => {
    if (bikeShareData?.features) {
      setFilteredBikeShareData(bikeShareData.features);
    }
  }, [bikeShareData]);

  useEffect(() => {
    if (bikeShareData?.features) {
      const filteredData = bikeShareData.features.filter(feature => {
        return selectedBikeShareTypes.includes(feature.attributes.type);
      });
      setFilteredBikeShareData(filteredData);
    }
  }, [bikeShareData?.features, selectedBikeShareTypes]);

  return (
    <MantineProvider theme={theme}>
      <Head>
        <title>Map Prototype Example</title>
        <meta
          name="description"
          content="Example for making geospatial prototypes"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppShell
        navbar={{ width: '300', breakpoint: 'sm', collapsed: { mobile: true } }}
        header={{ height: 75 }}>
        <AppShell.Header className={classes.header}>
          <Header title="Example Prototype" />
        </AppShell.Header>
        <AppShell.Navbar>
          <PanelContents
            bikeShareTypes={selectedBikeShareTypes}
            handleBikeShareTypes={setSelectedBikeShareTypes}
          />
        </AppShell.Navbar>
        <AppShell.Main className={classes.main}>
          <div className={classes.mapContainer}>
            <Map
              bikeShareData={filteredBikeShareData}
              amtrakData={
                amtrakData ?? { type: 'FeatureCollection', features: [] }
              }
            />
          </div>
          <div className={`mantine-hidden-from-sm ${classes.panel}`}>
            <PanelContents
              bikeShareTypes={selectedBikeShareTypes}
              handleBikeShareTypes={setSelectedBikeShareTypes}
            />
          </div>
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}
