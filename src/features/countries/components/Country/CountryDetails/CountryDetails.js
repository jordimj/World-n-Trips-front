import { Fragment } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import DetailRow from './DetailRow/DetailRow';
import { DATA_APPENDICES } from '../../../../../constants';
import { numberFormatter } from '../../../../../utils/number';
import Chip from '../../../../../template/components/Chip/Chip';
import { buildTripName } from '../../../../../utils';
import styles from './CountryDetails.module.css';

const CountryDetails = ({ info, trips }) => {
  return (
    <Fragment>
      <Box className={styles.details}>
        <img src={info.flagUrl} alt={`${info.name}'s flag`} />
        <DetailRow label="Capital" value={info.capital} />
        <DetailRow label="Region" value={info.region} />
        <DetailRow label="Local name" value={info.localName} />
        <DetailRow
          label="Surface area"
          value={numberFormatter(info.surfaceArea, DATA_APPENDICES.SQUARE_METERS)}
        />
        <DetailRow label="Population" value={numberFormatter(info.population)} />
        <DetailRow label="Government form" value={info.governmentForm} />
        <DetailRow label="Independent from" value={info.independenceYear} />
        {/* <DetailRow label="Currencies" value={info.currencies} /> */}
      </Box>
      <Stack
        direction="row"
        justifyContent="center"
        flexWrap="wrap"
        sx={{ columnGap: 2, mt: 1 }}
      >
        {trips?.sort().map((trip) => (
          <Chip key={trip} label={buildTripName(trip, true)} />
        ))}
      </Stack>
    </Fragment>
  );
};

export default CountryDetails;
