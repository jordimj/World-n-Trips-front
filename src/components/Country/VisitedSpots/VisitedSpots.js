import React from 'react';
import styles from './VisitedSpots.module.css';

export default ({ kind, spots }) => {
  return (
    <div className={styles.visitedSpotsContainer}>
      <h3>Visited {kind}</h3>
      <div className={styles.visitedSpots}>
        {spots.map((place) => (
          <div id={place}>{place}</div>
        ))}
      </div>
    </div>
  );
};
