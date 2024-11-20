import Image from 'next/image';
import { Group } from '@mantine/core';

import logo from '../../public/aclima-logo.svg';
import classes from './header.module.css';

type TitleProps = {
  title: string;
};

const Header: React.FC<TitleProps> = ({ title }) => {
  return (
    <Group className={classes.header}>
      <Image src={logo} alt="Aclima logo" />
      <h1>{title}</h1>
    </Group>
  );
};

export default Header;
