import React, { useRef, useEffect } from 'react';
import Chart from "chart.js";

export default function HitchhikesChart(props) {
    const { data, chartKind } = props;
    const chartRef = useRef();
    const finalData = Object.values(data);

    const titles = {
        CARS: "Number of cars hitched per hour",
        KILOMETERS: "Kilometers hitched per hour",
        MINUTES: "Minutes waiting on the road per hour",
    };

    useEffect(() => {
        const myChartRef = chartRef.current;
        const lineChart = new Chart(myChartRef, {
            type: "line",
            data: {
                labels: ['12AM', '1AM', '2AM', '3AM', '4AM', '5AM', '6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM', '11PM'],
                datasets: [{
                    data: finalData,
                    backgroundColor: [
                        'rgba(255,0,0, 0.5)',
                    ],
                }],
            },
            options: {
                aspectRatio: 4.5,
                legend: {
                    display: false,
                },
                title: {
                    display: true,
                    text: titles[chartKind],
                    padding: 30
                }
            },
        });

        return () => lineChart.destroy();
    }, [data]);

    return <canvas ref={chartRef} />;

}