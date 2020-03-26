import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";

import Map from "../../components/Map/Map";
import "./MapPage.css";

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
		const regionsPerContinent = {
			all: {
				name: "All",
				code: "000"
			},
			europe: {
				name: "Europe",
				code: "150",
				regions: [
					{
						name: "Northern Europe",
						code: "154"
					},
					{
						name: "Western Europe",
						code: "155"
					},
					{
						name: "Eeastern Europe",
						code: "151"
					},
					{
						name: "Southern Europe",
						code: "039"
					}
				]
			},
			asia: {
				name: "Asia",
				code: "142",
				regions: [
					{
						name: "Central Asia",
						code: "143"
					},
					{
						name: "Eastern Asia",
						code: "030"
					},
					{
						name: "Southern Asia",
						code: "034"
					},
					{
						name: "South-Eastern Asia",
						code: "035"
					},
					{
						name: "Western Asia",
						code: "145"
					}
				]
			},
			africa: {
				name: "Africa",
				code: "002",
				regions: [
					{
						name: "Northern Africa",
						code: "015"
					},
					{
						name: "Western Africa",
						code: "011"
					},
					{
						name: "Middle Africa",
						code: "017"
					},
					{
						name: "Eeastern Africa",
						code: "014"
					},
					{
						name: "Southern Africa",
						code: "018"
					}
				]
			},
			americas: {
				name: "America",
				code: "019",
				regions: [
					{
						name: "Northern America",
						code: "021"
					},
					{
						name: "Caribbean",
						code: "029"
					},
					{
						name: "Central America",
						code: "013"
					},
					{
						name: "Southern America",
						code: "005"
					}
				]
			},
			oceania: {
				name: "Oceania",
				code: "019",
				regions: [
					{
						name: "Australia and New Zealand",
						code: "053"
					},
					{
						name: "Melanesia",
						code: "054"
					},
					{
						name: "Micronesia",
						code: "057"
					},
					{
						name: "Polynesia",
						code: "061"
					}
				]
			}
		};
		let data = [];

		if (!this.props.error) {
			data = this.props.countriesBeen.map(country => [country.name]);
			data.unshift(["Country"]);
		}

		let continentSelectOptions = [];
		for (let continent in regionsPerContinent) {
			continentSelectOptions.push(
				<option value={regionsPerContinent[continent].code}>
					{regionsPerContinent[continent].name}
				</option>
			);
		}
		// continentSelectOptions = regionsPerContinent.map(continent => (
		// 	<option value={continent.code}>{continent.name}</option>
		// ));

		let regionSelectOptions = null;
		let regions = regionsPerContinent[this.state.continent];

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

			regionSelectOptions = regionsPerContinent[key].regions.map(region => (
				<option value={region.code}>{region.name}</option>
			));
		}

		return (
			<div>
				<label for="continent">Continent to be shown: </label>
				<select
					id="continent"
					onChange={event => this.continentSelectedHandler(event)}
				>
					{continentSelectOptions}
				</select>

				<label for="region">Region to be shown: </label>
				<select
					id="region"
					onChange={event => this.regionSelectedHandler(event)}
				>
					{regionSelectOptions}
				</select>

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
