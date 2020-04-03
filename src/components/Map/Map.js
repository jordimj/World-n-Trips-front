import React, { Component } from "react";
import { Chart } from "react-google-charts";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class Map extends Component {
	
	render() {
		const data = this.props.data;
		let options = {};

		if (this.props.country) {
			options = {
				region: this.props.country ? this.props.country.info.alpha2code : "",
				resolution: 'provinces',
				// displayMode: 'text',
				colorAxis: {colors: ['green', 'blue']},
				sizeAxis: {minSize: 12, maxSize:20},
				enableRegionInteractivity: true   
			  };
		} else {
			options = {
				region: this.props.region !== "000" ? this.props.region : null,
				// colorAxis: { colors: ['green', 'blue'] },
			  };
		}

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
								this.props.history.push({pathname: `/country/${region}` });
							}
						}
					]}
					chartType="GeoChart"
					width="100%"
					height="600px"
					data={data}
					options={options}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		country: state.country,
	};
};

export default connect(mapStateToProps)(withRouter(Map));
