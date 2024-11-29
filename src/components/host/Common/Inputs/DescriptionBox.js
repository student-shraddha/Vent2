import React from 'react'

function DescriptionBox({ label, value, setValue, name, disabled = false, helpText, placeholder, rows = 3 }) {
    return (
        <div className='flex flex-col w-full items-start'>
            {label && <p className='not-italic tracking-[0.7px] font-Nunito text-black font-semibold text-xl mb-0'>
                {label}
            </p>}
            {helpText && (
                <p className='not-italic  tracking-[0.7px] font-Nunito text-primary-baseGray text-base font-medium'>
                    {helpText}
                </p>
            )}
            <textarea style={{ resize: 'none', overflowY: 'auto' }} className='hidescrollbar text-sm appearance-none mt-[4px]  focus-visible:outline-none  font-Mulish w-full bg-[#F5F5F554] border-[1px] border-solid border-[#F0F0F0] p-2 focus:outline-none rounded align-top resize-none' type='text'
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

export default DescriptionBox