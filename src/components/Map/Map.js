import React, { Component } from "react";
import { Chart } from "react-google-charts";

class Map extends Component {
	render() {
		// let data = [
		//   ["Country"],
		//   ["Germany"],
		//   // ["RU", 700]
		// ];

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
							}
						}
					]}
					chartType="GeoChart"
					width="100%"
					height="600px"
					data={data}
				/>
			</div>
		);
	}
}

export default Map;
