import '@mantine/core/styles.css';
import Head from 'next/head';
import { AppShell, MantineProvider } from '@mantine/core';

import { Header } from '@/components/header';
import { useFetchBikeShare } from '@/hooks/useFetchBikeShare';
import { MapContainer } from '@/components/prototype';
import { PanelContents } from '@/components/panel';
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
      <style jsx global>{`
        body {
          margin: 0;
          color: ${theme.colors.gray[9]};
        }
      `}</style>
      <AppShell
        navbar={{ width: '300', breakpoint: 'sm' }}
        header={{ height: 75 }}>
        <AppShell.Header className={classes.header}>
          <Header />
        </AppShell.Header>
        <AppShell.Navbar>
          <PanelContents />
        </AppShell.Navbar>
        <AppShell.Main className={classes.main}>
          <MapContainer bikeShareData={bikeShareData} amtrakData={amtrakData} />
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}
