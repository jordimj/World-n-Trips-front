import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Toolbar from './components/Navigation/Toolbar/Toolbar';
import MapPage from "./containers/MapPage/MapPage";
import CountriesList from "./containers/CountriesList/CountriesList";

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<Toolbar />
				<Switch>
					<Route path="/list" component={CountriesList} />
					<Route path="/" exact component={MapPage} />
				</Switch>
			</BrowserRouter>
		);
	}
}

export default App;
