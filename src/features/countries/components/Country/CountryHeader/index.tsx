import { useEffect, useRef, useState } from 'react';
import { Skeleton } from '@mui/material';
import { buildTripName, getCountryFlagSrc } from '@/utils';
import { CountryInfo, StatesVisited } from '../../../model/country.schema';
import Map from '../../Map/Map';
import CountryDetails from '../CountryDetails/CountryDetails';
import styles from './CountryHeader.module.css';

interface Props {
  info?: CountryInfo;
  statesVisited?: StatesVisited;
  trips?: Array<string>;
  isLoading: boolean;
}

function CountryHeader({ info, statesVisited = [], trips = [], isLoading }: Props) {
  const identityTextRef = useRef<HTMLDivElement>(null);
  const [flagHeight, setFlagHeight] = useState(72);
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapHeight, setMapHeight] = useState(400);
  useEffect(() => {
    const element = mapRef.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      const height = Math.round(entry.contentRect.height);
      if (height > 0) setMapHeight(height);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const element = identityTextRef.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry.contentRect.height > 0) setFlagHeight(entry.contentRect.height);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return (
    <section className={styles.header} aria-label="Country overview" aria-busy={isLoading}>
      <header className={styles.identityRow}>
        <div className={styles.identity}>
          {isLoading ? (
            <Skeleton variant="rectangular" width={72} height={48} />
          ) : (
            info && (
              <img
                src={getCountryFlagSrc(info.alpha3code)}
                alt={`${info.name}'s flag`}
                style={{ height: flagHeight }}
              />
            )
          )}
          <div ref={identityTextRef}>
            <h1>{isLoading ? <Skeleton width={220} /> : info?.name}</h1>
            <p>
              {isLoading ? (
                <Skeleton width={180} />
              ) : (
                `${info?.continent ?? ''} · ${info?.region ?? ''}`
              )}
            </p>
          </div>
        </div>
        {trips.length > 0 && !isLoading && (
          <div className={styles.trips}>
            <span className={styles.tripLabel}>Visited on</span>
            <ul>
              {[...trips].sort().map((trip) => (
                <li key={trip}>{buildTripName(trip)}</li>
              ))}
            </ul>
          </div>
        )}
      </header>
      <div className={styles.layout}>
        <CountryDetails info={info} isLoading={isLoading} />
        <section className={styles.geography} aria-label="Country map">
          <div className={styles.mapHeading}>
            <h2>Your travels</h2>
            {!isLoading && (
              <span className={styles.legend}>
                <span aria-hidden="true" />
                Visited states · {statesVisited.length}
              </span>
            )}
          </div>
          <div
            className={styles.map}
            ref={mapRef}
            role="img"
            aria-label={`Map of ${info?.name ?? 'country'}; ${statesVisited.length} visited states listed in Places visited`}
          >
            {isLoading ? (
              <Skeleton variant="rounded" height={mapHeight} />
            ) : (
              <Map
                data={[
                  [''],
                  ...statesVisited
                    .filter((state) => /^[A-Z]{2}-[A-Z0-9]{1,3}$/.test(state.code))
                    .map((state) => [state.code]),
                ]}
                region={info?.alpha2code}
                height={mapHeight}
              />
            )}
          </div>
        </section>
      </div>
    </section>
  );
}
export default CountryHeader;
