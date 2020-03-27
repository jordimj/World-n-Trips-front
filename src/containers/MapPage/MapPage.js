import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";

import Map from "../../components/Map/Map";
import "./MapPage.css";
import countryAndRegionsInfo from "../../utils/countryAndRegionsInfo";

class MapPage extends Component {
	state = {
		selectedPostId: null,
		continent: "000",
		region: "all"
	};

	componentDidMount() {
		if (this.props.countriesBeen.length === 0) {
			this.props.onInitCountries(this.props.isBackMocked);
		}
	}

	postSelectedHandler = id => {
		this.setState({
			selectedPostId: id
		});
	};

	continentSelectedHandler = event => {
		console.log(this.state);
		this.setState({
			continent: event.target.value,
			region: "all"
		});
	};

	regionSelectedHandler = event => {
		this.setState({
			region: event.target.value
		});
	};

	render() {
		let data = [];

		if (!this.props.error) {
			data = this.props.countriesBeen.map(country => [country.name]);
			data.unshift(["Country"]);
		}

		let continentSelectOptions = [];
		for (let continent in countryAndRegionsInfo) {
			continentSelectOptions.push(
				<option
					key={countryAndRegionsInfo[continent].name}
					value={countryAndRegionsInfo[continent].code}
				>
					{countryAndRegionsInfo[continent].name}
				</option>
			);
		}

		let regionSelectOptions = [];
		regionSelectOptions.push(
			<option key="all" value="all">
				All
			</option>
		);

		const continentCodes = {
			africa: "002",
			europe: "150",
			americas: "019", // [TODO] Check if there is a better map for America
			asia: "142",
			oceania: "009"
		};

		if (this.state.continent !== "000") {
			const key = Object.keys(continentCodes).filter(key => {
				return continentCodes[key] === this.state.continent;
			})[0];

			regionSelectOptions.push(
				countryAndRegionsInfo[key].regions.map(region => (
					<option key={region.name} value={region.code}>
						{region.name}
					</option>
				))
			);
		}

		return (
			<div className="Content">
				<h1>Countries I've been to</h1>
				<div className="Input">
					<label className="Label" for="continent">
						Continent to be shown:
					</label>
					<select
						id="continent"
						onChange={event => this.continentSelectedHandler(event)}
					>
						{continentSelectOptions}
					</select>
				</div>

				<div className="Input">
					<label className="Label" for="region">
						Region to be shown:
					</label>
					<select
						id="region"
						onChange={event => this.regionSelectedHandler(event)}
					>
						{regionSelectOptions}
					</select>
				</div>

				<Map
					data={data}
					region={
						this.state.region !== "all"
							? this.state.region
							: this.state.continent
					}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		countriesBeen: state.countriesBeen,
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
