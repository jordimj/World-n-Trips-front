import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { Box, Chip, Stack, Tooltip, Typography, Zoom } from '@mui/material';
import * as actions from '../../actions/actions';
import Map from '../Map/Map';
import ExpensesStatistics from './Statistics/Expenses/Expenses';
import HitchhikesStatistics from './Statistics/Hitchhikes/Hitchhikes';
import NightsStatistics from './Statistics/Nights/Nights';
import CountryDetails from './CountryDetails/CountryDetails';
import VisitedSpots from './VisitedSpots/VisitedSpots';
import { buildTripName } from '../../utils/helpers';
import styles from './Country.module.css';

function CountryInfo() {
  const dispatch = useDispatch();
  const { countryCode } = useParams();

  const country = useSelector((state) => state.country);
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    dispatch(actions.fetchCountryStatistics(countryCode));
  }, [countryCode]);

  if (!country || loading) return null;

  const { info, citiesVisited, statesVisited, statistics } = country;
  const { kilometersWalked, nights, expenses, hitchhikes, trips } = statistics;

  const stateCodes = statesVisited.map((state) => [state.code]);

  return (
    <Fragment>
      <Stack
        direction="row"
        gap={4}
        sx={{ mt: '50px', mb: '25px', placeItems: 'center' }}
      >
        <div className={styles.details}>
          <CountryDetails info={info} />
          <Stack direction="row" gap={2} justifyContent="center" marginTop={5}>
            {trips?.map((trip) => (
              <Chip label={buildTripName(trip)} variant="outlined" />
            ))}
          </Stack>
        </div>
        <Box className={styles.map}>
          <Typography variant="h1">{info.name}</Typography>
          <Typography variant="subtitle1">{info.continent.toUpperCase()}</Typography>
          <Map data={[[''], ...stateCodes]} />
          {info.borders && (
            <div className={styles.bordersContainer}>
              <Typography variant="subtitle1">Neighbouring countries</Typography>
              <div className={styles.neighbouringCountries}>
                {info.borders.length === 0 ? (
                  <Typography>{`${info.name} has none`}</Typography>
                ) : (
                  info.borders.map(([countryCode, countryName]) => (
                    <Tooltip title={countryName} arrow TransitionComponent={Zoom}>
                      <NavLink
                        key={countryCode}
                        to={`/country/${countryCode}/`}
                        className={styles.neighbouringCountry}
                      >
                        <img
                          src={`${process.env.PUBLIC_URL}/img/flags/${countryCode}.png`}
                        />
                      </NavLink>
                    </Tooltip>
                  ))
                )}
              </div>
            </div>
          )}
        </Box>
      </Stack>
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
export default CountryInfo;
