import React from "react";
import NightsTable from "./NightsTable";
import InfoLabel from "../../shared/InfoLabel";
import { percentageFormatter } from "../../../utils/helpers";

export default function NightsStatistics(props) {
  const { count, spots, infoExtra } = props.nights;
  const kmWalked = props.km;

  return (
    <section className="Nights">
      <h2>Days & nights</h2>
      <div style={{ display: "flex", flexFlow: "row", placeItems: "center", marginBottom: "30px" }}>
        <div style={{ width: "50%" }}>
          <InfoLabel label="Total of nights" value={count.total} />
          <InfoLabel
            label="Free stays"
            value={count.free + " (" + percentageFormatter(count.free / count.total) + ")"} />
          <InfoLabel
            label="Paid stays"
            value={count.paid + " (" + percentageFormatter(count.paid / count.total) + ")"} />
        </div>
        <div style={{ width: "50%" }}>
          <InfoLabel label="Kilometers walked" value={kmWalked} appendix="km" />
          <InfoLabel label="Average kilometers walked" value={(kmWalked/count.total).toFixed(2)} appendix="km / day" />
        </div>
      </div>

      <div style={{ display: "flex", flexFlow: "row", placeItems: "center", marginBottom: "30px" }}>
        <div style={{ width: "65%" }}>
          <NightsTable spots={spots} />
        </div>
        { Object.keys(infoExtra).length > 0 &&
          <div style={{ width: "35%" }}>
            <p>Also I slept:</p>
            <ul style={{
              marginInlineStart: "8em",
              textAlign: "left",
            }}>
              {Object.entries(infoExtra).map(([key, value]) =>
                <li style={{ margin: "5px" }} key={key}>
                  {value === '1'
                    ? "Once in a "
                    : value === '2'
                      ? "Twice in a "
                      : value + " times in a "
                  }{key.toLowerCase()}
                </li>
              )}
            </ul>
          </div>
        }
      </div>
    </section>
  );
}
