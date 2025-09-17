import { Skeleton, Stack, Typography } from '@mui/material';
import { CountryInfo, StatesVisited } from '../../../model/country.schema';
import Map from '../../Map/Map';
import CountryDetails from '../CountryDetails/CountryDetails';
import NeighboringCountries from '../NeighboringCountries';
import styles from './CountryHeader.module.css';

interface Props {
  info?: CountryInfo;
  statesVisited?: StatesVisited;
  trips?: Array<string>;
  isLoading: boolean;
}

function CountryHeader(props: Props) {
  const { info, statesVisited, trips, isLoading } = props;

  if (isLoading) {
    return (
      <Stack className={styles.header}>
        <CountryDetails info={info} trips={trips} isLoading />
        <Stack className={styles.map} gap={1}>
          <Typography variant="h1">
            <Skeleton width={220} height={80} />
          </Typography>
          <Typography variant="subtitle1">
            <Skeleton width={220} height={40} />
          </Typography>
          <Skeleton width={900} height={700} />
          <NeighboringCountries info={info} isLoading />
        </Stack>
      </Stack>
    );
  }

  return (
    <Stack className={styles.header}>
      <CountryDetails info={info} trips={trips} />
      <Stack className={styles.map} gap={1}>
        <Typography variant="h1">{info?.name}</Typography>
        <Typography variant="subtitle1">{info?.continent}</Typography>
        <Map
          data={[[''], ...(statesVisited?.map((state) => [state.code]) ?? [])]}
          region={info?.alpha2code}
        />
        {info?.borders && <NeighboringCountries info={info} />}
      </Stack>
    </Stack>
  );
}

export default CountryHeader;
