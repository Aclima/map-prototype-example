import Image from 'next/image';
import logo from '../public/aclima-logo.svg';
import theme from '../utils/theme';

export const Header: React.FC = () => {
  return (
    <div>
      <Image src={logo} alt="Aclima logo" />
      <h1>Example Prototype</h1>
      <style jsx>{`
        div {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          padding: 1rem;
          background-color: ${theme.colors.backgroundGray};
        }
        h1 {
          font-size: 2rem;
          margin: 0;
        }

        @media (min-width: 600px) {
          div {
            justify-content: left;
          }
        }
      `}</style>
    </div>
  );
};
