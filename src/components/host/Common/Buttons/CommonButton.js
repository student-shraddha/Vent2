import React from 'react'

function CommonButton({ onClick, className, type = "button", children, disabled }) {
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`cursor-pointer ${className ? className : 'bg-primary-baseRed'}`}
        >{children}</button>
    )
}

export default CommonButton