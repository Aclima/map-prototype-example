import Head from "next/head";
import { Header } from "@/components/header";
import theme, { SourceSans } from "@/utils/theme";
import { useFetchBikeShare } from "@/hooks/useFetchBikeShare";
import { Prototype } from "@/components/prototype";
import { useFetchAmtrakRoutes } from '@/hooks/useFetchAmtrakRoutes';

export default function Home() {
  const { data: bikeShareData } = useFetchBikeShare();
  const { data: amtrakData } = useFetchAmtrakRoutes();

  return (
    <>
      <Head>
        <title>Map Prototype Example</title>
        <meta
          name="description"
          content="Example for making geospatial prototypes"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={SourceSans.className}>
        <style jsx global>{`
          body {
            margin: 0;
            color: ${theme.colors.textGray};
          }
        `}</style>
        <style jsx>{`
          main {
            width: 100%;
            height: 100vh;
          }
        `}</style>
        <Header />
        <Prototype bikeShareData={bikeShareData} amtrakData={amtrakData} />
      </main>
    </>
  );
}
