import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
// import axios from '../../axios';

import CountryBox from '../../components/CountryBox/CountryBox';
import FullPost from '../../components/FullPost/FullPost';
import Map from '../../components/Map/Map';
import './Main.css';

class Main extends Component {
    state = {
        selectedPostId: null
    }

    componentDidMount() {
        this.props.onInitCountries();
    }

    postSelectedHandler = (id) => {
        this.setState({
            selectedPostId: id
        });
    }

    render() {
        let countriesBeen = <p style={{ textAlign: "center" }}> Something went wrong! </p>;

        if (!this.props.error) {
            countriesBeen = this.props.countriesBeen.map(countryBeen => {
                return <CountryBox
                    key = { countryBeen.id }
                    name = { countryBeen.name.toUpperCase() }
                    code = { countryBeen.alpha2code }
                    clicked = { () => this.postSelectedHandler(countryBeen.id) }
                    />;
            });
        }

        let data = [];

        if (!this.props.error) {
            data = this.props.countriesBeen.map( country => [country.name] );
            data.unshift(["Country"]);
        }

        return (<div>
                    < Map data = { data } />
                    <section className="Countries" > {countriesBeen} </section>
                    <section><FullPost id = {this.state.selectedPostId}/></section>
                </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        countriesBeen: state.countriesBeen,
        error: state.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onInitCountries: () => dispatch(actions.initCountries())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);