import React from "react";
import * as countryFlags from "../shared/images";

import "./CountryBox.css";

const countryBox = props => (
	<article className="CountryBox" onClick={props.clicked}>
		<h1>{props.name}</h1>
		<img src={countryFlags[props.code]} alt="Logo" />
		<div className="Info">
			<div className="Author">{props.author}</div>
		</div>
	</article>
);

export default countryBox;
