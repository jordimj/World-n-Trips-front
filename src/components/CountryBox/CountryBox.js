import React from "react";
import * as countryFlags from "../shared/images";

import "./CountryBox.css";

const countryBox = props => (
	<article className="CountryBox" onClick={props.clicked}>
		<p>{props.name}</p>
		<img src={countryFlags[props.code]} alt="Logo" />
	</article>
);

export default countryBox;
