import { theme } from '../theme';

const Placeholder = () => {
  return <div></div>;
};

export const PanelContents: React.FC = () => {
  return (
    <div>
      <h2>Filters</h2>
      <p>Put some filters here!</p>
      <Placeholder />
      <h2>Charts</h2>
      <p>Put some charts here!</p>
      <Placeholder />
      <style jsx>{`
        div {
          background-color: ${theme.colors.gray[0]};
          height: 100%;
        }
        h2 {
          margin: 0;
          font-size: 1.5rem;
        }
      `}</style>
    </div>
  );
};
