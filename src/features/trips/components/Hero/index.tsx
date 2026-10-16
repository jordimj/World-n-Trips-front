import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import Chip from '@/template/components/Chip/Chip';
import { formatTripDates } from '@/utils/date';
import type { Trip } from '../../model/trips.schema';
import styles from './Hero.module.css';

interface HeroProps {
  trip: Trip;
}

function Hero({ trip }: HeroProps) {
  const hasChip = trip.telework || trip.worktrip;

  return (
    <section data-trip-hero className={styles.hero} aria-labelledby="trip-title">
      <img className={styles.picture} src={trip.picture} alt="" fetchPriority="high" />
      <div className={styles.text}>
        <h1 id="trip-title">{trip.name}</h1>
        {trip.summary && <p className={styles.summary}>{trip.summary}</p>}
        <div className={styles.details}>
          {trip.arrivalDate && trip.departureDate && (
            <p className={styles.date}>
              <CalendarTodayOutlinedIcon aria-hidden="true" />
              {formatTripDates(trip.arrivalDate, trip.departureDate)}
            </p>
          )}
          {hasChip && <Chip variant={trip.telework ? 'telework' : 'worktrip'} />}
        </div>
      </div>
    </section>
  );
}

export default Hero;
