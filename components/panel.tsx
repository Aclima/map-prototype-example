import theme from "@/utils/theme";
import BikeShareChart from "./bikeShareChart";

const Placeholder = () => {
  return (
    <div>
      <style jsx>{`
        div {
          width: 300px;
          height: 200px;
          background-color: #fff;
        }
      `}</style>
    </div>
  );
};

export const Panel: React.FC = () => {
  return (
    <div>
      <h2>Filters</h2>
      <p>Put some filters here!</p>
      <Placeholder />
      <h2>Charts</h2>
      <BikeShareChart />
      <style jsx>{`
        div {
          padding: 1rem;
          background-color: ${theme.colors.backgroundGray};

          @media (min-width: ${theme.breakpoints.mobile}) {
            width: 30%;
            min-width: 350px;
          }
        }
        h2 {
          margin: 0;
          font-size: 1.5rem;
        }
      `}</style>
    </div>
  );
};
