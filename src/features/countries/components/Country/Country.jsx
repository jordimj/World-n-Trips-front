import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as actions from '../../actions/actions';
import ExpensesStatistics from './Statistics/Expenses/Expenses';
import HitchhikesStatistics from './Statistics/Hitchhikes/Hitchhikes';
import NightsStatistics from './Statistics/Nights/Nights';
import VisitedSpots from './VisitedSpots/VisitedSpots';
import CountryHeader from './CountryHeader';

function Country() {
  const dispatch = useDispatch();
  const { countryCode } = useParams();

  const country = useSelector((state) => state.countries.country);
  const loading = useSelector((state) => state.countries.loading);

  useEffect(() => {
    dispatch(actions.fetchCountryStatistics(countryCode));
  }, [countryCode]);

  if (!country || loading) return null;

  const { info, citiesVisited, statesVisited, statistics } = country;
  const { kilometersWalked, nights, expenses, hitchhikes, trips } = statistics;

  return (
    <Fragment>
      <CountryHeader info={info} statesVisited={statesVisited} trips={trips} />
      {citiesVisited.length !== 0 && (
        <VisitedSpots cities={citiesVisited} states={statesVisited} />
      )}
      {nights && <NightsStatistics kmWalked={kilometersWalked} nights={nights} />}
      {hitchhikes && (
        <HitchhikesStatistics hitchhikes={hitchhikes} totalNights={nights.count.total} />
      )}
      {expenses && (
        <ExpensesStatistics expenses={expenses} totalNights={nights.count.total} />
      )}
    </Fragment>
  );
}
export default Country;
