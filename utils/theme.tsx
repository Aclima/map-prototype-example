import { Source_Sans_3 } from 'next/font/google';

export const SourceSans = Source_Sans_3({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-source-sans',
});

const prototypeStylingTheme = {
  colors: {
    backgroundGray: '#F5F5F5', // gray0
    textGray: '#222222', // gray9
  },
  breakpoints: {
    mobile: '600px',
  },
};

export default prototypeStylingTheme;
