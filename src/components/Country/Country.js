import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from '../../store/actions';

// import "./FullPost.css";

class Country extends Component {
	componentDidMount() {
		this.props.onGetCountryInfo(this.props.match.params.countryName, false);
	}

	render() {

		const country = null;

		//this.props.match.params.countryName
		return (
			<div className="Content">
				<h1>{this.props.match.params.countryName}'s information</h1>
				<section className="Countries"> {country} </section>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onGetCountryInfo: (countryCode, isBackMocked) =>
			dispatch(actions.getCountryInfo(countryCode, isBackMocked))
	};
};

export default connect(null, mapDispatchToProps)(Country);
