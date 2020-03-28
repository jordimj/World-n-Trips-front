import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Toolbar from './components/Navigation/Toolbar/Toolbar';
import MapPage from "./containers/MapPage/MapPage";
import CountriesList from "./containers/CountriesList/CountriesList";
import Country from "./components/Country/Country";

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<Toolbar />
				<Switch>
					<Route path="/country/:countryName" component={Country} />
					<Route path="/list" component={CountriesList} />
					<Route path="/" exact component={MapPage} />
				</Switch>
			</BrowserRouter>
		);
	}
}

export default App;
