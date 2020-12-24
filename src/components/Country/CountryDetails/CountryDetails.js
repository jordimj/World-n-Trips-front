import DetailRow from './DetailRow/DetailRow';
import styles from './CountryDetails.module.css';

const CountryDetails = ({ info }) => {
  return (
    <div>
      <div className={styles.details_panel}>
        <img src={info.flagUrl} alt={`${info.name}'s flag`} />
        <DetailRow label="Capital" value={info.capital} />
        <DetailRow label="Region" value={info.region} />
        <DetailRow label="Local name" value={info.localName} />
        <DetailRow
          label="Surface area"
          value={new Intl.NumberFormat().format(info.surfaceArea)}
        />
        <DetailRow
          label="Population"
          value={new Intl.NumberFormat().format(info.population)}
        />
        <DetailRow label="Government form" value={info.governmentForm} />
        <DetailRow label="Independent from" value={info.independenceYear} />
        {/* <DetailRow label="Currencies" value={info.currencies} /> */}
      </div>
    </div>
  );
};

export default CountryDetails;
