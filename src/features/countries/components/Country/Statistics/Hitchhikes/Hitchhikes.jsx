import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RouteIcon from '@mui/icons-material/Route';
import { numberFormatter } from '@/utils/number';
import BehindTheRides from './BehindTheRides';
import HitchhikesCharts from './HitchhikesCharts';
import styles from './Hitchhikes.module.css';

const format = (value, unit = '') =>
  value != null && Number.isFinite(Number(value)) ? numberFormatter(Number(value), unit) : '—';

function Comparison({ title, values, unit }) {
  return (
    <div className={styles.comparison}>
      <h3>{title}</h3>
      <dl>
        {['longest', 'average', 'shortest'].map((key) => (
          <div key={key}>
            <dt>{key[0].toUpperCase() + key.slice(1)}</dt>
            <dd>{format(values?.[key], unit)}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function HitchhikesStatistics({ hitchhikes }) {
  const { totalKilometers, daysOnTheRoad, totalCars, distances, minutesWaiting, statsPerHour } =
    hitchhikes;
  const average = (value, denominator) =>
    denominator > 0 && value != null ? Number(value) / denominator : null;

  return (
    <section className={styles.section} aria-labelledby="hitchhikes-heading">
      <h2 id="hitchhikes-heading">Hitchhikes</h2>
      <div className={styles.layout}>
        <div>
          <dl className={styles.metrics}>
            <div>
              <dt>Kilometers hitchhiked</dt>
              <dd>{format(totalKilometers)}</dd>
            </div>
            <div>
              <dt>Rides taken</dt>
              <dd>{format(totalCars)}</dd>
            </div>
          </dl>
          <p className={styles.note}>
            Across {format(daysOnTheRoad)} {Number(daysOnTheRoad) === 1 ? 'day' : 'days'} on the
            road.
          </p>
          {hitchhikes.unsuccessfulAttempts > 0 && (
            <p className={styles.note}>
              {format(totalCars)} {totalCars === 1 ? 'ride taken' : 'rides taken'} ·{' '}
              {format(hitchhikes.unsuccessfulAttempts)} unsuccessful{' '}
              {hitchhikes.unsuccessfulAttempts === 1 ? 'attempt' : 'attempts'}
            </p>
          )}
          <div className={styles.supportingRow}>
            <div>
              <h3 className={styles.supportingHeading}>
                <RouteIcon fontSize="small" /> On the road
              </h3>
              <p className={styles.supportingValue}>
                {format(average(totalKilometers, daysOnTheRoad))}
              </p>
              <p className={styles.roadDayLabel}>Kilometers / road day</p>
              {minutesWaiting && (
                <div className={styles.roadRides}>
                  <p className={styles.supportingValue}>
                    {format(average(totalCars, daysOnTheRoad))}
                  </p>
                  <p className={styles.roadDayLabel}>Rides / road day</p>
                </div>
              )}
            </div>
            {minutesWaiting ? (
              <div className={styles.waitingGroup}>
                <h3 className={styles.supportingHeading}>
                  <AccessTimeIcon fontSize="small" /> Time waiting
                </h3>
                <p className={styles.supportingValue}>{format(minutesWaiting.total)}</p>
                <p className={styles.roadDayLabel}>Minutes waiting in total</p>
                {hitchhikes.unsuccessfulAttempts > 0 && (
                  <p className={styles.note}>Includes unsuccessful attempts.</p>
                )}
              </div>
            ) : (
              <div className={styles.waitingGroup}>
                <dl className={styles.ridesAverage}>
                  <dt>Rides / road day</dt>
                  <dd>{format(average(totalCars, daysOnTheRoad))}</dd>
                </dl>
              </div>
            )}
          </div>
        </div>
        <div className={minutesWaiting ? styles.comparisons : styles.singleComparison}>
          <Comparison title="Ride distances" values={distances} unit="km" />
          {minutesWaiting && (
            <Comparison title="Waiting time" values={minutesWaiting.waits} unit="min" />
          )}
        </div>
      </div>
      {statsPerHour?.length > 0 && (
        <HitchhikesCharts statsPerHour={statsPerHour} hasWaiting={Boolean(minutesWaiting)} />
      )}
      <BehindTheRides hitchhikes={hitchhikes} />
    </section>
  );
}
