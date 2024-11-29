import React, { useEffect, useRef, useState } from 'react'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);



function DashboardStates({ data }) {


    const chartRef = useRef(null);

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');
        const myChart = new ChartJS(ctx, {
            type: 'line',
            data: data,
            options: {
                elements: {
                    line: {
                        tension: 0.4, // Adjust tension for the smoothness of the line
                    },
                },
                cubicInterpolationMode: 'monotone', // Use 'monotone' for smooth lines
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        fill: true,
                        labels: {
                            usePointStyle: true,
                        },
                    },
                },

                scales: {
                    x: {
                        grid: {
                            display: false,
                        },
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            borderDash: [30, 30], // Set borderDash for dotted horizontal grid lines
                        },
                    },
                },
            },
        });

        return () => {
            myChart.destroy();
        };
    }, [data]);

    return (
        <div className=' h-[300px]'>
            <canvas ref={chartRef} />
        </div>
    );
}

export default DashboardStates

