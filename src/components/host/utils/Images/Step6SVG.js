import React from 'react'

function Step6SVG({ height = '20px', width = '20px', className, fill }) {
    return (
        <div style={{ height, width }} className={`bg-transparent ${className}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                <g clipPath="url(#clip0_405_12977)">
                    <mask id="mask0_405_12977" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="0" y="0" width="30" height="30">
                        <path d="M30 0H0V30H30V0Z" fill="white" />
                    </mask>
                    <g mask="url(#mask0_405_12977)">
                        <mask id="mask1_405_12977" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="0" y="0" width="30" height="30">
                            <path d="M0 1.90735e-06H30V30H0V1.90735e-06Z" fill="white" />
                        </mask>
                        <g mask="url(#mask1_405_12977)">
                            <path fillRule="evenodd" clipRule="evenodd" d="M0 25.3125C0 27.9013 2.09867 30 4.6875 30H16.4648C19.0537 30 21.1523 27.9013 21.1523 25.3125V22.9688C21.1523 22.3215 20.6277 21.7969 19.9805 21.7969C19.3333 21.7969 18.8086 22.3215 18.8086 22.9688V25.3125C18.8086 26.6069 17.7593 27.6563 16.4648 27.6563H4.6875C3.39309 27.6563 2.34375 26.6069 2.34375 25.3125V4.6875C2.34375 3.39309 3.39309 2.34375 4.6875 2.34375H16.4648C17.7593 2.34375 18.8086 3.39309 18.8086 4.6875V7.03125C18.8086 7.67846 19.3333 8.20313 19.9805 8.20313C20.6277 8.20313 21.1523 7.67846 21.1523 7.03125V4.6875C21.1523 2.09867 19.0537 1.90735e-06 16.4648 1.90735e-06H4.6875C2.09867 1.90735e-06 0 2.09867 0 4.6875V25.3125Z" fill="#828282" className={fill} />
                            <path fillRule="evenodd" clipRule="evenodd" d="M11.4844 15.0586C11.4844 15.7058 12.009 16.2305 12.6562 16.2305H28.5352C29.1824 16.2305 29.707 15.7058 29.707 15.0586C29.707 14.4114 29.1824 13.8867 28.5352 13.8867H12.6562C12.009 13.8867 11.4844 14.4114 11.4844 15.0586Z" fill="#828282" className={fill} />
                            <path fillRule="evenodd" clipRule="evenodd" d="M24.8605 19.7544C25.3181 20.2121 26.0601 20.2121 26.5177 19.7544L29.1419 17.1302C29.1419 17.1302 29.1419 17.1302 29.1419 17.1302C30.286 15.9861 30.286 14.1311 29.1419 12.987C29.1419 12.987 29.1419 12.987 29.1419 12.987L26.5177 10.3628C26.0601 9.90512 25.3181 9.90512 24.8605 10.3628C24.4028 10.8204 24.4028 11.5624 24.8604 12.02L27.4846 14.6443C27.7135 14.8731 27.7135 15.2441 27.4846 15.4729L24.8604 18.0972C24.4028 18.5548 24.4028 19.2968 24.8605 19.7544Z" fill="#828282" className={fill} />
                        </g>
                    </g>
                </g>
                <defs>
                    <clipPath id="clip0_405_12977">
                        <rect width="30" height="30" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        </div >

    )
}
export default Step6SVG