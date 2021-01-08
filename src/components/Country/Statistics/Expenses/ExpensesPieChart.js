import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';

export default function ExpensesPieChart({ expensesByCategory }) {
  const chartRef = useRef();

  const data = Object.values(expensesByCategory);
  const labels = Object.keys(expensesByCategory);

  useEffect(() => {
    const myChartRef = chartRef.current;
    // const myChartRef = chartRef.current.getContext("2d");
    const pieChart = new Chart(myChartRef, {
      type: 'pie',
      data: {
        labels,
        datasets: [
          {
            data,
            hoverBorderColor: 'rgba(128, 128, 128, 1)',
            borderColor: 'rgba(255, 99, 132, 0.8)',
            borderWidth: 1,
            backgroundColor: [
              'rgba(255,0,0, 0.5)',
              'rgba(255,255,0, 0.5)',
              'rgba(0,255,0, 0.5)',
              'rgba(128,0,0, 0.5)',
              'rgba(255,0,255, 0.5)',
              'rgba(128,128,0, 0.5)',
              'rgba(0,255,127, 0.5)',
              'rgba(128,0,128, 0.5)',
              'rgba(255,99,132, 0.5)',
              'rgba(0,0,128, 0.5)',
              'rgba(0,255,255, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
            ],
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
        legend: {
          position: 'right',
        },
      },
    });

    return () => pieChart.destroy();
  }, [expensesByCategory]);

  return <canvas ref={chartRef} />;
}
