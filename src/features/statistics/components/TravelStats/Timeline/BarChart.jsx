import { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const PER_YEAR_CHART = 'year';
const PER_MONTH_CHART = 'month';

const TITLES = {
  [PER_YEAR_CHART]: 'Number of days traveling per year',
  [PER_MONTH_CHART]: 'Number of days traveling per month',
};

const DEFAULT_ALL_MONTHS = {
  January: 0,
  February: 0,
  March: 0,
  April: 0,
  May: 0,
  June: 0,
  July: 0,
  August: 0,
  September: 0,
  October: 0,
  November: 0,
  December: 0,
};

function getChartOptions(kind) {
  return {
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
  };
}

function getDatasets(data, kind, isAllTime) {
  if (kind === PER_MONTH_CHART && isAllTime) {
    return [
      {
        data: { ...DEFAULT_ALL_MONTHS, ...data.allTime },
        backgroundColor: ['rgba(255,0,0, 0.5)'],
        fill: true,
        tension: 0.5,
      },
      {
        data: data.afterLongTrip,
        backgroundColor: ['rgba(0,0,255, 0.5)'],
        fill: true,
        tension: 0.5,
      },
    ];
  }

  if (kind === PER_MONTH_CHART && !isAllTime) {
    return [
      {
        data: { ...DEFAULT_ALL_MONTHS, ...data.allTime },
        backgroundColor: ['rgba(255,0,0, 0.5)'],
        fill: true,
        tension: 0.5,
      },
    ];
  }

  return [
    {
      data,
      backgroundColor: ['rgba(255,0,0, 0.5)'],
      fill: true,
      tension: 0.5,
    },
  ];
}

function BarChart({ data, kind, isAllTime = true }) {
  const chartRef = useRef();

  useEffect(() => {
    const lineChart = new Chart(chartRef.current, {
      type: 'bar',
      data: { datasets: getDatasets(data, kind, isAllTime) },
      options: getChartOptions(kind),
    });

    return () => lineChart.destroy();
  }, [data]);

  return <canvas ref={chartRef} />;
}

export default BarChart;
