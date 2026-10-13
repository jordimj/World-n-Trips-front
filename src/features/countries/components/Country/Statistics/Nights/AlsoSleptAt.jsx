import { getAdverbialNumber } from '@/utils/number';
import styles from './AlsoSleptAt.module.css';

const SLEEPING_PLACE_EMOJIS = {
  Car: '🚗',
  Bus: '🚌',
  Train: '🚂',
  Truck: '🚚',
  Parking: '🅿️',
  Plane: '✈️',
  Ferry: '⛴️',
  Worktrip: '💼',
  Camping: '🏕️',
  Sofa: '🛋️',
  Mosque: '🕌',
  Temple: '🛕',
  'Temple room': '🛏️',
  'Train station': '🚉',
  'Rental car': '🚗',
  'Free hotel': '🏨',
  'Free hostel': '🛌',
  'Security room': '🔒',
  'Closed bar': '🍷',
  'Did not actually sleep, hiked the Mount Sinai instead': '⛰️',
};

export default function AlsoSleptAt({ infoExtra }) {
  const entries = Object.entries(infoExtra ?? {});
  if (entries.length === 0) return null;
  return (
    <aside className={styles.note} aria-label="Other sleeping places">
      <div>
        <h3>Also slept</h3>
        <ul>
          {entries.map(([spot, nights]) => (
            <li key={spot}>
              <span className={styles.emoji} aria-hidden="true">
                {SLEEPING_PLACE_EMOJIS[spot] ?? ''}
              </span>
              <span>
                {spot}
                <span className={styles.count}> · {getAdverbialNumber(nights)}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
