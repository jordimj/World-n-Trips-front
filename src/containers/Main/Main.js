import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
// import axios from '../../axios';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import CountryBox from "../../components/CountryBox/CountryBox";
import FullPost from "../../components/FullPost/FullPost";
import Map from "../../components/Map/Map";
import "./Main.css";

class Main extends Component {
	state = {
		selectedPostId: null,
		continent: "all"
	};

	componentDidMount() {
		this.props.onInitCountries(this.props.isBackMocked);
	}

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

		let data = [];

		if (!this.props.error) {
			data = this.props.countriesBeen.map(country => [country.name]);
			data.unshift(["Country"]);
		}

		return (
			<div>
				<Toolbar />
				<label for="continent">Continent to be shown: </label>
				<select
					id="continent"
					onClick={event => this.continentSelectedHandler(event)}
				>
					<option value="all">All</option>
					<option value="europe">Europe</option>
					<option value="asia">Asia</option>
					<option value="africa">Africa</option>
					<option value="americas">America</option>
					<option value="oceania">Oceania</option>
				</select>
				<Map data={data} continent={this.state.continent} />
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

const mapDispatchToProps = dispatch => {
	return {
		onInitCountries: isBackMocked =>
			dispatch(actions.initCountries(isBackMocked))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
