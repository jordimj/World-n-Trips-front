import { useState } from 'react';
import { Link } from 'react-router-dom';
import ArrowForward from '@mui/icons-material/ArrowForward';
import LandscapeOutlined from '@mui/icons-material/LandscapeOutlined';
import useTrips from '@/features/trips/hooks/useTrips';
import { Trip } from '@/features/trips/model/trips.schema';
import { formatTripDates } from '@/utils/date';
import styles from './RecentTrips.module.css';

function RecentTrip({ trip }: { trip: Trip }) {
  const [failedPicture, setFailedPicture] = useState<string | null>(null);

  return (
    <li>
      <Link className={styles.trip} to={`/trips/${trip.id}`}>
        {failedPicture === trip.picture ? (
          <span className={styles.pictureFallback}>
            <LandscapeOutlined aria-hidden="true" />
          </span>
        ) : (
          <img
            src={trip.picture}
            alt=""
            loading="lazy"
            onError={() => setFailedPicture(trip.picture)}
          />
        )}
        <span className={styles.description}>
          <span className={styles.name}>{trip.name}</span>
          {trip.arrivalDate && trip.departureDate && (
            <span className={styles.dates}>
              {formatTripDates(trip.arrivalDate, trip.departureDate)}
            </span>
          )}
        </span>
        <ArrowForward className={styles.arrow} fontSize="small" aria-hidden="true" />
      </Link>
    </li>
  );
}

export default function RecentTrips() {
  const { data: trips } = useTrips();
  const recentTrips = trips?.slice(1, 4) ?? [];

  if (recentTrips.length === 0) return null;

  return (
    <section className={styles.root} aria-labelledby="recent-trips-heading">
      <h2 id="recent-trips-heading">Recent trips</h2>
      <ul>
        {recentTrips.map((trip) => (
          <RecentTrip key={trip.id} trip={trip} />
        ))}
      </ul>
      <Link className={styles.allTrips} to="/trips">
        All trips <ArrowForward fontSize="small" aria-hidden="true" />
      </Link>
    </section>
  );
}
