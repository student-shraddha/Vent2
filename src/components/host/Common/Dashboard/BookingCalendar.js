import Image from 'next/image';
import React, { useState } from 'react'

function BookingCalendar({ calendarData, bookings }) {
    return (

        <div className='pb-4 py-3'>
            <table className="w-full">

                {calendarData?.days && calendarData.days.length && (
                    <>
                        <tr key={`head-0`}>
                            <th className="p-2 border-0 h-10 xl:w-20 lg:w-20 md:w-20 sm:w-20 w-10 xl:text-sm text-xs"></th>
                            {calendarData.days.map((i, inx) =>
                                <th
                                    key={`head-0-${inx}`}
                                    className="p-2  h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs"
                                >
                                    <div className="font-Nunito text-[0.8rem]">{i.day_name}</div>
                                    <div className=''>{i.day}</div>
                                </th>
                            )}
                        </tr>
                        <tr key={`row-0`}>
                            <td className="border-0 h-10 xl:w-20 lg:w-20 md:w-20 sm:w-20 w-10 xl:text-sm text-xs text-end text-primary-mediumGrey"></td>
                            {calendarData.days.map((i, inx) => {

                                let date_str = `${i.date}`;
                                const booking_inx = bookings.findIndex((i) => i.booking_date === date_str);
                                return (
                                    <td
                                        key={inx}
                                        className="border min-h-10  xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs text-primary-mediumGrey"
                                    >
                                        {booking_inx !== -1 && (
                                            <div className='flex h-full '>
                                                <div className='bg-primary-baseRed rounded-l-lg w-1'>

                                                </div>
                                                <div className="bg-primary-lightRed p-1 w-full flex flex-col">
                                                    <div className="text-[9px] leading-3 text-primary-mediumRed font-medium">{"9:00 am"}</div>
                                                    <div className="flex items-center gap-1">
                                                        <div>
                                                            <Image src={bookings[booking_inx].image} width={20} height={20} alt={"user image"} />
                                                        </div>
                                                        <div className="text-[9px] leading-3 text-primary-mediumRed font-medium">{bookings[booking_inx].name}</div>
                                                    </div>
                                                </div>
                                            </div>


                                        )}

                                    </td>
                                )
                            }



                            )}
                        </tr>
                    </>
                )

                }


            </table>
        </div>
    )
}

export default BookingCalendar

