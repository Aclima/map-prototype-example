import type { AppProps } from 'next/app';
import { GoogleAnalytics } from '@next/third-parties/google';
import '../global.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <GoogleAnalytics gaId={process.env.GA_TRACKING_ID} />
    </>
  );
}
