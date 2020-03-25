import React, { Component } from "react";
import { Chart } from "react-google-charts";

const continentCodes = {
	africa: "002",
	europe: "150",
	americas: "019", // [TODO] Check if there is a better map for America
	asia: "142",
	oceania: "009"
};

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
							}
						}
					]}
					chartType="GeoChart"
					width="100%"
					height="600px"
					data={data}
					options={{
						region: continentCodes[this.props.continent]
					}}
				/>
			</div>
		);
	}
}

export default Map;
