import Head from "next/head";
import { Map } from "@/components/map";

export default function Home() {
  return (
    <>
      <Head>
        <title>Map Prototype Example</title>
        <meta name="description" content="Example for making geospatial prototypes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{width: "100%", height: "100vh"}}>
        <Map />
      </main>
    </>
  );
}
