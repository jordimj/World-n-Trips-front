import { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { HOUR_LABELS } from '@/constants';
import { numberFormatter } from '@/utils/number';

const units = { rides: 'rides', distance: 'km', minutes: 'min' };

export default function HitchhikesChart({ stats, chartKind }) {
  const chartRef = useRef();

  useEffect(() => {
    const canvas = chartRef.current;
    const data = Array(24).fill(0);
    stats.forEach((stat) => {
      if (Number.isInteger(Number(stat.hour)) && stat.hour >= 0 && stat.hour < 24) {
        data[Number(stat.hour)] = Number(stat[chartKind]) || 0;
      }
    });
    let chart;
    const render = () => {
      chart?.destroy();
      const style = getComputedStyle(canvas);
      const accent = style.getPropertyValue('--summary-accent').trim();
      const muted = style.getPropertyValue('--summary-muted').trim();
      const grid = style.getPropertyValue('--chart-grid').trim();
      const divider = style.getPropertyValue('--border-color').trim();
      chart = new Chart(canvas, {
        type: 'bar',
        data: {
          labels: HOUR_LABELS,
          datasets: [{ data, backgroundColor: accent, borderRadius: 2, maxBarThickness: 30 }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: false,
          font: { family: style.fontFamily },
          plugins: {
            legend: { display: false },
            tooltip: {
              padding: 12,
              callbacks: {
                label: (context) => numberFormatter(context.parsed.y, units[chartKind]),
              },
            },
          },
          scales: {
            x: {
              grid: { display: false },
              border: { color: divider },
              ticks: { color: muted, maxRotation: 0, autoSkip: true, maxTicksLimit: 9 },
              title: { display: true, text: 'Hour of day', color: muted },
            },
            y: {
              beginAtZero: true,
              grid: { color: grid },
              border: { display: true, color: divider, dash: [4, 4] },
              ticks: {
                color: muted,
                ...(chartKind === 'rides' ? { stepSize: 1, precision: 0 } : {}),
              },
            },
          },
        },
      });
    };
    render();
    const observer = new MutationObserver(render);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    return () => {
      observer.disconnect();
      chart.destroy();
    };
  }, [stats, chartKind]);

  return (
    <canvas ref={chartRef} role="img" aria-labelledby="hitchhikes-chart-title">
      {stats
        .map(
          (stat) =>
            `${stat.hour}:00: ${numberFormatter(Number(stat[chartKind]) || 0, units[chartKind])}`
        )
        .join('; ')}
    </canvas>
  );
}
