import React, { Component } from "react";
import { connect } from "react-redux";

import CountryBox from "../../components/CountryBox/CountryBox";
import FullPost from "../../components/FullPost/FullPost";
import "./CountriesList.css";

class CountriesList extends Component {
	state = {
		selectedPostId: null,
		continent: "all"
	};

	// componentDidMount() {
	// 	if (this.props.countriesBeen.length === 0) {
	// 		this.props.onInitCountries(this.props.isBackMocked);
	// 	}
	// }

	postSelectedHandler = id => {
		this.setState({
			selectedPostId: id
		});
	};

	continentSelectedHandler = event => {
		this.setState({
			continent: event.target.value
		});
	};

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
				<section>
					<FullPost id={this.state.selectedPostId} />
				</section>
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

export default connect(mapStateToProps)(CountriesList);
