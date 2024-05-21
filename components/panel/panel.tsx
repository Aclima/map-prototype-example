import { theme } from '../../theme';
import classes from './panel.module.css';

const Placeholder = () => {
  return <div className={classes.placeholder} />;
};

const PanelContents: React.FC = () => {
  return (
    <div className={classes.panelContents}>
      <h2>Filters</h2>
      <p>Put some filters here!</p>
      <Placeholder />
      <h2>Charts</h2>
      <p>Put some charts here!</p>
      <Placeholder />
    </div>
  );
};

export default PanelContents;
