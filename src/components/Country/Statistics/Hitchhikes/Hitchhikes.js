import React from 'react';
import HitchhikesChart from './HitchikesChart';
import DetailRow, { APPENDIX_TYPES } from '../../CountryDetails/DetailRow/DetailRow';
import styles from './Hitchhikes.module.css';

export default function HitchhikesStatistics({ hitchhikes, totalNights }) {
  const {
    totalKilometers,
    totalKilometersOpenAir,
    daysOnTheRoad,
    totalCars,
    distances,
    minutesWaiting,
    statsPerHour,
  } = hitchhikes;

  return (
    <section>
      <h2>Hitchhikes</h2>
      <div className={styles.container}>
        <div className={styles.partition}>
          <DetailRow
            label="Total of kilometers"
            value={totalKilometers}
            appendix={APPENDIX_TYPES.KM}
          />
          <DetailRow
            label="Kilometers in the back of the pickup"
            value={totalKilometersOpenAir}
            appendix={APPENDIX_TYPES.KM}
          />
          <DetailRow label="Days on the road" value={daysOnTheRoad}
            appendix={APPENDIX_TYPES.DAYS}
          />
          {minutesWaiting && (
            <DetailRow
              label="Waiting on the road"
              value={minutesWaiting.total}
              appendix={APPENDIX_TYPES.MINS}
            />
          )}
          <DetailRow
            label="Number of rides we got"
            value={Math.trunc(totalCars)}
            appendix={APPENDIX_TYPES.RIDES}
          />
        </div>
        <div className={styles.partition}>
          <DetailRow
            label="Average kilometers per day in the country"
            value={(totalKilometers / totalNights).toFixed(2)}
            appendix={APPENDIX_TYPES.KM_PER_DAY}
          />
          <DetailRow
            label="Average kilometers per day on the road"
            value={(totalKilometers / daysOnTheRoad).toFixed(2)}
            appendix={APPENDIX_TYPES.KM}
          />
          <DetailRow
            label="Average rides per day on the road"
            value={(totalCars / daysOnTheRoad).toFixed(2)}
            appendix={APPENDIX_TYPES.RIDES}
          />
          <DetailRow
            label="Longest distance per ride"
            value={distances.longest}
            appendix={APPENDIX_TYPES.KM}
          />
          <DetailRow
            label="Average distance per ride"
            value={Number(distances.average).toFixed(2)}
            appendix={APPENDIX_TYPES.KM}
          />
          <DetailRow
            label="Shortest distance per ride"
            value={distances.shortest}
            appendix={APPENDIX_TYPES.KM}
          />
          {minutesWaiting && (
            <>
              <DetailRow
                label="Longest wait per ride"
                value={Number(minutesWaiting.waits.longest).toFixed(0)}
                appendix={APPENDIX_TYPES.MINS}
              />
              <DetailRow
                label="Average wait per ride"
                value={Number(minutesWaiting.waits.average).toFixed(2)}
                appendix={APPENDIX_TYPES.MINS}
              />
              <DetailRow
                label="Shortest wait per ride"
                value={Number(minutesWaiting.waits.shortest).toFixed(0)}
                appendix={APPENDIX_TYPES.MINS}
              />
            </>
          )}
        </div>
      </div>
      {minutesWaiting && (
        <>
          <HitchhikesChart stats={statsPerHour} chartKind="rides" />
          <HitchhikesChart stats={statsPerHour} chartKind="distance" />
          <HitchhikesChart stats={statsPerHour} chartKind="minutes" />
        </>
      )}
    </section>
  );
}
