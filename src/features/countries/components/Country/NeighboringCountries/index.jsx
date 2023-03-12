import { NavLink } from 'react-router-dom';
import { Box, Stack, Tooltip, Typography, Zoom } from '@mui/material';
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
                to={`/country/${countryCode}/`}
                className={[styles.neighboringCountry, visited && styles.visited].filter(
                  Boolean
                )}
              >
                <img src={`/img/flags/${countryCode}.png`} />
              </NavLink>
            </Tooltip>
          ))
        )}
      </Box>
    </Stack>
  );
}

export default NeighboringCountries;
