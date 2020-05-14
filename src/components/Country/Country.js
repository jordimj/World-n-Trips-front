import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions";

import Divider from "../shared/Divider";
import Spinner from "../shared/Spinner/Spinner";
import Map from "../Map/Map";
import ExpensesStatistics from "../Statistics/Expenses/Expenses";
import HitchhikesStatistics from "../Statistics/Hitchhikes/Hitchhikes";
import NightsStatistics from "../Statistics/Nights/Nights";
import InfoLabel from "../shared/InfoLabel";
import * as countryFlags from "../shared/images";
// import "./FullPost.css";

const CountryInfo = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getCountryStatistics(props.match.params.countryName, false));
  }, []);

  const statistics = useSelector(state => state.statistics);

  if (!statistics) {
    return <Spinner />;
  }

  const { info, kilometersWalked, citiesVisited, nights, expenses, hitchhikes } = statistics;

  return (
    <div
      className="Content"
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "-webkit-center"
      }}>
      <h1>{props.match.params.countryName}</h1>
      <section className="generalInfo">
        <h2>General information</h2>
        <div style={{ display: "flex", flexFlow: "row", placeItems: "center" }}>
          <div style={{ width: "35%" }}>
            <img src={countryFlags[info.alpha2code]} alt="Logo" />
            <InfoLabel label="Local name" value={info.local_name} />
            <InfoLabel label="Region" value={info.region} />
            <InfoLabel label="Continent" value={info.continent} />
            <InfoLabel label="Surface area" value={new Intl.NumberFormat().format(info.surface_area)} appendix="km²" />
            <InfoLabel label="Population" value={new Intl.NumberFormat().format(info.population)} />
            <InfoLabel label="Independent from" value={info.independence_year} />

            <Divider />
            <p></p>Places visited: <p>{citiesVisited.join(", ")}.</p>
          </div>
          <div style={{ width: "65%" }}>
            <Map data={[["Country"], [props.match.params.countryName]]} />
          </div>
        </div>

      </section>

      {statistics.nights && statistics.nights.count.total !== 0 &&
        <React.Fragment>
          <Divider />
          <NightsStatistics km={kilometersWalked} nights={nights} />
        </React.Fragment>
      }
      {statistics.hitchhikes && statistics.hitchhikes.totalKilometers &&
        <React.Fragment>
          <Divider />
          <HitchhikesStatistics hitchhikes={hitchhikes} totalNights={nights.count.total} />
        </React.Fragment>
      }
      {statistics.expenses &&
        <React.Fragment>
          <Divider />
          <ExpensesStatistics expenses={expenses} totalNights={nights.count.total} />
        </React.Fragment>
      }

    </div>
  );

}
export default CountryInfo;
