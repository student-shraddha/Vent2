import React from 'react'

function Step4SVG({ height = '20px', width = '20px', className, fill }) {
    return (
        <div style={{ height, width }} className={`bg-transparent ${className}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                <g clipPath="url(#clip0_405_12955)">
                    <path d="M21.8163 29.9999C21.6063 29.9999 21.3913 29.9737 21.1788 29.9174L1.85002 24.7412C0.525019 24.3762 -0.264981 23.0037 0.082519 21.6787L2.52127 12.5887C2.61127 12.2549 2.95377 12.0612 3.28627 12.1462C3.62002 12.2349 3.81752 12.5787 3.72877 12.9112L1.29127 21.9987C1.11752 22.6612 1.51502 23.3512 2.17877 23.5349L21.5 28.7087C22.1638 28.8837 22.8488 28.4887 23.0213 27.8287L23.9975 24.2112C24.0875 23.8774 24.43 23.6787 24.7638 23.7699C25.0975 23.8599 25.2938 24.2037 25.205 24.5362L24.23 28.1487C23.9363 29.2612 22.9238 29.9999 21.8163 29.9999Z" fill="#828282" className={fill} />
                    <path d="M27.5 22.5H7.5C6.12125 22.5 5 21.3787 5 20V5C5 3.62125 6.12125 2.5 7.5 2.5H27.5C28.8787 2.5 30 3.62125 30 5V20C30 21.3787 28.8787 22.5 27.5 22.5ZM7.5 3.75C6.81125 3.75 6.25 4.31125 6.25 5V20C6.25 20.6887 6.81125 21.25 7.5 21.25H27.5C28.1887 21.25 28.75 20.6887 28.75 20V5C28.75 4.31125 28.1887 3.75 27.5 3.75H7.5Z" fill="#828282" className={fill} />
                    <path d="M11.25 11.25C9.87125 11.25 8.75 10.1288 8.75 8.75C8.75 7.37125 9.87125 6.25 11.25 6.25C12.6288 6.25 13.75 7.37125 13.75 8.75C13.75 10.1288 12.6288 11.25 11.25 11.25ZM11.25 7.5C10.5612 7.5 10 8.06125 10 8.75C10 9.43875 10.5612 10 11.25 10C11.9388 10 12.5 9.43875 12.5 8.75C12.5 8.06125 11.9388 7.5 11.25 7.5Z" fill="#828282" className={fill} />
                    <path d="M5.71247 21.1625C5.55247 21.1625 5.39247 21.1013 5.26997 20.98C5.02622 20.7362 5.02622 20.34 5.26997 20.0962L11.1737 14.1925C11.8812 13.485 13.1175 13.485 13.825 14.1925L15.5825 15.95L20.4475 10.1125C20.8012 9.68875 21.3212 9.4425 21.875 9.4375H21.8887C22.4362 9.4375 22.955 9.675 23.3125 10.0912L29.85 17.7188C30.075 17.98 30.045 18.375 29.7825 18.6C29.5212 18.825 29.1275 18.7963 28.9012 18.5325L22.3637 10.905C22.2425 10.765 22.075 10.6875 21.8887 10.6875C21.7587 10.6762 21.53 10.7662 21.4087 10.9125L16.105 17.2762C15.9925 17.4113 15.8287 17.4925 15.6525 17.5C15.475 17.5125 15.3062 17.4425 15.1825 17.3175L12.9412 15.0762C12.705 14.8412 12.2937 14.8412 12.0575 15.0762L6.15372 20.98C6.03247 21.1013 5.87247 21.1625 5.71247 21.1625Z" fill="#828282" className={fill} />
                </g>
                <defs>
                    <clipPath id="clip0_405_12955">
                        <rect width="30" height="30" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        </div >

    )
}
export default Step4SVG