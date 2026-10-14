import { useId, useRef, useState } from 'react';
import { StatesVisited } from '@/features/countries/model/country.schema';
import Spots from './Spots';
import styles from './VisitedSpots.module.css';

interface Props {
  cities: Array<string>;
  states: StatesVisited;
}
export default function VisitedSpots({ cities, states }: Props) {
  const [active, setActive] = useState<'cities' | 'states'>('cities');
  const id = useId();
  const citiesRef = useRef<HTMLButtonElement>(null);
  const statesRef = useRef<HTMLButtonElement>(null);
  const spots = active === 'cities' ? cities : states.map((state) => state.name || state.code);
  return (
    <section className={styles.root} aria-labelledby={`${id}-heading`}>
      <div className={styles.heading}>
        <h2 id={`${id}-heading`}>Places visited</h2>
        <div className={styles.tabs} role="tablist" aria-label="Visited places">
          {(['cities', 'states'] as const).map((kind) => (
            <button
              type="button"
              key={kind}
              ref={kind === 'cities' ? citiesRef : statesRef}
              id={`${id}-${kind}`}
              role="tab"
              aria-controls={`${id}-panel`}
              aria-selected={active === kind}
              tabIndex={active === kind ? 0 : -1}
              onClick={() => setActive(kind)}
              onKeyDown={(event) => {
                if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
                event.preventDefault();
                const next =
                  event.key === 'Home'
                    ? 'cities'
                    : event.key === 'End'
                      ? 'states'
                      : kind === 'cities'
                        ? 'states'
                        : 'cities';
                setActive(next);
                (next === 'cities' ? citiesRef : statesRef).current?.focus();
              }}
            >
              {kind === 'cities' ? 'Cities' : 'States'} ·{' '}
              {kind === 'cities' ? cities.length : states.length}
            </button>
          ))}
        </div>
      </div>
      <div
        role="tabpanel"
        id={`${id}-panel`}
        aria-labelledby={`${id}-${active}`}
        tabIndex={0}
        className={styles.panel}
      >
        {spots.length ? (
          <Spots spots={spots} />
        ) : (
          <p className={styles.empty}>No {active} recorded yet.</p>
        )}
      </div>
    </section>
  );
}
