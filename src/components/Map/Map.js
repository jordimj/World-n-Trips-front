import React from 'react';
import { useSelector } from 'react-redux';
import { Chart } from 'react-google-charts';
import { useHistory, useLocation } from 'react-router-dom';
import countryCodes from '../../utils/countryCodes';

function Map({ data, region }) {
  const country = useSelector((state) => state.country);
  const history = useHistory();
  const location = useLocation();

  let options = {
    region: region !== '000' ? region : null,
  };

  if (country && location.pathname !== '/') {
    options = {
      region: country.info.alpha2code,
      resolution: 'provinces',
      // displayMode: 'text',
      colorAxis: { colors: ['green', 'blue'] },
      sizeAxis: { minSize: 12, maxSize: 20 },
      enableRegionInteractivity: true,
    };
  }

  return (
    <Chart
      chartEvents={[
        {
          eventName: 'select',
          callback: ({ chartWrapper }) => {
            const chart = chartWrapper.getChart();
            const selection = chart.getSelection();
            if (selection.length === 0) return;
            const region = data[selection[0].row + 1];
            history.push({ pathname: `/country/${countryCodes[region]}/` });
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
