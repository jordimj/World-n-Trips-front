import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions';

import Divider from '../shared/Divider';
import Map from '../Map/Map';
import ExpensesStatistics from '../Statistics/Expenses/Expenses';
import HitchhikesStatistics from '../Statistics/Hitchhikes/Hitchhikes';
import NightsStatistics from '../Statistics/Nights/Nights';
import InfoLabel from '../shared/InfoLabel';
import * as countryFlags from '../shared/images';
import { useParams } from 'react-router-dom';

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
    <div
      className="Content"
      style={{
        display: 'flex',
        flexDirection: 'column',
        textAlign: '-webkit-center',
      }}
    >
      <h1>{countryName}</h1>
      <section className="generalInfo">
        <h2>General information</h2>
        <div style={{ display: 'flex', flexFlow: 'row', placeItems: 'center' }}>
          <div style={{ width: '35%' }}>
            <img src={countryFlags[info.alpha2code]} alt="Logo" />
            <InfoLabel label="Local name" value={info.local_name} />
            <InfoLabel label="Region" value={info.region} />
            <InfoLabel label="Continent" value={info.continent} />
            <InfoLabel
              label="Surface area"
              value={new Intl.NumberFormat().format(info.surface_area)}
              appendix="km²"
            />
            <InfoLabel
              label="Population"
              value={new Intl.NumberFormat().format(info.population)}
            />
            <InfoLabel
              label="Independent from"
              value={info.independence_year}
            />
            <Divider />
            <p></p>Places visited: <p>{citiesVisited.join(', ')}.</p>
          </div>
          <div style={{ width: '65%' }}>
            <Map data={states.length === 0 ? [['']] : states} />
          </div>
        </div>
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
  );
}
export default CountryInfo;
