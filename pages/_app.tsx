import type { AppProps } from 'next/app';
import { GoogleAnalytics } from '@next/third-parties/google';
// import mixpanel from 'mixpanel-browser';

import '../global.css';
import "@mantine/charts/styles.css";
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  // uncomment to enable mixpanel tracking

  // useEffect(() => {
  //   mixpanel.init(process.env.MIXPANEL_PROJECT_TOKEN);
  // }, []);
  return (
    <>
      <Component {...pageProps} />
      <GoogleAnalytics gaId={process.env.GA_TRACKING_ID} />
    </>
  );
}
