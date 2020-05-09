import React, { useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions";

import Spinner from "../shared/Spinner/Spinner";
import Map from "../Map/Map";
import ExpensesStatistics from "../Statistics/Expenses/Expenses";
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

  const { info, kilometersWalked, citiesVisited, nights, expenses } = statistics;
  const country = null;

  return (
    <div
      className="Content"
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "80%",
        textAlign: "-webkit-center"
      }}>
      <h1>{props.match.params.countryName.toUpperCase()}</h1>
      <section className="generalInfo">
        <h2>General information</h2>
        <div style={{ display: "flex", flexFlow: "row", placeItems: "center" }}>
          <div style={{ width: "50%" }}>
            <img src={countryFlags[info.alpha2code]} alt="Logo" />
            <InfoLabel label="Local name" value={info.local_name} />
            <InfoLabel label="Region" value={info.region} />
            <InfoLabel label="Continent" value={info.continent} />
            <InfoLabel label="Surface area" value={new Intl.NumberFormat().format(info.surface_area)} appendix="km²" />
            <InfoLabel label="Population" value={new Intl.NumberFormat().format(info.population)} />
            <InfoLabel label="Independent from" value={info.independence_year} />
          </div>
          <div style={{ width: "50%" }}>
            <Map data={[["Country"], [props.match.params.countryName]]} />
          </div>
        </div>
      </section>

      {statistics.expenses.sumInEuros &&
        <ExpensesStatistics expenses={expenses} totalNights={nights.count.total} />
      }

    </div>
  );

}
export default CountryInfo;
