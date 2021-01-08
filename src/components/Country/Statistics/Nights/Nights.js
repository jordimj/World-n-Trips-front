import React from 'react';
import NightsTable from './NightsTable';
import {
  getAdverbialNumber,
  percentageFormatter,
} from '../../../../utils/helpers';
import DetailRow from '../../CountryDetails/DetailRow/DetailRow';
import styles from './Nights.module.css';

export default function NightsStatistics(props) {
  const { count, spots, infoExtra } = props.nights;
  const kmWalked = props.km;

  return (
    <section>
      <h2>Days & nights</h2>
      <div className={styles.container}>
        <div className={styles.overview}>
          <div className={styles.partition}>
            <DetailRow label="Total of nights" value={count.total} />
            <DetailRow
              label="Free stays"
              value={`${count.free} (${percentageFormatter(
                count.free / count.total
              )})`}
            />
            <DetailRow
              label="Paid stays"
              value={`${count.paid} (${percentageFormatter(
                count.paid / count.total
              )})`}
            />
          </div>
          <div className={styles.partition}>
            <DetailRow
              label="Kilometers walked"
              value={kmWalked}
              appendix="km"
            />
            <DetailRow
              label="Average kilometers walked"
              value={`${(kmWalked / count.total).toFixed(2)} km / day`}
            />
          </div>
        </div>

        <NightsTable spots={spots} />

        {Object.keys(infoExtra).length > 0 && (
          <React.Fragment>
            <h4>Also slept:</h4>
            <ul className={styles.extraInfoList}>
              {Object.entries(infoExtra).map(([spot, nights]) => (
                <li key={spot}>
                  {getAdverbialNumber(nights)} in a {spot.toLowerCase()}
                </li>
              ))}
            </ul>
          </React.Fragment>
        )}
      </div>
    </section>
  );
}
