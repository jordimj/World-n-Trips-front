import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ArrowForward from '@mui/icons-material/ArrowForward';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { ALL_REGIONS, WORLD_MAP } from '@/constants';
import CONTINENTS_AND_REGIONS from '@/constants/continentsAndRegions';
import useVisitedCountries from '@/features/countries/hooks/useVisitedCountries';
import LastTrip from '@/features/home/components/LastTrip';
import RecentTrips from '@/features/home/components/RecentTrips';
import TravelSummary from '@/features/home/components/TravelSummary';
import useMapFilters from '@/features/home/hooks/useMapFilters';
import useFullWidth from '@/hooks/useFullWidth';
import { RootState } from '@/store';
import Map from '../../../countries/components/Map/Map';
import styles from './Home.module.css';

function Home() {
  const { fullWidth } = useFullWidth();
  const { data: visitedCountries, isPending, isError, refetch } = useVisitedCountries();
  const { graduallyColored, selectedContinent, selectedRegion } = useSelector(
    (state: RootState) => state.home.worldMapConf
  );
  const { toggleColoring, continentSelectedHandler, regionSelectedHandler } = useMapFilters();
  const regions = CONTINENTS_AND_REGIONS.find((item) => item.code === selectedContinent)?.regions;
  const mapData = graduallyColored
    ? [
        ['Country', 'Number of spots'],
        ...(visitedCountries ?? []).map((country) => [country.alpha2code, country.numberOfSpots]),
      ]
    : [['Country'], ...(visitedCountries ?? []).map((country) => [country.alpha2code])];

  return (
    <div className={`${styles.container} ${fullWidth ? styles.fullWidth : ''}`}>
      <header className={styles.introduction}>
        <h1>My world, so far.</h1>
      </header>
      <div className={styles.overview}>
        <section className={styles.atlas} aria-label="Your travel map and statistics">
          <div className={styles.filters}>
            <div className={styles.selectField}>
              <label id="home-continent-label" htmlFor="home-continent">
                Continent
              </label>
              <Select
                id="home-continent"
                labelId="home-continent-label"
                className={styles.selectControl}
                value={selectedContinent}
                onChange={continentSelectedHandler}
              >
                {CONTINENTS_AND_REGIONS.map((continent) => (
                  <MenuItem key={continent.code} value={continent.code}>
                    {continent.name}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div className={styles.selectField}>
              <label id="home-region-label" htmlFor="home-region">
                Region
              </label>
              <Select
                id="home-region"
                labelId="home-region-label"
                className={styles.selectControl}
                value={selectedRegion}
                disabled={selectedContinent === WORLD_MAP}
                onChange={regionSelectedHandler}
              >
                <MenuItem value={ALL_REGIONS}>All</MenuItem>
                {regions?.map((region) => (
                  <MenuItem key={region.code} value={region.code}>
                    {region.name}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <label className={styles.colorToggle}>
              <input
                type="checkbox"
                role="switch"
                checked={graduallyColored}
                onChange={toggleColoring}
              />
              <span className={styles.switchTrack} aria-hidden="true" />
              Color by places visited
            </label>
          </div>
          <div className={styles.mapCanvas} aria-busy={isPending}>
            {isPending ? (
              <p className={styles.mapMessage} role="status">
                Loading your travel map…
              </p>
            ) : isError ? (
              <div className={styles.mapMessage} role="alert">
                <p>Your travel map couldn’t be loaded.</p>
                <button className={styles.retry} onClick={() => void refetch()}>
                  Try again
                </button>
              </div>
            ) : (
              <Map
                data={mapData}
                region={selectedRegion === ALL_REGIONS ? selectedContinent : selectedRegion}
                countryLinks={Object.fromEntries(
                  (visitedCountries ?? []).map((country) => [
                    country.alpha2code,
                    country.alpha3code,
                  ])
                )}
              />
            )}
          </div>
          <div className={styles.mapFooter}>
            <div className={styles.legend} aria-label="Map legend">
              <span>
                <i className={styles.visited} />
                {graduallyColored ? 'Visited · darker means more places' : 'Visited'}
              </span>
              <span>
                <i className={styles.unvisited} />
                Not visited
              </span>
            </div>
            <Link to="/countries">
              Browse countries <ArrowForward fontSize="small" />
            </Link>
          </div>
          {!isPending && !isError && visitedCountries?.length === 0 && (
            <p className={styles.emptyMap}>
              Your atlas starts here. Add a place to see your travels on the map.
            </p>
          )}
          <TravelSummary />
        </section>
        <aside className={styles.tripColumn} aria-label="Your latest journeys">
          <LastTrip />
          <RecentTrips />
        </aside>
      </div>
    </div>
  );
}
export default Home;
