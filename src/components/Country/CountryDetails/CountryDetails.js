import DetailRow, { APPENDIX_TYPES } from './DetailRow/DetailRow';
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
        value={new Intl.NumberFormat().format(info.surfaceArea)}
        appendix={APPENDIX_TYPES.SQUARE_METERS}
      />
      <DetailRow
        label="Population"
        value={new Intl.NumberFormat().format(info.population)}
      />
      <DetailRow label="Government form" value={info.governmentForm} />
      <DetailRow label="Independent from" value={info.independenceYear} />
      {/* <DetailRow label="Currencies" value={info.currencies} /> */}
    </div>
  );
};

export default CountryDetails;
