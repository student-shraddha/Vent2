
import { useEffect, useState } from 'react'
import chroma from 'chroma-js';

import Select from 'react-select'
//  # https://react-select.com/home#custom-styles
function CustomMultiSelect({ label, options = [], onChange, defaultValue = [] }) {

    const colourStyles = {
        control: (styles) => ({
            ...styles,
            backgroundColor: 'white',
            '&:hover': {
                ...styles['&:hover'],
                borderColor: "#E9E9E9",
            },
            boxShadow: "none"
        })
        ,
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            const color = chroma('#9E7B74');
            return {
                ...styles,
                backgroundColor: isDisabled
                    ? undefined
                    : isSelected
                        ? '#9E7B74'
                        : isFocused
                            ? color.alpha(0.1).css()
                            : undefined,

                cursor: isDisabled ? 'not-allowed' : 'default',

                ':active': {
                    ...styles[':active'],
                    backgroundColor: !isDisabled
                        ? isSelected
                            ? data.color
                            : color.alpha(0.3).css()
                        : undefined,
                },
            };
        },
        multiValue: (styles, { data }) => {
            console.log("ddd", data)
            const color = chroma("#9E7B74");
            return {
                ...styles,
                backgroundColor: color.alpha(0.3).css(),
            };
        },
    }
    return (
        <div className="w-full">
            <label className="block tracking-[0.7px] mb-1 font-Nunito text-primary-baseGray text-base font-medium">
                {label}
            </label>
            <Select
                defaultValue={defaultValue && defaultValue.length && (options.filter((option) => defaultValue.includes(option.value))) || []}
                isMulti
                options={options}
                className=""
                classNamePrefix=""
                onChange={onChange}
                styles={colourStyles}
            />
        </div >
    )
}
export default CustomMultiSelect