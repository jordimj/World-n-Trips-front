import { useSelector } from 'react-redux';
import { Chart } from 'react-google-charts';
import { useNavigate, useLocation } from 'react-router-dom';
import COUNTRIES from '../../constants/countryCodes';
import { WORLD_MAP } from '../../constants';
import styles from './Map.module.css';

function Map({ data, region }) {
  const country = useSelector((state) => state.country);
  const graduallyColored = useSelector(
    (state) => state.worldMapConf.graduallyColored
  );

  const navigate = useNavigate();
  const location = useLocation();

  const options =
    location.pathname === '/'
      ? {
          region: region !== WORLD_MAP ? region : null,
          colorAxis: { colors: ['#21b6b7'] },
          defaultColor: '#21b6b7',
        }
      : {
          region: country.info.alpha2code,
          resolution: 'provinces',
          enableRegionInteractivity: false,
          defaultColor: '#21b6b7',
        };

  return (
    <div className={styles.container}>
      <Chart
        chartEvents={[
          {
            eventName: 'select',
            callback: ({ chartWrapper }) => {
              const chart = chartWrapper.getChart();
              const selection = chart.getSelection();
              if (selection.length === 0) return;
              const countryName = graduallyColored
                ? data[selection[0].row + 1][0]
                : data[selection[0].row + 1];
              navigate(`/country/${COUNTRIES[countryName]}/`);
            },
          },
        ]}
        chartType="GeoChart"
        data={data}
        options={options}
      />
    </div>
  );
}

export default Map;
