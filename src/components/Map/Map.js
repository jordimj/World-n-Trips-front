import React from 'react';
import { useSelector } from 'react-redux';
import { Chart } from 'react-google-charts';
import { useHistory, useLocation } from 'react-router-dom';
import COUNTRIES from '../../constants/countryCodes';
import { WORLD_MAP } from '../../constants';
import styles from './Map.module.css';

function Map({ data, region }) {
  const country = useSelector((state) => state.country);
  const history = useHistory();
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
              const countryName = data[selection[0].row + 1];
              history.push({ pathname: `/country/${COUNTRIES[countryName]}/` });
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
