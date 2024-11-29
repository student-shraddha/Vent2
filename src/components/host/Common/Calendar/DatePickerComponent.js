import React, { useState, useEffect } from "react";

import CommonDropDown from "@/components/host/Common/Dropdown/CommonDropDown";
const DatePickerComponent = ({ onDateSelectProp, initialTime, timeFormat, layoutClassName }) => {


    const Years = [];
    const HoursOfDay = [];
    const Today = new Date();
    const CurrentHour = Today.getHours();
    const CurrentYear = new Date().getFullYear();
    const [ErrorsInputFields, setInputFieldsErrors] = useState({});
    const [SelectedSchedule, setSelectedSchedule] = useState({
        schedule_type: "DAILY",
        schedule_data: [],
    });
    const [RangeStartDate, setRangeStartDate] = useState(null);
    const [RangeEndDate, setRangeEndDate] = useState(null);
    const Months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    for (let hour = 0; hour < 24; hour++) {
        if (hour < CurrentHour) {
            HoursOfDay.push({
                time: `${hour.toString().padStart(2, "0")}:00`,
                disabled: false,
            });
        }
    }
    // Adjust the loop range to cover the next 10 years
    for (let year = CurrentYear; year <= CurrentYear + 20; year++) {
        Years.push(year);
    }
    const CurrentDate = Today.getDate();
    const CurrentMonth = Today.getMonth() + 1;
    const [SelectedDate, setSelectedDate] = useState(null);
    const [SelectedEndTime, setSelectedEndTime] = useState(null);
    const [SelectedYear, setSelectedYear] = useState(CurrentYear);
    const [SelectedStartTime, setSelectedStartTime] = useState(null);
    const [SelectedMonth, setSelectedMonth] = useState(CurrentMonth);
    const GetDaysInMonth = (year, month) => {
        return new Date(year, month, 0).getDate();
    };
    const RenderCalendarDays = () => {
        const Days = [];
        const DaysInMonth = GetDaysInMonth(SelectedYear, SelectedMonth);
        const DayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const OneWeekFromNow = new Date();
        OneWeekFromNow.setDate(OneWeekFromNow.getDate() + 7);
        const OneMonthFromNow = new Date();
        OneMonthFromNow.setDate(OneMonthFromNow.getDate() + 30);
        for (let i = 0; i < 7; i++) {
            Days.push(
                <div
                    key={Math.random(69 * 69696) * 68}
                    className="text-center p-2 text-sm text-gray-500"
                >
                    {DayNames[i]}
                </div>
            );
        }
        for (let day = 1; day <= DaysInMonth; day++) {
            const IsPastDate =
                SelectedYear < CurrentYear ||
                (SelectedYear === CurrentYear && SelectedMonth < CurrentMonth) ||
                (SelectedYear === CurrentYear &&
                    SelectedMonth === CurrentMonth &&
                    day < CurrentDate);
            const isSelectedRange =
                RangeStartDate &&
                RangeEndDate &&
                new Date(SelectedYear, SelectedMonth - 1, day) >=
                new Date(RangeStartDate) &&
                new Date(SelectedYear, SelectedMonth - 1, day) <=
                new Date(RangeEndDate);
            const isStartDate =
                RangeStartDate === `${SelectedYear}-${SelectedMonth}-${day}`;
            const isEndDate =
                RangeEndDate === `${SelectedYear}-${SelectedMonth}-${day}`;
            Days.push(
                <div
                    key={day}
                    className={`text-center text-sm p-1  ${CurrentDate === day ? "border border-primary rounded" : ""
                        } ${SelectedDate?.selectedDay === day || isSelectedRange
                            ? "bg-primary text-white rounded"
                            : IsPastDate
                                ? "cursor-not-allowed text-gray-400 "
                                : "cursor-pointer hover:border-primary hover:border rounded"
                        } ${isStartDate && !isSelectedRange
                            ? "bg-primary text-white rounded"
                            : ""
                        } ${isEndDate && !isSelectedRange ? "bg-primary text-white rounded" : ""
                        }`}
                    onClick={() => OnDateClick(day)}
                >
                    {day}
                </div>
            );
        }
        return Days;
    };
    const OnDateClick = (day) => {
        const TodayDay = Today.getDay();
        if (TodayDay !== day) {
            setSelectedStartTime(null);
            setSelectedEndTime(null);
        }
        const IsPastDate =
            SelectedYear < CurrentYear ||
            (SelectedYear === CurrentYear && SelectedMonth < CurrentMonth) ||
            (SelectedYear === CurrentYear &&
                SelectedMonth === CurrentMonth &&
                day < CurrentDate);
        const IsRangeStartDate = RangeStartDate !== null && RangeEndDate === null;
        const IsRangeEndDate = RangeStartDate !== null && RangeEndDate !== null;
        if (!IsPastDate) {
            if (IsRangeStartDate) {
                // Set the end date if it's after the start date
                if (
                    new Date(SelectedYear, SelectedMonth - 1, day) >=
                    new Date(RangeStartDate)
                ) {
                    setRangeEndDate(`${SelectedYear}-${SelectedMonth}-${day}`);
                }
            } else if (IsRangeEndDate) {
                // Reset the range if clicking on a new date
                setRangeStartDate(null);
                setRangeEndDate(null);
                setSelectedDate({
                    selectedYear: SelectedYear,
                    selectedMonth: SelectedMonth,
                    selectedDay: day,
                });
            } else {
                // Set the start date
                setRangeStartDate(`${SelectedYear}-${SelectedMonth}-${day}`);
                setRangeEndDate(null);
            }
        }
    };
    const OnDateSelect = (Data) => {
        if (typeof Data === "number") {
            setSelectedYear(Data);
        } else if (typeof Data === "string") {
            var months = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
            ];
            var monthIndex = months.indexOf(Data);
            if (monthIndex !== -1) {
                setSelectedMonth(parseInt(monthIndex + 1));
            }
        }
    };
    const InputValidation = () => {
        const newErrors = {};
        if (!RangeStartDate || !RangeEndDate) {
            newErrors.scheduleDate = "Date is required";
        }
        if (!SelectedStartTime) {
            newErrors.startTime = "Start time is required";
        }
        if (!SelectedEndTime) {
            newErrors.endTime = "End time is required";
        }
        setInputFieldsErrors(newErrors);
        return Object.keys(newErrors).length === 0;
        // return true;
    };
    useEffect(() => {
        if (SelectedStartTime && SelectedEndTime) {
            if (SelectedStartTime > SelectedEndTime) {
                setAlertDetails({
                    isOpen: true,
                    message: "The end time must be after the start time.",
                    duration: 3000,
                    position: "top",
                    type: "danger",
                });
                return;
            }
            const OnClickAddSlots = () => {
                if (InputValidation()) {
                    const IsDuplicateSlot = SelectedSchedule.schedule_data.some(
                        (slot) =>
                            slot.date ===
                            `${SelectedDate?.selectedYear}-${SelectedDate?.selectedMonth}-${SelectedDate?.selectedDay}` &&
                            slot.start_time === SelectedStartTime &&
                            slot.end_time === SelectedEndTime
                    );
                    if (IsDuplicateSlot) {
                        setAlertDetails({
                            isOpen: true,
                            message: "Cannot add the same time slot for the same day.",
                            duration: 3000,
                            position: "top",
                            type: "danger",
                        });
                    } else {
                        // If not a duplicate, add the new slot for each selected date in the range
                        const startDate = new Date(RangeStartDate);
                        const endDate = new Date(RangeEndDate);
                        const newSlots = [];
                        for (
                            let currentDate = startDate;
                            currentDate <= endDate;
                            currentDate.setDate(currentDate.getDate() + 1)
                        ) {
                            const formattedDate = currentDate.toISOString().split("T")[0];
                            const newSlot = {
                                date: formattedDate,
                                start_time: SelectedStartTime,
                                end_time: SelectedEndTime,
                            };
                            newSlots.push(newSlot);
                        }
                        setSelectedSchedule((prevSchedule) => ({
                            ...prevSchedule,
                            schedule_type: "DAILY",
                            schedule_data: [...prevSchedule.schedule_data, ...newSlots],
                        }));
                        setAlertDetails({
                            isOpen: true,
                            message: "Slots added successfully.",
                            duration: 3000,
                            position: "top",
                            type: "success",
                        });
                    }
                } else {
                    // ACTION IF THERE ARE ERROR form data
                }
            };
            OnClickAddSlots();
        }
        return () => { };
    }, [SelectedStartTime, SelectedEndTime]);
    return (
        <>


            <div className="grid grid-cols-1">
                <div className="max-md:mb-10">
                    <div className={`rounded-lg bg-white ${layoutClassName} `}>
                        <div className="mb-4">
                            {RangeStartDate && RangeEndDate ? (
                                <p className="border rounded text-sm shadow-sm p-2 px-3">
                                    {`Selected Date Range: ${RangeStartDate} To ${RangeEndDate}`}
                                </p>
                            ) : (
                                ""
                            )}
                        </div>
                        {/* CALENDAR  */}
                        <div className="transition-all duration-300">
                            <div className="flex justify-center flex-wrap space-x-2 mb-4">
                                <div className="max-xs:mb-2">
                                    <CommonDropDown
                                        options={Years}
                                        initial_value={CurrentYear}
                                        onChangeDate={OnDateSelect}
                                        drop_down_width="126px"
                                        drop_down_height="100px"
                                    />
                                </div>
                                <div>
                                    <CommonDropDown
                                        options={Months}
                                        initial_value={Intl.DateTimeFormat("en", {
                                            month: "long",
                                        }).format(new Date(SelectedMonth.toString()))}
                                        onChangeDate={OnDateSelect}
                                        drop_down_width="150px"
                                        drop_down_height="100px"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-7 gap-2">
                                {RenderCalendarDays()}
                            </div>
                        </div>
                    </div>
                    {ErrorsInputFields.scheduleDate && (
                        <p className="text-red-500 my-1 text-sm">
                            {ErrorsInputFields.scheduleDate}
                        </p>
                    )}
                </div>
                <div>
                    {ErrorsInputFields.startTime && (
                        <p className="text-red-500 my-1 text-sm">
                            {ErrorsInputFields.startTime}
                        </p>
                    )}
                    {ErrorsInputFields.endTime && (
                        <p className="text-red-500 my-1 text-sm">
                            {ErrorsInputFields.endTime}
                        </p>
                    )}
                </div>
            </div>
        </>
    );
};
export default DatePickerComponent;

