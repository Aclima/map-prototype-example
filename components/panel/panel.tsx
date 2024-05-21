import BikeShareChart from '../bikeShareChart/bikeShareChart';
import BikeShareTypeFilter from '../bikeShareTypeFilter/bikeShareTypeFilter';
import classes from './panel.module.css';

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
      <h2>Stats</h2>
      <p>Number of bike shares by state</p>
      <BikeShareChart />
    </div>
  );
};

export default PanelContents;
