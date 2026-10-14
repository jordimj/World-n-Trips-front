import { NavLink } from 'react-router-dom';
import { Skeleton } from '@mui/material';
import { CountryInfo } from '@/features/countries/model/country.schema';
import CountryFlag from '@/template/components/CountryFlag';
import styles from './NeighboringCountries.module.css';

interface Props {
  info?: CountryInfo;
  isLoading?: boolean;
}
function NeighboringCountries({ info, isLoading = false }: Props) {
  return (
    <section className={styles.container} aria-label="Neighboring countries">
      <h3>Neighboring countries</h3>
      {isLoading ? (
        <Skeleton height={80} />
      ) : !info?.borders.length ? (
        <p>No land borders.</p>
      ) : (
        <ul className={styles.neighboringCountries}>
          {info.borders.map(([code, name, visited]) => (
            <li key={code}>
              <NavLink to={`/countries/${code}/`} className={styles.neighboringCountry}>
                <CountryFlag name={name} />
                <span>
                  {name}
                  <small>{visited ? 'Visited' : 'Not visited'}</small>
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
export default NeighboringCountries;
