import React from 'react'

function CloseSvg({ className, height = 16, width = 16 }) {
    return (

        <div style={{ height, width }} className='bg-transparent flex items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <g clipPath="url(#clip0_456_2010)">
                    <path d="M9.46585 8.01265L15.6959 1.78238C16.1014 1.37713 16.1014 0.721889 15.6959 0.316635C15.2907 -0.088618 14.6354 -0.088618 14.2302 0.316635L7.99991 6.54691L1.76983 0.316635C1.36438 -0.088618 0.709336 -0.088618 0.304082 0.316635C-0.101361 0.721889 -0.101361 1.37713 0.304082 1.78238L6.53417 8.01265L0.304082 14.2429C-0.101361 14.6482 -0.101361 15.3034 0.304082 15.7087C0.506045 15.9108 0.771595 16.0124 1.03696 16.0124C1.30232 16.0124 1.56768 15.9108 1.76983 15.7087L7.99991 9.4784L14.2302 15.7087C14.4323 15.9108 14.6977 16.0124 14.9631 16.0124C15.2284 16.0124 15.4938 15.9108 15.6959 15.7087C16.1014 15.3034 16.1014 14.6482 15.6959 14.2429L9.46585 8.01265Z" fill="#828282" className={className ? className : 'fill-black'} />
                </g>
                <defs>
                    <clipPath id="clip0_456_2010">
                        <rect width="16" height="16" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        </div>
    )
}

export default CloseSvg