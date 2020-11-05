import React from 'react';
import { useSelector } from 'react-redux';
import { Chart } from 'react-google-charts';
import { useHistory } from 'react-router-dom';

function Map({ data, region }) {
  const country = useSelector((state) => state.country);
  const history = useHistory();

  let options = {
    region: region !== '000' ? region : null,
    // colorAxis: { colors: ['green', 'blue'] },
  };

  if (country) {
    options = {
      region: country ? country.info.alpha2code : '',
      resolution: 'provinces',
      // displayMode: 'text',
      colorAxis: { colors: ['green', 'blue'] },
      sizeAxis: { minSize: 12, maxSize: 20 },
      enableRegionInteractivity: true,
    };
  }

  return (
    <div>
      <Chart
        chartEvents={[
          {
            eventName: 'select',
            callback: ({ chartWrapper }) => {
              const chart = chartWrapper.getChart();
              const selection = chart.getSelection();
              if (selection.length === 0) return;
              const region = data[selection[0].row + 1];
              history.push({ pathname: `/country/${region}` });
            },
          },
        ]}
        chartType="GeoChart"
        width="100%"
        height="600px"
        data={data}
        options={options}
      />
    </div>
  );
}

export default Map;
