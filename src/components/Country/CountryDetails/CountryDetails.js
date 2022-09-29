import DetailRow from './DetailRow/DetailRow';
import { DATA_APPENDICES } from '../../../constants';
import { numberFormatter } from '../../../utils/helpers';
import styles from './CountryDetails.module.css';

const CountryDetails = ({ info }) => {
  return (
    <div className={styles.detailsPanel}>
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
    </div>
  );
};

export default CountryDetails;
