import React from 'react';
import HitchhikesChart from './HitchikesChart';
import DetailRow from '../../CountryDetails/DetailRow/DetailRow';
import styles from './Hitchhikes.module.css';

export default function HitchhikesStatistics(props) {
  const {
    totalKilometers,
    totalKilometersOpenAir,
    daysOnTheRoad,
    totalCars,
    distances,
    minutesWaiting,
  } = props.hitchhikes;
  const totalNights = props.totalNights;

  return (
    <section>
      <h2>Hitchhikes</h2>
      <div className={styles.container}>
        <div className={styles.partition}>
          <DetailRow
            label="Total of kilometers"
            value={`${totalKilometers} km`}
          />
          <DetailRow
            label="Kilometers in the back of the pickup"
            value={`${totalKilometersOpenAir} km`}
          />
          <DetailRow label="Days on the road" value={`${daysOnTheRoad} days`} />
          {minutesWaiting && (
            <DetailRow
              label="Waiting on the road"
              value={`${minutesWaiting.total} mins`}
            />
          )}
          <DetailRow
            label="Number of rides we got"
            value={`${Math.trunc(totalCars)} rides`}
          />
        </div>
        <div className={styles.partition}>
          <DetailRow
            label="Average kilometers per day in the country"
            value={`${(totalKilometers / totalNights).toFixed(2)} km`}
          />
          <DetailRow
            label="Average kilometers per day on the road"
            value={`${(totalKilometers / daysOnTheRoad).toFixed(2)} km`}
          />
          <DetailRow
            label="Average rides per day on the road"
            value={`${(totalCars / daysOnTheRoad).toFixed(2)} rides`}
          />
          <DetailRow
            label="Longest distance per ride"
            value={`${distances.longest} km`}
          />
          <DetailRow
            label="Average distance per ride"
            value={`${Number(distances.average).toFixed(2)} km`}
          />
          <DetailRow
            label="Shortest distance per ride"
            value={`${distances.shortest} km`}
          />
          {minutesWaiting && (
            <>
              <DetailRow
                label="Longest wait per ride"
                value={`${Number(minutesWaiting.waits.longest).toFixed(
                  0
                )} mins`}
              />
              <DetailRow
                label="Average wait per ride"
                value={`${Number(minutesWaiting.waits.average).toFixed(
                  2
                )} mins`}
              />
              <DetailRow
                label="Shortest wait per ride"
                value={Number(minutesWaiting.waits.shortest).toFixed(0)}
                appendix="mins"
              />
            </>
          )}
        </div>
      </div>
      {minutesWaiting && (
        <div>
          <HitchhikesChart data={minutesWaiting.carsPerHour} chartKind="cars" />
          <HitchhikesChart
            data={minutesWaiting.kilometersPerHour}
            chartKind="kilometers"
          />
          <HitchhikesChart
            data={minutesWaiting.waitingPerHour}
            chartKind="minutes"
          />
        </div>
      )}
    </section>
  );
}
