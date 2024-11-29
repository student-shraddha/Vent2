import React from 'react'

function CommonBox({ className, children }) {
    return (
        <div
            className={`shadow-[0_4px_4px_0px_rgba(162,154,154,0.25)] border-2 border-white border-solid rounded-lg bg-[rgba(255,255,255,0.25)] bg-opacity-5   py-4 px-3 ${className ? className : ""}`}
        >{children}</div>
    )
}

export default CommonBox