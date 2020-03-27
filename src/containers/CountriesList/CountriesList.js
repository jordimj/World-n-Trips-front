import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";

import CountryBox from "../../components/CountryBox/CountryBox";
import FullPost from "../../components/FullPost/FullPost";
import "./CountriesList.css";

class CountriesList extends Component {
	componentDidMount() {
		if (this.props.countriesBeen.length === 0) {
			this.props.onInitCountries(this.props.isBackMocked);
		}
	}

	render() {
		let countriesBeen = (
			<p style={{ textAlign: "center" }}> Something went wrong! </p>
		);

		if (!this.props.error) {
			countriesBeen = this.props.countriesBeen.map(countryBeen => {
				return (
					<CountryBox
						key={countryBeen.id}
						name={countryBeen.name.toUpperCase()}
						code={countryBeen.alpha2code}
						clicked={() => this.postSelectedHandler(countryBeen.id)}
					/>
				);
			});
		}

		return (
			<div className="Content">
				<h1>List of countries I've been to</h1>
				<section className="Countries"> {countriesBeen} </section>
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

export default connect(mapStateToProps, mapDispatchToProps)(CountriesList);
