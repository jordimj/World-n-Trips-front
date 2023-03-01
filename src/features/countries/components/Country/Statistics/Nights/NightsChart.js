import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { Box } from '@mui/material';

const BORDER_COLOR = 'rgba(255, 99, 132, 0.8)';
const HOVER_BORDER_COLOR = 'rgba(128, 128, 128, 1)';

export default function NightsChart({ data: count }) {
  const chartRef = useRef();

  const data = Object.values(count);
  const labels = Object.keys(count);

  useEffect(() => {
    let delayed;
    const chart = new Chart(chartRef.current, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [
          {
            data,
            hoverBorderColor: HOVER_BORDER_COLOR,
            borderColor: BORDER_COLOR,
            borderWidth: 1,
            backgroundColor: ['rgb(75, 192, 192)', 'rgb(255, 99, 132)'],
          },
        ],
      },
      options: {
        responsive: true,
        aspectRatio: 2.5,
        plugins: {
          legend: {
            display: false,
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
        animation: {
          onComplete: () => (delayed = true),
          delay: (context) => {
            let delay = 0;
            if (context.type === 'data' && context.mode === 'default' && !delayed) {
              delay = context.dataIndex * 300 + context.datasetIndex * 100;
            }
            return delay;
          },
        },
      },
    });

    return () => chart.destroy();
  }, [count]);

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <canvas ref={chartRef} />
    </Box>
  );
}
