import '@mantine/core/styles.css';
import Head from 'next/head';
import { AppShell, MantineProvider } from '@mantine/core';

import { Map } from '@/components/map';
import { Header } from '@/components/header';
import { SourceSans } from '@/utils/theme';
import { useFetchBikeShare } from '@/hooks/useFetchBikeShare';
import { useFetchAmtrakRoutes } from '@/hooks/useFetchAmtrakRoutes';
import { theme } from '../theme';

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
      <AppShell></AppShell>
      <main className={SourceSans.className}>
        <style jsx global>{`
          body {
            margin: 0;
            color: ${theme.colors.gray[9]};
          }
        `}</style>
        <Header />
        <style jsx>{`
          main {
            width: 100%;
            height: 100vh;
          }
        `}</style>
        <Map
          bikeShareData={bikeShareData?.features ?? []}
          amtrakData={amtrakData ?? { type: 'FeatureCollection', features: [] }}
        />
      </main>
    </MantineProvider>
  );
}
