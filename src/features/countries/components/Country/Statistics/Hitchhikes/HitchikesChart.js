import { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { HOUR_LABELS } from '../../../../../../constants';

const CHART_KIND_RIDES = 'rides';
const CHART_KIND_DISTANCES = 'distances';
const CHART_KIND_MINUTES = 'minutes';

const TITLES = {
  [CHART_KIND_RIDES]: 'Number of cars hitched per hour',
  [CHART_KIND_DISTANCES]: 'Kilometers hitched per hour',
  [CHART_KIND_MINUTES]: 'Minutes waiting on the road per hour',
};

const extractDesiredData = (data, chartKind) => {
  const reducedData = data.reduce((acc, stat) => {
    return {
      ...acc,
      [stat.hour]: stat[chartKind],
    };
  }, new Array(24).fill(0));

  return Object.values(reducedData);
};

export default function HitchhikesChart({ stats, chartKind }) {
  const chartRef = useRef();
  const data = extractDesiredData(stats, chartKind);

  useEffect(() => {
    const lineChart = new Chart(chartRef.current, {
      type: 'line',
      data: {
        labels: HOUR_LABELS,
        datasets: [
          {
            data,
            backgroundColor: ['rgba(255,0,0, 0.5)'],
            fill: true,
            tension: 0.5,
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
              size: 30,
            },
          },
        },
        scales: {
          y: {
            ticks: {
              stepSize: chartKind === CHART_KIND_RIDES && 1,
            },
          },
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
