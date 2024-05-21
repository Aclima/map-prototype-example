import BikeShareChart from '../bikeShareChart';
import BikeShareChartMantine from '../bikeShareChartMantine';
import BikeShareChartRechart from '../bikeShareRechart';
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
      <BikeShareChart />
      <BikeShareChartMantine />
      <BikeShareChartRechart />
    </div>
  );
};

export default PanelContents;
