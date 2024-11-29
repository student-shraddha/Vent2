import React, { useState } from 'react'
import CommonButton from '../Buttons/CommonButton'
import CalenderSVG from '../../utils/Images/CalendarSVG'
import ArrivalCalendar from './ArrivalCalendar';
import BookingCalendar from './BookingCalendar';

function DashboardCalendar({ calendarData, arrivals, bookings }) {


    const [calenderType, setCalenderType] = useState("arrivals");
    // console.log("calenderType", calenderType)
    return (

        <div className="pt-4">
            <div className="rounded-lg shadow-[0_4px_4px_0px_rgba(162,154,154,0.25)]">
                <div className='flex justify-between items-center px-5 py-4'>
                    <div className="">
                        <div className="flex gap-2">
                            <CommonButton
                                className={`font-Nunito text-sm font-bold px-4 py-3.5  w-full cursor-pointer rounded-lg border transition ${calenderType === "arrivals" ? "bg-primary-baseRed text-white" : "bg-custom-gradient-1 text-black"}`}
                                onClick={() => { setCalenderType('arrivals') }}
                            >
                                Arrivals
                            </CommonButton>
                            <CommonButton
                                className={`font-Nunit text-sm font-bold px-4 py-3.5  w-full cursor-pointer rounded-lg border transition ${calenderType === "bookings" ? "bg-primary-baseRed text-white" : "bg-custom-gradient-1 text-black"}`}
                                onClick={() => { setCalenderType('bookings') }}
                            >Bookings
                            </CommonButton>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div>
                            <CalenderSVG />
                        </div>
                        <div className="font-Nunito text-sm font-semibold text-primary-baseRed">Select Week</div>
                    </div>
                </div>
                <div>
                    {calenderType === "arrivals" ?
                        <ArrivalCalendar calendarData={calendarData} arrivals={arrivals} />
                        :
                        calenderType === "bookings" ?
                            <BookingCalendar calendarData={calendarData} bookings={bookings} />
                            :
                            ""
                    }
                </div>

            </div>
        </div>
    )
}

export default DashboardCalendar

