import React from 'react';
import NightsTable from './NightsTable';
import { percentageFormatter } from '../../../../utils/helpers';
import DetailRow from '../../CountryDetails/DetailRow/DetailRow';
import styles from './Nights.module.css';

export default function NightsStatistics(props) {
  const { count, spots, infoExtra } = props.nights;
  const kmWalked = props.km;

  return (
    <section>
      <h2>Days & nights</h2>
      <div className={styles.container}>
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
          <DetailRow label="Kilometers walked" value={kmWalked} appendix="km" />
          <DetailRow
            label="Average kilometers walked"
            value={`${(kmWalked / count.total).toFixed(2)} km / day`}
          />
        </div>
      </div>

      <div className={styles.container}>
        <NightsTable spots={spots} />
        {/* [TODO: refactor] 
        {Object.keys(infoExtra).length > 0 && (
          <div style={{ width: '35%' }}>
            <p>Also I slept:</p>
            <ul
              style={{
                marginInlineStart: '8em',
                textAlign: 'left',
              }}
            >
              {Object.entries(infoExtra).map(([key, value]) => (
                <li style={{ margin: '5px' }} key={key}>
                  {value === '1'
                    ? 'Once in a '
                    : value === '2'
                    ? 'Twice in a '
                    : value + ' times in a '}
                  {key.toLowerCase()}
                </li>
              ))}
            </ul>
          </div>
        )} */}
      </div>
    </section>
  );
}
