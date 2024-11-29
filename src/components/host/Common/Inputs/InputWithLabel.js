import React from 'react'

function InputWithLabel({ value = '', label, placeholder, setValue, name, disable = false }) {
    return (
        <div className='flex flex-col w-full h-fit items-start'>
            {label && <p className='font-Nunito text-primary-baseGray text-base mb-[4px] font-medium'>
                {label}
            </p>
            }
            <input className='text-sm appearance-none  border border-[#E9E9E9] rounded-md w-full h-[40px] focus-visible:outline-none p-2 font-Mulish placeholder:text-primary-grayPlaceholder text-primary-textGrey placeholder:text-sm  '
                type='text'
                placeholder={placeholder}
                value={value}
                onChange={setValue}
                name={name}
                disabled={disable ? true : false}
            />
        </div>
    )
}

export default InputWithLabel