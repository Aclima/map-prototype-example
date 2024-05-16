import Head from "next/head";
import { Map } from "@/components/map";
import { Header } from "@/components/header";
import theme, { SourceSans } from "@/utils/theme";

export default function Home() {
  return (
    <>
      <Head>
        <title>Map Prototype Example</title>
        <meta name="description" content="Example for making geospatial prototypes" />
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
        <Header />
        <style jsx>{`
          main {
            width: 100%;
            height: 100vh;
          }
        `}</style>
        <Map />
      </main>
    </>
  );
}
