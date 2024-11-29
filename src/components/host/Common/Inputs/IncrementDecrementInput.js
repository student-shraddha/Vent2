import React, { useEffect, useState } from 'react';
const IncrementDecrementInput = ({ handleCounter, name, type = 'number', step = 1, defaultValue = 0, label }) => {

    const [count, setCount] = useState(defaultValue);

    const increment = () => {
        if (type === "time") {
            const [hour, mins] = count.split(":");

            let newMinute = parseInt(mins) + step;
            let newHour = parseInt(hour);
            if (newMinute === 60) {
                newMinute = "00";
                newHour = parseInt(hour) + 1;
            }
            if (newHour === 24) {
                newHour = "00";
                newMinute = "00";
            }
            setCount(`${newHour}:${newMinute}`);
            return;
        }
        setCount(count + step);
    };

    const decrement = () => {

        if (type === "time") {
            const [hour, mins] = count.split(":");

            let newMinute = parseInt(mins) - step;
            let newHour = parseInt(hour);
            if (parseInt(mins) === 0) {
                newMinute = step;
                newHour = parseInt(hour) - 1;
            }
            if (parseInt(newMinute) === 0) {
                newMinute = "00";
            }
            if (parseInt(hour) === 0) {
                newHour = "23";
                newMinute = step;
            }
            setCount(`${newHour}:${newMinute}`);
            return;
        }
        if (count > 0) {
            setCount(count - step);
        }
    };

    useEffect(() => {
        handleCounter(name, count);
    }, [count])

    return (
        <div>
            {label && <p className='font-Nunito text-primary-baseGray text-base mb-[4px] font-medium'>
                {label}
            </p>
            }
            <div className="flex items-center  text-primary-baseGray text-sm mt-2">
                <button
                    onClick={decrement}
                    className="flex items-center justify-center bg-primary-baseRed text-white border-1 border-solid border-[#E4E4E4] rounded-l-lg w-11 h-10 text-center">-
                </button>
                <input
                    type="text"
                    value={count}
                    onChange={(e) => setCount(parseInt(e.target.value) || 0)}
                    className="flex items-center justify-center border-1 outline-none border-solid border-[#E4E4E4] w-16 h-10 text-center"
                />
                <button
                    onClick={increment}
                    className="flex items-center justify-center bg-primary-baseRed text-white border-1 border-solid border-[#E4E4E4] rounded-r-lg w-11 h-10 text-center"
                >+
                </button>
            </div>
        </div>

    )
};

export default IncrementDecrementInput;