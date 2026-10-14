import { DATA_APPENDICES } from '@/constants';
import { numberFormatter } from '@/utils/number';
import { CountryInfo } from '../../../model/country.schema';
import NeighboringCountries from '../NeighboringCountries';
import DetailRow from './DetailRow/DetailRow';
import styles from './CountryDetails.module.css';

interface Props {
  info?: CountryInfo;
  isLoading?: boolean;
}
const CountryDetails = ({ info, isLoading = false }: Props) => (
  <section className={styles.details} aria-label="Country facts">
    <h2>Country facts</h2>
    <dl>
      <DetailRow label="Capital" value={info?.capital} isLoading={isLoading} />
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
      <DetailRow label="Government form" value={info?.governmentForm} isLoading={isLoading} />
      <DetailRow label="Independent from" value={info?.independenceYear} isLoading={isLoading} />
    </dl>
    <NeighboringCountries info={info} isLoading={isLoading} />
  </section>
);
export default CountryDetails;
