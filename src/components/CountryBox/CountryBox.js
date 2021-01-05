import React from 'react';
import styles from './CountryBox.module.css';

const countryBox = ({ name, code, onClick }) => (
  <article className={styles.CountryBox} onClick={onClick}>
    <p>{name}</p>
    <img
      src={process.env.PUBLIC_URL + `/img/flags/${code}.png`}
      alt={`${name}'s flag`}
    />
  </article>
);

export default countryBox;
