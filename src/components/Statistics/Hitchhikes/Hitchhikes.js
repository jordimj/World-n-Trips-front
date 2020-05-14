import React from "react";
import InfoLabel from "../../shared/InfoLabel";
import { percentageFormatter } from "../../../utils/helpers";
import Divider from "../../shared/Divider";
import HitchhikesChart from "./HitchikesChart";

export default function HitchhikesStatistics(props) {
  const { totalKilometers, totalKilometersOpenAir, daysOnTheRoad, totalCars, minutesWaiting } = props.hitchhikes;
  const { longestDistance, shortestDistance, averageDistance } = props.hitchhikes.maxMinAvgDistance;
  const { longestWait, shortestWait, averageWait } = props.hitchhikes.maxMinAvgWait;
  const totalNights = props.totalNights;

  return (
    <section className="Nights">
      <h2>Hitchhikes</h2>
      <div style={{ display: "flex", flexFlow: "row", placeItems: "center", marginBottom: "30px" }}>
        <div style={{ width: "50%" }}>
          <InfoLabel label="Total of kilometers" value={totalKilometers} appendix="km" />
          <InfoLabel label="Kilometers in the back of the pickup" value={totalKilometersOpenAir} appendix="km" />
          <InfoLabel label="Days on the road" value={daysOnTheRoad} appendix="days" />
          <InfoLabel label="Waiting on the road" value={minutesWaiting} appendix="mins" />
          <InfoLabel label="Number of rides we got" value={Math.trunc(totalCars)} appendix="rides" />
        </div>
        <div style={{ width: "50%" }}>
          <InfoLabel label="Average kilometers per day in the country" value={(totalKilometers / totalNights).toFixed(2)} appendix="km" />
          <InfoLabel label="Average kilometers per day on the road" value={(totalKilometers / daysOnTheRoad).toFixed(2)} appendix="km" />
          <InfoLabel label="Average rides per day on the road" value={(totalCars / daysOnTheRoad).toFixed(2)} appendix="rides" />
          <Divider />
          <InfoLabel label="Longest distance per ride" value={longestDistance} appendix="km" />
          <InfoLabel label="Average distance per ride" value={Number(averageDistance).toFixed(2)} appendix="km" />
          <InfoLabel label="Shortest distance per ride" value={shortestDistance} appendix="km" />
          <Divider />
          <InfoLabel label="Longest wait per ride" value={Number(longestWait).toFixed(0)} appendix="mins" />
          <InfoLabel label="Average wait per ride" value={Number(averageWait).toFixed(2)} appendix="mins" />
          <InfoLabel label="Shortest wait per ride" value={Number(shortestWait).toFixed(0)} appendix="mins" />
        </div>
      </div>

      <div style={{ display: "flex", flexFlow: "column", placeItems: "center", marginBottom: "30px", width: "85%" }}>
        <HitchhikesChart data={props.hitchhikes.carsPerHour} chartKind="CARS" />
        <HitchhikesChart data={props.hitchhikes.kilometersPerHour} chartKind="KILOMETERS" />
        <HitchhikesChart data={props.hitchhikes.waitingPerHour} chartKind="MINUTES" />
      </div>
    </section>
  );
}
