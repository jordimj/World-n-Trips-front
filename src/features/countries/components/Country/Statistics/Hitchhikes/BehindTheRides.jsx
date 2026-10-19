import { useState } from 'react';
import AirIcon from '@mui/icons-material/Air';
import DirectionsBusOutlinedIcon from '@mui/icons-material/DirectionsBusOutlined';
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TwoWheelerOutlinedIcon from '@mui/icons-material/TwoWheelerOutlined';
import { numberFormatter } from '@/utils/number';
import styles from './Hitchhikes.module.css';

const format = (value, unit = '') =>
  value == null ? 'Not recorded' : numberFormatter(value, unit).trim();
const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

function Breakdown({ title, values, subject }) {
  const total = values.reduce((sum, { count }) => sum + count, 0);
  const percentage = (count) =>
    new Intl.NumberFormat('en-GB', { style: 'percent', maximumFractionDigits: 1 }).format(
      count / total
    );
  const rows = (items) => (
    <dl className={styles.breakdownRows}>
      {items.map(({ label, count }) => (
        <div key={label}>
          <div className={styles.breakdownLabel}>
            <dt>{label}</dt>
            <dd>{format(count)}</dd>
          </div>
          <div className={styles.breakdownBarRow}>
            <div className={styles.barTrack} aria-hidden="true">
              <span style={{ width: `${(count / total) * 100}%` }} />
            </div>
            <span
              className={styles.breakdownPercentage}
              title={`Share of segments with a recorded ${subject.toLowerCase()}`}
            >
              {percentage(count)}
            </span>
          </div>
        </div>
      ))}
    </dl>
  );
  return (
    <div>
      <h4>{title}</h4>
      {values.length > 0 ? rows(values.slice(0, 5)) : <p className={styles.note}>Not recorded.</p>}
      {values.length > 5 && (
        <details className={styles.moreBreakdown}>
          <summary>
            Show all {subject === 'Vehicle type' ? 'vehicle types' : 'nationalities'}
          </summary>
          {rows(values.slice(5))}
        </details>
      )}
    </div>
  );
}

function RideLog({ entries, totalCars, unsuccessfulAttempts }) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(20);
  const showCountry = new Set(entries.map((entry) => entry.countryCode).filter(Boolean)).size > 1;
  return (
    <details className={styles.rideLog} onToggle={(event) => setOpen(event.currentTarget.open)}>
      <summary>
        <span className={styles.logSummaryText}>
          <span className={styles.logSummaryTitle}>Every lift along the way</span>
          <span className={styles.logSummaryCount}>
            {format(totalCars)} {totalCars === 1 ? 'ride' : 'rides'}
            {unsuccessfulAttempts > 0 &&
              ` · ${format(unsuccessfulAttempts)} unsuccessful ${unsuccessfulAttempts === 1 ? 'attempt' : 'attempts'}`}
          </span>
        </span>
        <ExpandMoreIcon className={styles.logChevron} aria-hidden="true" />
      </summary>
      {open && (
        <>
          <ol className={styles.logEntries}>
            {entries.slice(0, visible).map((entry) => (
              <li key={entry.id} className={styles.logEntry}>
                <span className={styles.logStop} aria-hidden="true">
                  {entry.failed ? (
                    <MoreHorizIcon />
                  ) : ['Truck', 'Minitruck', 'Pickup'].includes(entry.vehicleType) ? (
                    <LocalShippingOutlinedIcon />
                  ) : [
                      'Bus',
                      'Minibus',
                      'Minivan',
                      'Van',
                      'Private bus',
                      'Soviet bus',
                      'Marshrutka',
                    ].includes(entry.vehicleType) ? (
                    <DirectionsBusOutlinedIcon />
                  ) : ['Motorcycle', 'Quad'].includes(entry.vehicleType) ? (
                    <TwoWheelerOutlinedIcon />
                  ) : (
                    <DirectionsCarOutlinedIcon />
                  )}
                </span>
                <div className={styles.logDate}>
                  {entry.date ? (
                    <time dateTime={entry.date}>
                      {dateFormatter.format(new Date(`${entry.date}T00:00:00Z`))}
                    </time>
                  ) : (
                    'Date not recorded'
                  )}
                  {entry.hour && <span>{entry.hour.slice(0, 5)}</span>}
                </div>
                <div className={styles.logRoute}>
                  <p className={styles.routeTitle}>
                    {entry.origin ?? 'Origin not recorded'} →{' '}
                    {entry.failed
                      ? (entry.destination ?? 'No pickup')
                      : (entry.destination ?? 'Destination not recorded')}
                    {showCountry && entry.country && (
                      <span className={styles.routeCountry}> ({entry.country})</span>
                    )}
                  </p>
                  <div className={styles.logDetails}>
                    {entry.failed ? (
                      <span className={styles.attemptLabel}>No lift this time</span>
                    ) : (
                      <span>
                        {entry.vehicleType ?? 'Vehicle not recorded'} ·{' '}
                        {entry.nationality ?? 'Nationality not recorded'}
                        {entry.openAir && ' · Open air'}
                        {entry.rideCount != null && entry.rideCount > 0 && entry.rideCount < 1 && (
                          <span> · Split journey ({format(entry.rideCount)} of a ride)</span>
                        )}
                        {entry.remarks && ` · ${entry.remarks}`}
                      </span>
                    )}
                    {entry.failed && entry.remarks && <span> · {entry.remarks}</span>}
                  </div>
                </div>
                <div className={styles.logNumbers}>
                  {!entry.failed && (
                    <p className={styles.logDistance}>
                      {entry.distance == null ? (
                        'Not recorded'
                      ) : (
                        <>
                          {format(entry.distance)} <span>km</span>
                        </>
                      )}
                    </p>
                  )}
                  <p className={styles.note}>
                    {entry.minutesWaiting == null
                      ? 'Waiting not recorded'
                      : entry.minutesWaiting === 0
                        ? 'No wait'
                        : `Waited ${format(entry.minutesWaiting, 'min')}`}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          {visible < entries.length && (
            <button
              className={styles.showMore}
              type="button"
              onClick={() => setVisible((count) => count + 20)}
            >
              Show more entries ({format(entries.length - visible)} remaining)
            </button>
          )}
        </>
      )}
    </details>
  );
}

export default function BehindTheRides({ hitchhikes }) {
  const {
    vehicleTypes,
    nationalities,
    recordedRideSegments,
    totalKilometersOpenAir,
    totalKilometers,
    openAirSegments,
    rideLog,
    totalCars,
    unsuccessfulAttempts,
  } = hitchhikes;
  const hasBreakdown = recordedRideSegments > 0;
  const openAirEntries = rideLog.filter((entry) => !entry.failed && entry.openAir);
  const isSinglePickup = openAirEntries.length === 1 && openAirEntries[0].vehicleType === 'Pickup';
  return (
    <>
      {hasBreakdown && (
        <div className={styles.behind}>
          <div className={styles.behindHeader}>
            <div>
              <h3>Behind the rides</h3>
              <p className={styles.note}>The vehicles and people along the way.</p>
            </div>
            {openAirSegments > 0 && (
              <p className={styles.openAir}>
                <AirIcon fontSize="small" aria-hidden="true" />
                <span>
                  {totalKilometersOpenAir == null
                    ? 'Open-air distance not recorded'
                    : `${format(totalKilometersOpenAir, 'km')} in the open air`}
                  <span className={styles.openAirShare}>
                    {isSinglePickup
                      ? 'One pickup ride'
                      : `${format(openAirSegments)} open-air ${openAirSegments === 1 ? 'segment' : 'segments'}`}
                    {totalKilometersOpenAir != null &&
                      totalKilometers > 0 &&
                      ` · ${new Intl.NumberFormat('en-GB', { maximumFractionDigits: 1 }).format((totalKilometersOpenAir / totalKilometers) * 100)}% of your distance`}
                  </span>
                </span>
              </p>
            )}
          </div>
          <div className={styles.breakdowns}>
            <Breakdown title="What picked you up" values={vehicleTypes} subject="Vehicle type" />
            <Breakdown title="Who you met" values={nationalities} subject="Nationality" />
          </div>
        </div>
      )}
      {rideLog.length > 0 && (
        <RideLog
          key={`${rideLog[0].id}-${rideLog.at(-1).id}`}
          entries={rideLog}
          totalCars={totalCars}
          unsuccessfulAttempts={unsuccessfulAttempts}
        />
      )}
    </>
  );
}
