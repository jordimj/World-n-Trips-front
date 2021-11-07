import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import * as actions from '../../actions/actions';
import Divider from '../UI/DividerLine/DividerLine';
import Map from '../Map/Map';
import ExpensesStatistics from './Statistics/Expenses/Expenses';
import HitchhikesStatistics from './Statistics/Hitchhikes/Hitchhikes';
import NightsStatistics from './Statistics/Nights/Nights';
import CountryDetails from './CountryDetails/CountryDetails';
import VisitedSpots from './VisitedSpots/VisitedSpots';
import styles from './Country.module.css';

function CountryInfo() {
  const dispatch = useDispatch();
  const { countryCode } = useParams();

  const country = useSelector((state) => state.country);
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    dispatch(actions.fetchCountryStatistics(countryCode));
  }, [countryCode]);

  if (!country || loading) {
    return null;
  }

  const { info, citiesVisited, statesVisited, statistics } = country;
  const { kilometersWalked, nights, expenses, hitchhikes } = statistics;

  const stateCodes = statesVisited.map((state) => [state.code]);

  return (
    <div className={styles.country}>
      <div className={styles.header}>
        <div className={styles.details}>
          <CountryDetails info={info} />
        </div>
        <div className={styles.map}>
          <h1>{info.name}</h1>
          <div className={styles.subtitle}>{info.continent.toUpperCase()}</div>
          <Map data={stateCodes.length === 0 ? [['']] : stateCodes} />
          <div className={styles.bordersContainer}>
            <div className={styles.subtitle}>Neighbouring countries</div>
            <div className={styles.neighbouringCountries}>
              {JSON.parse(info.borders).map((borderCountry) => (
                <NavLink
                  to={`/country/${borderCountry}/`}
                  className={styles.neighbouringCountry}
                >
                  <img
                    src={`https://restcountries.eu/data/${borderCountry.toLowerCase()}.svg`}
                  />
                  {borderCountry}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>
      {statesVisited.length > 0 && (
        <VisitedSpots kind="states" spots={statesVisited.map(state => state.name)} />
      )}
      {citiesVisited.length > 0 && (
        <VisitedSpots kind="cities" spots={citiesVisited} />
      )}

      {statistics.nights && statistics.nights.count.total !== 0 && (
        <>
          <Divider />
          <NightsStatistics kmWalked={kilometersWalked} nights={nights} />
        </>
      )}
      {statistics.hitchhikes && statistics.hitchhikes.totalKilometers && (
        <>
          <Divider />
          <HitchhikesStatistics
            hitchhikes={hitchhikes}
            totalNights={nights.count.total}
          />
        </>
      )}
      {statistics.expenses && (
        <>
          <Divider />
          <ExpensesStatistics
            expenses={expenses}
            totalNights={nights.count.total}
          />
        </>
      )}
    </div>
  );
}
export default CountryInfo;
