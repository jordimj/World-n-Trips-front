import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import * as actions from '../../store/actions';
import styles from './Country.module.css';

import Divider from '../shared/Divider';
import Map from '../Map/Map';
import ExpensesStatistics from './Statistics/Expenses/Expenses';
import HitchhikesStatistics from './Statistics/Hitchhikes/Hitchhikes';
import NightsStatistics from './Statistics/Nights/Nights';
import CountryDetails from './CountryDetails/CountryDetails';
import Layout from '../UI/Layout/Layout';
import VisitedSpots from './VisitedSpots/VisitedSpots';

function CountryInfo() {
  const dispatch = useDispatch();
  const { countryName } = useParams();

  const country = useSelector((state) => state.country);
  const loading = useSelector((state) => state.loading);
  const isBackMocked = useSelector((state) => state.isBackMocked);

  useEffect(() => {
    dispatch(actions.fetchCountryStatistics(countryName, isBackMocked));
  }, []);

  if (!country || loading) {
    return null;
  }

  const { info, citiesVisited, statesVisited, statistics } = country;
  const { kilometersWalked, nights, expenses, hitchhikes } = statistics;

  const states = statesVisited.map((state) => [state]);

  return (
    <Layout title={info.name}>
      <div className={styles.country}>
        <section>
          <div className={styles.header}>
            <div className={styles.details}>
              <CountryDetails info={info} />
            </div>
            <div className={styles.map}>
              <h1>{countryName}</h1>
              <div className={styles.details_panel_borders_label}>
                {info.continent.toUpperCase()}
              </div>
              <Map data={states.length === 0 ? [['']] : states} />
              <div className={styles.details_panel_borders}>
                <div className={styles.details_panel_borders_label}>
                  Neighbouring countries
                </div>
                <div className={styles.details_panel_borders_container}>
                  {info.borders.map((borderCountry) => (
                    <NavLink to={`/country/${borderCountry}`}>
                      <div className={styles.details_panel_borders_country}>
                        <img
                          src={`https://restcountries.eu/data/${borderCountry.toLowerCase()}.svg`}
                        />
                        <div className={styles.details_panel_name}>
                          {borderCountry}
                        </div>
                      </div>
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {statesVisited && (
            <VisitedSpots kind="states" spots={statesVisited} />
          )}
          {citiesVisited && (
            <VisitedSpots kind="cities" spots={citiesVisited} />
          )}
        </section>

        {statistics.nights && statistics.nights.count.total !== 0 && (
          <React.Fragment>
            <Divider />
            <NightsStatistics km={kilometersWalked} nights={nights} />
          </React.Fragment>
        )}
        {statistics.hitchhikes && statistics.hitchhikes.totalKilometers && (
          <React.Fragment>
            <Divider />
            <HitchhikesStatistics
              hitchhikes={hitchhikes}
              totalNights={nights.count.total}
            />
          </React.Fragment>
        )}
        {statistics.expenses && (
          <React.Fragment>
            <Divider />
            <ExpensesStatistics
              expenses={expenses}
              totalNights={nights.count.total}
            />
          </React.Fragment>
        )}
      </div>
    </Layout>
  );
}
export default CountryInfo;
