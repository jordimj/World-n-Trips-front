import React from 'react';
import { useSelector } from 'react-redux';
import { Chart } from 'react-google-charts';
import { useHistory, useLocation } from 'react-router-dom';
import COUNTRIES from '../../constants/countryCodes';
import { WORLD_MAP } from '../../constants';

function Map({ data, region }) {
  const country = useSelector((state) => state.country);
  const history = useHistory();
  const location = useLocation();

  const options =
    location.pathname === '/'
      ? {
          region: region !== WORLD_MAP ? region : null,
        }
      : {
          region: country.info.alpha2code,
          resolution: 'provinces',
          colorAxis: { colors: ['green', 'blue'] },
          sizeAxis: { minSize: 12, maxSize: 20 },
          enableRegionInteractivity: true,
        };

  return (
    <Chart
      chartEvents={[
        {
          eventName: 'select',
          callback: ({ chartWrapper }) => {
            const chart = chartWrapper.getChart();
            const selection = chart.getSelection();
            if (selection.length === 0 || location.pathname !== '/') return;
            const countryName = data[selection[0].row + 1];
            history.push({ pathname: `/country/${COUNTRIES[countryName]}/` });
          },
        },
      ]}
      chartType="GeoChart"
      width="100%"
      height="100%"
      data={data}
      options={options}
    />
  );
}

export default Map;
