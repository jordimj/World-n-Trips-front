import React from "react";
import "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = () => (
	<ul className="NavigationItems">
		<NavigationItem link="/" exact>
			World map
		</NavigationItem>
		<NavigationItem link="/list">List of countries</NavigationItem>
	</ul>
);

export default navigationItems;
