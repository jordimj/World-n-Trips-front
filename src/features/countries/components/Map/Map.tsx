import { Chart, ReactGoogleChartEvent } from 'react-google-charts';
import { useNavigate, useLocation } from 'react-router-dom';
import { WORLD_MAP } from '@/constants';
import COUNTRIES from '@/constants/countryCodes';
import { isCountryKey } from '@/template/components/CountryFlag';
import styles from './Map.module.css';

// Google GeoChart does not provide province maps for these countries.
const COUNTRIES_WITHOUT_PROVINCE_MAPS = new Set(['SG', 'MC', 'SM', 'VA']);

interface Props {
  data: Array<Array<string | number>>;
  region?: string;
  height?: number;
  countryLinks?: Record<string, string>;
}

function Map(props: Props) {
  const { data, region, height, countryLinks } = props;

  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const hasNoProvinceMap = !isHome && COUNTRIES_WITHOUT_PROVINCE_MAPS.has(region ?? '');

  const options = isHome
    ? {
        region: region !== WORLD_MAP ? region : null,
        colorAxis: { colors: ['#70b7b1', '#16888b'] },
        defaultColor: '#16888b',
        datalessRegionColor: '#cdd8d5',
        backgroundColor: 'transparent',
        tooltip: { trigger: 'none' },
        legend: 'none',
      }
    : {
        region,
        resolution: hasNoProvinceMap ? 'countries' : 'provinces',
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

        const countryCode = countryLinks?.[countryName];
        if (countryCode) {
          navigate(`/countries/${countryCode}`);
          return;
        }

        if (!isCountryKey(countryName)) return;

        navigate(`/countries/${COUNTRIES[countryName]}`);
      },
    },
    {
      eventName: 'error',
      callback: ({ chartWrapper }) => {
        // When storage Event is caught, should wait a second and redraw the chart
        window.addEventListener('storage', () => setTimeout(() => chartWrapper?.draw(), 1000));
      },
    },
  ];

  return (
    <div className={`${styles.container} ${isHome ? styles.homeMap : ''}`}>
      <Chart
        chartType="GeoChart"
        height={height ?? (isHome ? '100%' : undefined)}
        width="100%"
        chartEvents={chartEvents}
        data={hasNoProvinceMap ? [['Country'], [region ?? '']] : data}
        options={options}
      />
    </div>
  );
}

export default Map;
