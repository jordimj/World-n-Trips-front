import React, { Component } from "react";
import { Chart } from "react-google-charts";
import { connect } from "react-redux";
import * as actions from "../../store/actions";

class Map extends Component {
	render() {
		let data = this.props.data;

		return (
			<div>
				<Chart
					chartEvents={[
						{
							eventName: "select",
							callback: ({ chartWrapper }) => {
								const chart = chartWrapper.getChart();
								const selection = chart.getSelection();
								if (selection.length === 0) return;
								const region = data[selection[0].row + 1];
								console.log("Selected : " + region);
								this.props.onGetCountryInfo(region, false);
							}
						}
					]}
					chartType="GeoChart"
					width="100%"
					height="600px"
					data={data}
					options={{
						region: this.props.region !== "000" ? this.props.region : null
					}}
				/>
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

export default connect(null, mapDispatchToProps)(Map);
