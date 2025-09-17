import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { DATA_APPENDICES } from '@/constants';
import Chip from '@/template/components/Chip/Chip';
import { buildTripName } from '@/utils';
import { numberFormatter } from '@/utils/number';
import { CountryInfo } from '../../../model/country.schema';
import DetailRow from './DetailRow/DetailRow';
import styles from './CountryDetails.module.css';

interface Props {
  info?: CountryInfo;
  trips?: Array<string>;
  isLoading?: boolean;
}

const CountryDetails = (props: Props) => {
  const { info, trips, isLoading = false } = props;

  return (
    <Box className={styles.root}>
      <Box className={styles.details}>
        <img src={info?.flagUrl} alt={`${info?.name}'s flag`} />
        <DetailRow label="Capital" value={info?.capital} isLoading={isLoading} />
        <DetailRow label="Region" value={info?.region} isLoading={isLoading} />
        <DetailRow label="Local name" value={info?.localName} isLoading={isLoading} />
        <DetailRow
          label="Surface area"
          value={numberFormatter(info?.surfaceArea, DATA_APPENDICES.SQUARE_METERS)}
          isLoading={isLoading}
        />
        <DetailRow
          label="Population"
          value={numberFormatter(info?.population)}
          isLoading={isLoading}
        />
        <DetailRow
          label="Government form"
          value={info?.governmentForm}
          isLoading={isLoading}
        />
        <DetailRow
          label="Independent from"
          value={info?.independenceYear}
          isLoading={isLoading}
        />
      </Box>
      <Stack
        direction="row"
        justifyContent="center"
        flexWrap="wrap"
        sx={{ columnGap: 2, mt: 1 }}
      >
        {trips?.sort().map((trip) => (
          <Chip key={trip} label={buildTripName(trip)} />
        ))}
      </Stack>
    </Box>
  );
};

export default CountryDetails;
