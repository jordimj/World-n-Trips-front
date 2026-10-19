import { useState } from 'react';
import HitchhikesChart from './HitchikesChart';
import styles from './Hitchhikes.module.css';

const views = [
  { id: 'rides', label: 'Rides' },
  { id: 'distance', label: 'Distance' },
  { id: 'minutes', label: 'Waiting' },
];
const titles = {
  rides: 'Rides by hour',
  distance: 'Kilometers by hour',
  minutes: 'Minutes waiting by hour',
};

export default function HitchhikesCharts({ statsPerHour, hasWaiting }) {
  const [visibleChart, setVisibleChart] = useState('rides');
  return (
    <div className={styles.charts}>
      <div className={styles.chartHeader}>
        <h3>By time of day</h3>
        <div className={styles.controls} role="group" aria-label="Hourly chart view">
          {views
            .filter((view) => view.id !== 'minutes' || hasWaiting)
            .map((view) => (
              <button
                key={view.id}
                type="button"
                aria-pressed={visibleChart === view.id}
                onClick={() => setVisibleChart(view.id)}
              >
                {view.label}
              </button>
            ))}
        </div>
      </div>
      <p id="hitchhikes-chart-title" className={styles.chartTitle}>
        {titles[visibleChart]}
      </p>
      <div className={styles.chartCanvas}>
        <HitchhikesChart stats={statsPerHour} chartKind={visibleChart} />
      </div>
      <p className={styles.note}>
        Only entries with a recorded hour are shown. Rides and distance exclude unsuccessful
        attempts; waiting time includes them.
      </p>
    </div>
  );
}
