import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const PER_YEAR_CHART = 'year';
const PER_MONTH_CHART = 'month';

const TITLES = {
  [PER_YEAR_CHART]: 'Number of days traveling per year',
  [PER_MONTH_CHART]: 'Number of days traveling per month',
};

export default function BarChart({ data, kind }) {
  const chartRef = useRef();

  useEffect(() => {
    const lineChart = new Chart(chartRef.current, {
      type: 'bar',
      data: {
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
            text: TITLES[kind],
            padding: 30,
            font: {
              size: 30,
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
