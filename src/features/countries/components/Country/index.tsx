import { Fragment } from 'react';
import useCountry from '@/features/countries/hooks/useCountry';
import CountryHeader from './CountryHeader';
import ExpensesStatistics from './Statistics/Expenses/Expenses';
import HitchhikesStatistics from './Statistics/Hitchhikes/Hitchhikes';
import NightsStatistics from './Statistics/Nights/Nights';
import VisitedSpots from './VisitedSpots';

function Country() {
  const { data: country, isFetching } = useCountry();

  return (
    <Fragment>
      <CountryHeader
        info={country?.info}
        statesVisited={country?.statesVisited}
        trips={country?.trips}
        isLoading={isFetching}
      />
      {country?.citiesVisited?.length !== 0 && (
        <VisitedSpots
          cities={country?.citiesVisited ?? []}
          states={country?.statesVisited ?? []}
        />
      )}
      {country?.nights && (
        <NightsStatistics kmWalked={country?.kilometersWalked} nights={country.nights} />
      )}
      {country?.hitchhikes && (
        <HitchhikesStatistics
          hitchhikes={country?.hitchhikes}
          totalNights={country?.nights?.count.total}
        />
      )}
      {country?.expenses && (
        <ExpensesStatistics
          expenses={country?.expenses}
          totalNights={country?.nights?.count.total}
        />
      )}
    </Fragment>
  );
}
export default Country;
