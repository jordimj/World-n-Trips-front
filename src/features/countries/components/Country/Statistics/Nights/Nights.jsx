import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import { numberFormatter } from '@/utils/number';
import AlsoSleptAt from './AlsoSleptAt';
import NightsTable from './NightsTable';
import useCalendarDuration from './useCalendarDuration';
import styles from './Nights.module.css';

export default function NightsStatistics({ nights, kmWalked, dailyCount = 0, hasDayData = true }) {
  const { days, basis } = useCalendarDuration(nights.count.total, dailyCount);
  const { count, spots, infoExtra } = nights;
  const hasSleepingNotes = Object.keys(infoExtra ?? {}).length > 0;
  const freeShare = count.total > 0 ? (count.free / count.total) * 100 : 0;
  const detailedSpots = Object.entries(spots).map(([spotKind, numberOfNights]) => ({
    spotKind,
    numberOfNights,
  }));
  return (
    <section className={styles.section} aria-labelledby="nights-heading">
      <h2 id="nights-heading">Days & Nights</h2>
      <div className={styles.layout}>
        <div>
          <dl className={styles.metrics}>
            <div>
              <dt>{basis === 'calendar' ? 'Calendar days' : 'Recorded days'}</dt>
              <dd>{days ?? '—'}</dd>
            </div>
            <div>
              <dt>Recorded nights</dt>
              <dd>{numberFormatter(count.total)}</dd>
            </div>
          </dl>
          <p className={styles.note}>
            {basis === 'calendar'
              ? 'Includes arrival and departure, even days without records.'
              : days
                ? 'Calendar duration unavailable; using days linked to recorded nights.'
                : 'No calendar duration or recorded days available.'}
          </p>
          <div className={styles.walkingSection}>
            <div className={styles.walking}>
              <h3>
                <DirectionsWalkIcon fontSize="small" />
                On foot
              </h3>
              <dl className={styles.walkingTotal}>
                <dt>Kilometers walked</dt>
                <dd>{hasDayData && kmWalked != null ? numberFormatter(kmWalked) : '—'}</dd>
              </dl>
            </div>
            {days && hasDayData && kmWalked != null ? (
              <dl className={styles.walkingAverage}>
                <dt>Kilometers / day</dt>
                <dd>{numberFormatter(kmWalked / days)}</dd>
              </dl>
            ) : null}
          </div>
        </div>
        <div className={styles.breakdown}>
          {count.total > 0 ? (
            <>
              <div className={styles.stayLabels}>
                <span>
                  Free stays <strong>{count.free}</strong>
                </span>
                <span>
                  Paid stays <strong>{count.paid}</strong>
                </span>
              </div>
              <div className={styles.stayBar} aria-hidden="true">
                <span style={{ width: `${freeShare}%` }} />
              </div>
            </>
          ) : (
            <p>No nights recorded.</p>
          )}
          <div className={hasSleepingNotes ? styles.details : styles.detailsFullWidth}>
            <div>
              <h3>Accommodation types</h3>
              {detailedSpots.length > 0 ? (
                <NightsTable spots={detailedSpots} />
              ) : (
                <p className={styles.note}>No accommodation records yet.</p>
              )}
            </div>
            {hasSleepingNotes ? (
              <div className={styles.supporting}>
                <AlsoSleptAt infoExtra={infoExtra} />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
