import { Chart, ReactGoogleChartEvent } from 'react-google-charts';
import { useNavigate, useLocation } from 'react-router-dom';
import { WORLD_MAP } from '@/constants';
import COUNTRIES from '@/constants/countryCodes';
import styles from './Map.module.css';

function isCountryKey(value: string | number): value is keyof typeof COUNTRIES {
  return value in COUNTRIES;
}

interface Props {
  data: Array<Array<string | number>>;
  region: string | null;
}

function Map(props: Props) {
  const { data, region } = props;

  const navigate = useNavigate();
  const location = useLocation();

  const options =
    location.pathname === '/'
      ? {
          region: region !== WORLD_MAP ? region : null,
          colorAxis: { colors: ['#16888b'] },
          defaultColor: '#16888b',
          tooltip: { trigger: 'none' },
        }
      : {
          region,
          resolution: 'provinces',
          enableRegionInteractivity: false,
          defaultColor: '#16888b',
        };

  const chartEvents: ReactGoogleChartEvent[] = [
    {
      eventName: 'select',
      callback: ({ chartWrapper }) => {
        const selection = chartWrapper?.getChart().getSelection();

        if (selection === undefined || selection.length === 0) return;

        const selectedCountryPosition = selection[0].row + 1;
        const countryName = data[selectedCountryPosition][0];

        if (!isCountryKey(countryName)) return;

        navigate(`/countries/${COUNTRIES[countryName]}/`);
      },
    },
    {
      eventName: 'error',
      callback: ({ chartWrapper }) => {
        // When storage Event is caught, should wait a second and redraw the chart
        window.addEventListener('storage', () =>
          setTimeout(() => chartWrapper?.draw(), 1000)
        );
      },
    },
  ];

  return (
    <div className={styles.container}>
      <Chart
        chartType="GeoChart"
        chartEvents={chartEvents}
        data={data}
        options={options}
      />
    </div>
  );
}

export default Map;
