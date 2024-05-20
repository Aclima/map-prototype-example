import { createTheme } from '@mantine/core';
import { Source_Sans_3 } from 'next/font/google';

export const SourceSans = Source_Sans_3({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-source-sans',
});

const SourceSansFont = SourceSans.style.fontFamily;

export const theme = createTheme({
  colors: {
    gray: [
      '#f5f5f5',
      '#e7e7e7',
      '#cdcdcd',
      '#b2b2b2',
      '#9a9a9a',
      '#8b8b8b',
      '#848484',
      '#717171',
      '#656565',
      '#575757',
    ],
  },
  breakpoints: {
    sm: '600px',
  },
  fontFamily: SourceSansFont,
});
