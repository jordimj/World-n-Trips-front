import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from '../../store/actions';
import Map from "../Map/Map";

// import "./FullPost.css";

class Country extends Component {
	componentDidMount() {
		this.props.onGetCountryInfo(this.props.match.params.countryName, false);
	}

	render() {
		const country = null;

		return (
			<div className="Content">
				<h1>{this.props.match.params.countryName}'s information</h1>
				<section className="Countries"> {country} </section>
				{this.props.country ? <Map data={[["Country"],[this.props.country.info.name]]} /> : null}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		country: state.country,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onGetCountryInfo: (countryCode, isBackMocked) =>
			dispatch(actions.getCountryInfo(countryCode, isBackMocked))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Country);
