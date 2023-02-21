import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export const CHART_COLORS = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  grey: 'rgb(201, 203, 207)',
  maroon: 'rgb(128,0,0)',
  purple: 'rgb(153, 102, 255)',
  olive: 'rgb(128,128,0)',
  teal: 'rgb(0,128,128)',
  navy: 'rgb(0,0,128)',
  salmon: 'rgb(250,128,114)',
  lavender: 'rgb(230,230,250)',
};

const BORDER_COLOR = 'rgba(255, 99, 132, 0.8)';
const HOVER_BORDER_COLOR = 'rgba(128, 128, 128, 1)';

export default function ExpensesChart({ expensesByCategory }) {
  const chartRef = useRef();

  const data = Object.values(expensesByCategory);
  const labels = Object.keys(expensesByCategory);

  useEffect(() => {
    const pieChart = new Chart(chartRef.current, {
      type: 'pie',
      data: {
        labels,
        datasets: [
          {
            data,
            hoverBorderColor: HOVER_BORDER_COLOR,
            borderColor: BORDER_COLOR,
            borderWidth: 1,
            backgroundColor: Object.values(CHART_COLORS),
          },
        ],
      },
      options: {
        aspectRatio: 2,
        plugins: {
          legend: {
            position: 'right',
          },
          tooltip: {
            caretSize: 10,
            padding: 10,
            bodyFont: {
              size: 15,
              weight: 900,
            },
          },
        },
      },
    });

    return () => pieChart.destroy();
  }, [expensesByCategory]);

  return <canvas ref={chartRef} />;
}
