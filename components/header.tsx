import Image from 'next/image';
import { AppShell } from '@mantine/core';

import logo from '../public/aclima-logo.svg';
import classes from './header.module.css';

export const Header: React.FC = () => {
  return (
    <AppShell.Header className={classes.header}>
      <Image src={logo} alt="Aclima logo" />
      <h1>Example Prototype</h1>
      <style jsx>{`
        h1 {
          font-size: 2rem;
          margin: 0;
        }
      `}</style>
    </AppShell.Header>
  );
};
