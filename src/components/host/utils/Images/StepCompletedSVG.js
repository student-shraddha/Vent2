import React from 'react'

function StepCompletedSVG({ height = '20px', width = '20px', className }) {
    return (
        <div style={{ height, width }} className={`bg-transparent ${className}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <g clipPath="url(#clip0_405_13250)">
                    <path d="M23.4423 3.9226C22.6997 3.17905 21.4939 3.17952 20.7504 3.9226L8.63486 16.0386L3.25003 10.6538C2.50647 9.91026 1.30119 9.91026 0.557634 10.6538C-0.185919 11.3974 -0.185919 12.6027 0.557634 13.3462L7.28838 20.077C7.65992 20.4485 8.14711 20.6347 8.63434 20.6347C9.12157 20.6347 9.60923 20.449 9.98077 20.077L23.4423 6.61495C24.1859 5.87191 24.1859 4.66611 23.4423 3.9226Z" fill="white" />
                </g>
                <defs>
                    <clipPath id="clip0_405_13250">
                        <rect width="24" height="24" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        </div >

    )
}
export default StepCompletedSVG