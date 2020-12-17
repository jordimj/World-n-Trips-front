import React from 'react';
import InfoLabel from '../../../shared/InfoLabel';
import Divider from '../../../shared/Divider';
import HitchhikesChart from './HitchikesChart';

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
    <section className="Nights">
      <h2>Hitchhikes</h2>
      <div
        style={{
          display: 'flex',
          flexFlow: 'row',
          placeItems: 'center',
          marginBottom: '30px',
        }}
      >
        <div style={{ width: '50%' }}>
          <InfoLabel
            label="Total of kilometers"
            value={totalKilometers}
            appendix="km"
          />
          <InfoLabel
            label="Kilometers in the back of the pickup"
            value={totalKilometersOpenAir}
            appendix="km"
          />
          <InfoLabel
            label="Days on the road"
            value={daysOnTheRoad}
            appendix="days"
          />
          {minutesWaiting && (
            <InfoLabel
              label="Waiting on the road"
              value={minutesWaiting.total}
              appendix="mins"
            />
          )}
          <InfoLabel
            label="Number of rides we got"
            value={Math.trunc(totalCars)}
            appendix="rides"
          />
        </div>
        <div style={{ width: '50%' }}>
          <InfoLabel
            label="Average kilometers per day in the country"
            value={(totalKilometers / totalNights).toFixed(2)}
            appendix="km"
          />
          <InfoLabel
            label="Average kilometers per day on the road"
            value={(totalKilometers / daysOnTheRoad).toFixed(2)}
            appendix="km"
          />
          <InfoLabel
            label="Average rides per day on the road"
            value={(totalCars / daysOnTheRoad).toFixed(2)}
            appendix="rides"
          />
          <Divider />
          <InfoLabel
            label="Longest distance per ride"
            value={distances.longest}
            appendix="km"
          />
          <InfoLabel
            label="Average distance per ride"
            value={Number(distances.average).toFixed(2)}
            appendix="km"
          />
          <InfoLabel
            label="Shortest distance per ride"
            value={distances.shortest}
            appendix="km"
          />
          {minutesWaiting && (
            <React.Fragment>
              <Divider />
              <InfoLabel
                label="Longest wait per ride"
                value={Number(minutesWaiting.waits.longest).toFixed(0)}
                appendix="mins"
              />
              <InfoLabel
                label="Average wait per ride"
                value={Number(minutesWaiting.waits.average).toFixed(2)}
                appendix="mins"
              />
              <InfoLabel
                label="Shortest wait per ride"
                value={Number(minutesWaiting.waits.shortest).toFixed(0)}
                appendix="mins"
              />
            </React.Fragment>
          )}
        </div>
      </div>
      {minutesWaiting && (
        <div
          style={{
            display: 'flex',
            flexFlow: 'column',
            placeItems: 'center',
            marginBottom: '30px',
            width: '85%',
          }}
        >
          <HitchhikesChart data={minutesWaiting.carsPerHour} chartKind="CARS" />
          <HitchhikesChart
            data={minutesWaiting.kilometersPerHour}
            chartKind="KILOMETERS"
          />
          <HitchhikesChart
            data={minutesWaiting.waitingPerHour}
            chartKind="MINUTES"
          />
        </div>
      )}
    </section>
  );
}
