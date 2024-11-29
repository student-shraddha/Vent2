"use client";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import CloseSvg from "../../utils/Images/CloseSvg";


function Availability({ blockedDates, setBlockedDates }) {

    const [dates, setDates] = useState(blockedDates);

    const [currentMonth, setCurrentMonth] = useState(dayjs());

    const goToPreviousMonth = () => {
        setCurrentMonth(currentMonth.subtract(1, 'month'));
    };

    const goToNextMonth = () => {
        setCurrentMonth(currentMonth.add(1, 'month'));
    };

    // Calculate the number of days in the current month
    const daysInMonth = currentMonth.daysInMonth();

    // Calculate the weekday of the first day of the month
    const firstDayOfMonth = currentMonth.startOf('month').day();

    // Generate an array of empty cells to fill up the space before the first day
    const emptyCells = Array(firstDayOfMonth).fill(null);

    // Generate an array of days in the month
    const daysArray = [...Array(daysInMonth).keys()].map(index => {
        const day = index + 1
        const c_day = dayjs(`${currentMonth.format("YYYY-MM")}-${day}`);
        return {
            day: day,
            isCurrent: dayjs().isSame(c_day, 'day'),
            isSelected: [...dates].includes(c_day.format("YYYY-MM-DD"))
        }
    });

    // Generate an array of day names
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const onDaySelect = (day) => {
        let selected_date = dayjs(`${currentMonth.format("YYYY-MM")}-${day}`).format('YYYY-MM-DD');
        if (dates.includes(selected_date)) {
            const remainDates = [...dates];
            const inx = remainDates.findIndex((d) => d === selected_date);
            remainDates.splice(inx, 1);
            setDates(remainDates);
        } else {
            setDates([...dates, selected_date])
        }
    }

    const removeFromBlocked = (date) => {
        const remainDates = [...dates];
        const inx = remainDates.findIndex((d) => d === date);
        remainDates.splice(inx, 1);
        setDates(remainDates);
    }

    useEffect(() => {
        setBlockedDates(dates)
    }, [dates])

    return (
        <>
            <div className="w-full mx-auto mt-8 flex gap-3">
                <div className="w-2/3">
                    <h1 className="text-lg font-semibold mb-4">{currentMonth.format("MMMM YYYY")}</h1>
                    <div className="flex justify-between mb-4">
                        <button className="px-3 py-2 rounded bg-primary-baseRed text-white border-0" onClick={goToPreviousMonth}>
                            Previous Month
                        </button>
                        <button className="px-3 py-2 rounded bg-primary-baseRed text-white border-0" onClick={goToNextMonth}>
                            Next Month
                        </button>
                    </div>
                    <div className="grid grid-cols-7 gap-4">
                        {/* Render day names */}
                        {dayNames.map(day => (
                            <div key={`day-${day}`} className="p-2 border-1 border-solid border-primary-grayPlaceholder rounded-md text-center">{day}</div>
                        ))}
                        {/* Render empty cells */}
                        {emptyCells.map((_, index) => (
                            <div key={`empty-${index}`} className="p-2"></div>
                        ))}
                        {/* Render days of the month */}
                        {daysArray.map(({ day, isCurrent, isSelected }) => (
                            <div
                                key={day}
                                className={`p-2 border-1 border-solid rounded-md text-center cursor-pointer ${isSelected ? "bg-primary-borderGray/50 border-primary-borderGray" : isCurrent ? "bg-primary-baseRed/20 border-primary-baseRed" : "border-primary-grayPlaceholder"}`}
                                onClick={() => { onDaySelect(day) }}
                            >
                                {day}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-1/3 border p-3">

                    <div className="flex gap-3 items-center ">
                        <div className="bg-primary-borderGray/50 w-6 h-6"></div>
                        <div className="font-medium text-black">Blackout dates</div>
                    </div>

                    <div className="grid grid-cols-2 gap-1 mt-4 overflow-y-scroll max-h-75">
                        {dates.map((date) =>
                            <>
                                <div className="col-span-1">
                                    <div className="bg-primary-borderGray/50 border rounded border-solid border-primary-borderGray p-2 flex justify-between items-center">
                                        <div className="text-sm">{dayjs(date).format("MM/DD/YYYY")}</div>
                                        <div className="cursor-pointer" onClick={() => removeFromBlocked(date)}><CloseSvg width={12} height={12} /></div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>



        </>
    )
}

export default Availability;