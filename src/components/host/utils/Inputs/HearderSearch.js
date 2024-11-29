import React from 'react'
// import SearchSvg from '../Images and Svgs/SearchSvg'

function HearderSearch({ name, value, onChange, placeholder }) {
    return (
        <div className='flex items-center bg-primary-graybuttonhighlighter  rounded-md m-2 w-[40%] max-w-[300px] px-2 py-1 font-Mulish'>
            <input name={name} value={value} onChange={onChange} className='appearance-none rounded-md focus-visible:none focus:outline-none pl-1 w-full bg-primary-graybuttonhighlighter placeholder:text-primary-grayPlaceholder text-black  text-base placeholder:text-[13px] not-italic font-normal ml-2' placeholder={placeholder} />
            {/* <SearchSvg /> */}
        </div>
    )
}

export default HearderSearch