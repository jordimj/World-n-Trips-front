import React from 'react';
import styles from './VisitedSpots.module.css';

export default ({ kind, spots }) => {
  return (
    <div className={styles.visited_spots_container}>
      <h3>Visited {kind}</h3>
      <div className={styles.visited_spots}>
        {spots.map((place) => (
          <div id={place}>{place}</div>
        ))}
      </div>
    </div>
  );
};
