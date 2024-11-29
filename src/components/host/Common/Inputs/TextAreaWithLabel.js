import React from 'react'

function TextAreaWithLabel({ label, value, setValue, name, disabled = false, helpText, placeholder, rows = 3 }) {
    return (
        <div className='flex flex-col w-full items-start'>
            {label && <p className='font-Nunito text-primary-baseGray text-base mb-[4px] font-medium'>
                {label}
            </p>}
            <textarea style={{ resize: 'none', overflowY: 'auto' }} className='text-sm appearance-none  border border-[#E9E9E9] rounded-md w-full  focus-visible:outline-none p-2 font-Mulish placeholder:text-primary-grayPlaceholder text-primary-textGrey placeholder:text-sm ' type='text'
                value={value}
                onChange={setValue}
                name={name}
                disabled={disabled ? true : false}
                placeholder={placeholder}
                rows={rows}
            />
        </div>
    )
}

export default TextAreaWithLabel