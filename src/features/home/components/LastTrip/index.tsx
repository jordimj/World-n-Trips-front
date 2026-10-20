import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ArrowForward from '@mui/icons-material/ArrowForward';
import LandscapeOutlined from '@mui/icons-material/LandscapeOutlined';
import useTrips from '@/features/trips/hooks/useTrips';
import { formatTripDates } from '@/utils/date';
import styles from './LastTrip.module.css';

export default function LastTrip() {
  const { data: trips, isPending, isError, refetch } = useTrips();
  const [, setSearchParams] = useSearchParams();
  const [failedPicture, setFailedPicture] = useState<string | null>(null);
  const [loadedPicture, setLoadedPicture] = useState<string | null>(null);
  const lastTrip = trips?.at(0);
  const hasCover = Boolean(
    lastTrip &&
      !isPending &&
      !isError &&
      loadedPicture === lastTrip.picture &&
      failedPicture !== lastTrip.picture
  );
  return (
    <section
      className={`${styles.root} ${hasCover ? styles.cover : ''}`}
      aria-labelledby="last-trip-heading"
      aria-busy={isPending}
    >
      <h2 id="last-trip-heading">Last trip</h2>
      {isPending ? (
        <div className={styles.loading} role="status">
          Loading your latest trip…
        </div>
      ) : isError ? (
        <div className={styles.empty} role="alert">
          <p>Your latest trip couldn’t be loaded.</p>
          <button onClick={() => void refetch()}>Try again</button>
        </div>
      ) : !lastTrip ? (
        <div className={styles.empty}>
          <LandscapeOutlined aria-hidden="true" />
          <p>No trips saved yet. Your next story starts here.</p>
          <button onClick={() => setSearchParams({ dialog: 'inserter' })}>
            Add your first trip
          </button>
        </div>
      ) : (
        <>
          {failedPicture === lastTrip.picture ? (
            <div className={styles.pictureFallback}>
              <LandscapeOutlined aria-hidden="true" />
              <span>{lastTrip.name}</span>
            </div>
          ) : (
            <img
              className={styles.picture}
              src={lastTrip.picture}
              alt=""
              onLoad={() => setLoadedPicture(lastTrip.picture)}
              onError={() => setFailedPicture(lastTrip.picture)}
            />
          )}
          {hasCover && <div className={styles.coverSpace} aria-hidden="true" />}
          <div className={styles.details}>
            <h3>{lastTrip.name}</h3>
            {lastTrip.arrivalDate && lastTrip.departureDate && (
              <p className={styles.dates}>
                {formatTripDates(lastTrip.arrivalDate, lastTrip.departureDate)}
              </p>
            )}
            {lastTrip.summary && <p className={styles.summary}>{lastTrip.summary}</p>}
          </div>
          <Link className={styles.action} to={`/trips/${lastTrip.id}`}>
            View trip details <ArrowForward fontSize="small" />
          </Link>
        </>
      )}
    </section>
  );
}
