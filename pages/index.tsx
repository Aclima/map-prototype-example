import '@mantine/core/styles.css';
import Head from 'next/head';
import { AppShell, MantineProvider } from '@mantine/core';

import { Header } from '@/components/header/header';
import { useFetchBikeShare } from '@/hooks/useFetchBikeShare';
import { MapContainer } from '@/components/prototype/prototype';
import { PanelContents } from '@/components/panel/panel';
import { useFetchAmtrakRoutes } from '@/hooks/useFetchAmtrakRoutes';
import { theme } from '../theme';
import classes from './index.module.css';

export default function Home() {
  const { data: bikeShareData } = useFetchBikeShare();
  const { data: amtrakData } = useFetchAmtrakRoutes();

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
          <Header />
        </AppShell.Header>
        <AppShell.Navbar>
          <PanelContents />
        </AppShell.Navbar>
        <AppShell.Main className={classes.main}>
          <div className={classes.mapContainer}>
            <MapContainer
              bikeShareData={bikeShareData}
              amtrakData={amtrakData}
            />
          </div>
          <div className={`mantine-hidden-from-sm ${classes.panel}`}>
            <PanelContents />
          </div>
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}
