import { useSelector } from 'react-redux';
import { Chart } from 'react-google-charts';
import { useNavigate, useLocation } from 'react-router-dom';
import COUNTRIES from '../../../../constants/countryCodes';
import { WORLD_MAP } from '../../../../constants';
import styles from './Map.module.css';

function Map({ data, region }) {
  const country = useSelector((state) => state.countries.country);

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

  const onChartClick = ({ chartWrapper }) => {
    const selection = chartWrapper.getChart().getSelection();

    if (selection.length === 0) return;

    const selectedCountryPosition = selection[0].row + 1;
    const countryName = data[selectedCountryPosition][0];

    navigate(`/country/${COUNTRIES[countryName]}/`);
  };

  const waitToRedrawChart = ({ chartWrapper }) => {
    // When storage Event is caught, should wait a second and redraw the chart
    window.addEventListener('storage', () => setTimeout(() => chartWrapper.draw(), 1000));
  };

  return (
    <div className={styles.container}>
      <Chart
        chartType="GeoChart"
        chartEvents={[
          {
            eventName: 'select',
            callback: onChartClick,
          },
          {
            eventName: 'ready',
            callback: waitToRedrawChart,
          },
        ]}
        data={data}
        options={options}
      />
    </div>
  );
}

export default Map;
