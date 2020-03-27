import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../../store/actions";
import countryAndRegionsInfo from "../../../utils/countryAndRegionsInfo";

class SelectItems extends Component {
	continentSelectedHandler = event =>
		this.props.onSelectContinent(event.target.value);

	regionSelectedHandler = event =>
		this.props.onSelectRegion(event.target.value);

	render() {
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

		let regionSelectOptions = [
			<option key="all" value="all">
				All
			</option>
		];

		const continentCodes = {
			africa: "002",
			europe: "150",
			americas: "019", // [TODO] Check if there is a better map for America
			asia: "142",
			oceania: "009"
		};

		if (this.props.continent !== "000") {
			const key = Object.keys(continentCodes).filter(key => {
				return continentCodes[key] === this.props.continent;
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
			<div>
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
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		continent: state.continent,
		region: state.region
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onSelectContinent: continent =>
			dispatch(actions.selectContinent(continent)),
		onSelectRegion: region => dispatch(actions.selectRegion(region))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectItems);
