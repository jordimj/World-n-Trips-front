import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { Grid } from "@material-ui/core";

import Map from "../../components/Map/Map";
import "./MapPage.css";
import SelectItems from "../../components/Navigation/SelectItems/SelectItems";
import SwitchWithLabel from "../../components/shared/SwitchWithLabel";


class MapPage extends Component {
	state = {
		coloredDepeningOnCitiesVisited: false,
	};

	componentDidMount() {
		if (this.props.country) {
			this.props.onUnsetCountryInfo();
		}
		if (this.props.countriesBeen.length === 0) {
			this.props.onInitCountries(this.props.isBackMocked);
		}
	}

	coloredMapHandler = (coloredMap) => {

		if (this.state.coloredDepeningOnCitiesVisited !== coloredMap)
		{
			this.setState((prevState, coloredMap) => {
				if (prevState.coloredDepeningOnCitiesVisited !== coloredMap) {
					return {
						...prevState,
						coloredDepeningOnCitiesVisited: !prevState.coloredDepeningOnCitiesVisited
					};
				}
			 });
		}
	}

	render() {
		let mapData = [];

		if (this.state.coloredDepeningOnCitiesVisited) {
			mapData = this.props.countriesBeen.map(country => [country.name, Number(country.numberOfSpots)]);
			mapData.unshift(["Country", "Number of spots"]);
		} else {
			mapData = this.props.countriesBeen.map(country => [country.name]);
		 	mapData.unshift(["Country"]);
		}

		return (
			<div className="Content">
				<h1>Countries I've been to</h1>
				<Grid
				  container
				  direction="column"
				  justify="center"
				  alignItems="center"
				  >
					<SelectItems />
					<SwitchWithLabel onChange={this.coloredMapHandler} />
					{ this.props.countriesBeen ?
					<Map
						data={mapData}
						region={
							this.props.region !== "all"
								? this.props.region
								: this.props.continent
						}
					/>
					: null }
				</Grid>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		countriesBeen: state.countriesBeen,
		continent: state.continent,
		region: state.region,
		country: state.country,
		error: state.error,
		isBackMocked: state.isBackMocked
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onInitCountries: isBackMocked =>
			dispatch(actions.initCountries(isBackMocked)),
		onUnsetCountryInfo: () =>
			dispatch(actions.unsetCountryInfo())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);
