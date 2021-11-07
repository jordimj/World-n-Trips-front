import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { HOUR_LABELS } from '../../../../constants';

export default function HitchhikesChart({ data, chartKind }) {
  const chartRef = useRef();
  const finalData = Object.values(data);

  const TITLES = {
    cars: 'Number of cars hitched per hour',
    kilometers: 'Kilometers hitched per hour',
    minutes: 'Minutes waiting on the road per hour',
  };

  useEffect(() => {
    const lineChart = new Chart(chartRef.current, {
      type: 'line',
      data: {
        labels: HOUR_LABELS,
        datasets: [
          {
            data: finalData,
            backgroundColor: ['rgba(255,0,0, 0.5)'],
            fill: true,
            tension: 0.5
          },
        ],
      },
      options: {
        aspectRatio: 4,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: TITLES[chartKind],
            padding: 30,
            font: {
              size: 30
            }
          },
        },
        scales: {
          y: {
            ticks: {
              stepSize: chartKind === 'cars' && 1
            }
          }
        },
        layout: {
          padding: {
            bottom: 30,
          },
        },
      },
    });

    return () => lineChart.destroy();
  }, [data]);

  return <canvas ref={chartRef} />;
}
