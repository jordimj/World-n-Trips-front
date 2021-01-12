import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js';
import { HOUR_LABELS } from '../../../../constants';

export default function HitchhikesChart(props) {
  const { data, chartKind } = props;
  const chartRef = useRef();
  const finalData = Object.values(data);

  const TITLES = {
    cars: 'Number of cars hitched per hour',
    kilometers: 'Kilometers hitched per hour',
    minutes: 'Minutes waiting on the road per hour',
  };

  useEffect(() => {
    const myChartRef = chartRef.current;
    const lineChart = new Chart(myChartRef, {
      type: 'line',
      data: {
        labels: HOUR_LABELS,
        datasets: [
          {
            data: finalData,
            backgroundColor: ['rgba(255,0,0, 0.5)'],
          },
        ],
      },
      options: {
        aspectRatio: 4.5,
        legend: {
          display: false,
        },
        layout: {
          padding: {
            bottom: 30,
          },
        },
        title: {
          display: true,
          text: TITLES[chartKind],
          padding: 30,
          fontSize: 30,
        },
      },
    });

    return () => lineChart.destroy();
  }, [data]);

  return <canvas ref={chartRef} />;
}
