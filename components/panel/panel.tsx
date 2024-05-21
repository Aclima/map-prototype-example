import BikeShareChart from '../bikeShareChart';
import BikeShareTypeFilter from '../bikeShareTypeFilter/bikeShareTypeFilter';
import classes from './panel.module.css';

const Placeholder = () => {
  return <div className={classes.placeholder} />;
};

type PanelContentsProps = {
  bikeShareTypes: string[];
  handleBikeShareTypes: (value: string[]) => void;
};

const PanelContents: React.FC<PanelContentsProps> = ({
  bikeShareTypes,
  handleBikeShareTypes,
}) => {
  return (
    <div className={classes.panelContents}>
      <BikeShareTypeFilter
        bikeShareTypes={bikeShareTypes}
        handleBikeShareTypes={handleBikeShareTypes}
      />
      <h2>Charts</h2>
      <BikeShareChart />
    </div>
  );
};

export default PanelContents;
