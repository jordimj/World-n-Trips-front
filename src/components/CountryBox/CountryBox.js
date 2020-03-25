import React from "react";
import * as images from "./images";

import "./CountryBox.css";

const countryBox = props => (
	<article className="CountryBox" onClick={props.clicked}>
		<h1>{props.name}</h1>
		<img src={images[props.code]} alt="Logo" />
		<div className="Info">
			<div className="Author">{props.author}</div>
		</div>
	</article>
);

export default countryBox;
