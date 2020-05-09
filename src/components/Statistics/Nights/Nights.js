import React from "react";
import NightsTable from "./NightsTable";
import InfoLabel from "../../shared/InfoLabel";
import { percentageFormatter } from "../../../utils/helpers";

export default function NightsStatistics(props) {
  const { count, spots, infoExtra } = props.nights;

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
          {/* <p>lorem</p> */}
        </div>
      </div>

      <div style={{ display: "flex", flexFlow: "row", placeItems: "center", marginBottom: "30px" }}>
        <div style={{ width: "70%" }}>
          <NightsTable spots={spots} />
        </div>
        <div style={{ width: "30%" }}>
          <p>Also I slept at</p>
          <ul style={{ 
            marginInlineStart: "8em",
            textAlign: "left",
          }}>
            {Object.entries(infoExtra).map(([key, value]) => 
              <li style={{ margin: "5px" }} key={key}>{key}: {value}</li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
