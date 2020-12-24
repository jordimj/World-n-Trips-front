import React from 'react';
import * as countryFlags from '../shared/images';

import styles from './CountryBox.module.css';

const countryBox = (props) => (
  <article className={styles.CountryBox} onClick={props.clicked}>
    <p>{props.name}</p>
    <img src={countryFlags[props.code]} alt="Logo" />
  </article>
);

export default countryBox;
