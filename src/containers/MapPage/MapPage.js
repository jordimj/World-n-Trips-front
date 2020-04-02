import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";

import Map from "../../components/Map/Map";
import "./MapPage.css";
import SelectItems from "../../components/Navigation/SelectItems/SelectItems";
import SwitchWithLabel from "../../components/shared/SwitchWithLabel";

class MapPage extends Component {
	state = {
		coloredDepeningOnCitiesVisites: false,
	};

	componentDidMount() {
		if (this.props.countriesBeen.length === 0) {
			this.props.onInitCountries(this.props.isBackMocked);
		}
	}

	coloredMapHandler = (coloredMap) => {
		// console.log(coloredMap);
		// console.log(typeof(coloredMap));

		if (this.state.coloredDepeningOnCitiesVisites !== coloredMap) 
		{
			// this.setState({
			// 	...this.state,
			// 	coloredDepeningOnCitiesVisites: coloredMap
			// });
			
			this.setState((prevState, coloredMap) => {
				if (prevState.coloredDepeningOnCitiesVisites !== coloredMap) {
					return {
						...prevState,
						coloredDepeningOnCitiesVisites: !prevState.coloredDepeningOnCitiesVisites
					};
				}
			 });
		}

		console.log(this.state.coloredDepeningOnCitiesVisites);
	}

	render() {
		let mapData = [];

		// if (!this.props.error) {
		// 	mapData = this.props.countriesBeen.map(country => [country.name, Number(country.numberOfSpots)]);
		// 	mapData.unshift(["Country", "Number of spots"]);
		// }

		if (!this.props.error) {
			mapData = this.props.countriesBeen.map(country => [country.name]);
			mapData.unshift(["Country"]);
		}

		// console.log(this.state.coloredDepeningOnCitiesVisites);

		return (
			<div className="Content">
				<h1>Countries I've been to</h1>
				<SelectItems />
				<SwitchWithLabel onChange={this.coloredMapHandler} />
				<Map
					data={mapData}
					region={
						this.props.region !== "all"
							? this.props.region
							: this.props.continent
					}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		countriesBeen: state.countriesBeen,
		continent: state.continent,
		region: state.region,
		error: state.error,
		isBackMocked: state.isBackMocked
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onInitCountries: isBackMocked =>
			dispatch(actions.initCountries(isBackMocked))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);
