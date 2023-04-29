import { NavLink } from 'react-router-dom';
import { Box, Stack, Tooltip, Typography, Zoom } from '@mui/material';
import { getCountryFlagSrc } from '@/utils';
import styles from './NeighboringCountries.module.css';

function NeighboringCountries({ info }) {
  return (
    <Stack className={styles.container}>
      <Typography variant="subtitle2">Neighboring countries</Typography>
      <Box className={styles.neighboringCountries}>
        {info.borders.length === 0 ? (
          <Typography>{`${info.name} has none`}</Typography>
        ) : (
          info.borders.map(([countryCode, countryName, visited]) => (
            <Tooltip
              key={countryName}
              title={countryName}
              arrow
              TransitionComponent={Zoom}
            >
              <NavLink
                key={countryCode}
                to={`/countries/${countryCode}/`}
                className={[styles.neighboringCountry, visited && styles.visited].filter(
                  Boolean
                )}
              >
                <img src={getCountryFlagSrc(countryCode)} alt={countryName} />
              </NavLink>
            </Tooltip>
          ))
        )}
      </Box>
    </Stack>
  );
}

export default NeighboringCountries;
