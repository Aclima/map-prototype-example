import '@mantine/core/styles.css';
import Head from 'next/head';
import { AppShell, MantineProvider, Loader } from '@mantine/core';

import Header from '@/components/header/header';
import PollutantSelect from '@/components/pollutantSelect/pollutantSelect';
import { theme } from '../theme';
import classes from './index.module.css';
import { FeltContext, useFeltEmbed } from '../utils/felt';
import ClickedElement from '@/components/clickedElement/clickedElement';

export default function FeltPage() {
  const { felt, mapRef } = useFeltEmbed('GbuAKqaRQfKXCBcu13Ud2C', {
    uiControls: {
      cooperativeGestures: false,
      fullScreenButton: false,
      showLegend: false,
      scaleBar: false,
    },
  });
  return (
    <MantineProvider theme={theme}>
      <Head>
        <title>Felt Map Prototype Example</title>
        <meta
          name="description"
          content="Example for making geospatial prototypes with a felt embed"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppShell
        navbar={{ width: '300', breakpoint: 'sm', collapsed: { mobile: true } }}
        header={{ height: 75 }}>
        <AppShell.Header className={classes.header}>
          <Header title="Felt Prototype" />
        </AppShell.Header>
        <AppShell.Navbar>
          <FeltContext.Provider value={felt}>
            {felt ? (
              <>
                <PollutantSelect />
                <ClickedElement />
              </>
            ) : (
              <Loader color="blue" />
            )}
          </FeltContext.Provider>
        </AppShell.Navbar>
        <AppShell.Main className={classes.main}>
          <div className={classes.mapContainer} ref={mapRef} />
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}
