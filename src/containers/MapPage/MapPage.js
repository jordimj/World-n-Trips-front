import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";

import Map from "../../components/Map/Map";
import "./MapPage.css";
import SelectItems from "../../components/Navigation/SelectItems/SelectItems";

class MapPage extends Component {
	componentDidMount() {
		if (this.props.countriesBeen.length === 0) {
			this.props.onInitCountries(this.props.isBackMocked);
		}
	}

	render() {
		let mapData = [];

		if (!this.props.error) {
			mapData = this.props.countriesBeen.map(country => [country.name]);
			mapData.unshift(["Country"]);
		}

		return (
			<div className="Content">
				<h1>Countries I've been to</h1>
				<SelectItems />
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
