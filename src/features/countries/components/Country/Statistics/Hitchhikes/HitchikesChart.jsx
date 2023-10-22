import { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { HOUR_LABELS } from '@/constants';

const CHART_KIND_RIDES = 'rides';

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
        aspectRatio: 3.5,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            caretSize: 10,
            padding: 16,
            titleMarginBottom: 8,
            titleFont: {
              size: 14,
            },
            bodyFont: {
              size: 24,
              weight: 900,
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
