import { NavLink } from 'react-router-dom';
import { Box, Skeleton, Stack, Tooltip, Typography, Zoom } from '@mui/material';
import { CountryInfo } from '@/features/countries/model/country.schema';
import CountryFlag from '@/template/components/CountryFlag';
import styles from './NeighboringCountries.module.css';

interface Props {
  info?: CountryInfo;
  isLoading?: Boolean;
}

function NeighboringCountries(props: Props) {
  const { info, isLoading = false } = props;

  if (isLoading) {
    return (
      <Stack className={styles.container}>
        <Typography variant="subtitle2">Neighboring countries</Typography>
        <Box className={styles.neighboringCountries}>
          {Array.from({ length: 5 }).map((_, idx) => (
            <Skeleton
              key={idx}
              variant="circular"
              height={90}
              className={styles.neighboringCountry}
            />
          ))}
        </Box>
      </Stack>
    );
  }

  return (
    <Stack className={styles.container}>
      <Typography variant="subtitle2">Neighboring countries</Typography>
      <Box className={styles.neighboringCountries}>
        {info?.borders.length === 0 ? (
          <Typography>{`${info.name} has none`}</Typography>
        ) : (
          info?.borders.map(([countryCode, countryName, visited]) => (
            <Tooltip
              key={countryName}
              title={countryName}
              arrow
              TransitionComponent={Zoom}
            >
              <NavLink
                key={countryCode}
                to={`/countries/${countryCode}/`}
                className={[styles.neighboringCountry, visited && styles.visited]
                  .filter(Boolean)
                  .join(' ')}
              >
                <CountryFlag name={countryName} />
              </NavLink>
            </Tooltip>
          ))
        )}
      </Box>
    </Stack>
  );
}

export default NeighboringCountries;
