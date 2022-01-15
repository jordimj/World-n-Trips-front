import styles from './CountryBox.module.css';

const CountryBox = ({ name, code, onClick }) => (
  <article className={styles.countryBox} onClick={onClick}>
    <p>{name}</p>
    <img src={process.env.PUBLIC_URL + `/img/flags/${code}.png`} alt={`${name}'s flag`} />
  </article>
);

export default CountryBox;
