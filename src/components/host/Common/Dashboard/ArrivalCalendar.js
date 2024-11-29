import Image from 'next/image'
import React, { useState } from 'react'

function ArrivalCalendar({ calendarData, arrivals }) {

    // console.log("arrivals: ", arrivals)
    return (

        <div className='pb-4 py-3'>

            <table className="w-full">
                <thead>
                    {calendarData?.days && calendarData.days.length && (
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
                    )

                    }
                </thead>
                <tbody>
                    {calendarData?.time && calendarData.time.length && calendarData.time.map((j, jnx) =>
                        <tr key={`row-${jnx}`}>
                            <td className=" border-0 h-10 xl:w-20 lg:w-20 md:w-20 sm:w-20 w-10 xl:text-sm text-xs text-end text-primary-mediumGrey">{j.time}</td>
                            {calendarData.days.map((i, inx) => {

                                let date_str = `${i.date} ${j.time_str}`;
                                const arrival_inx = arrivals.findIndex((i) => i.arrival_time === date_str);

                                return (
                                    <td
                                        key={inx}
                                        className=" border h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs text-primary-mediumGrey"
                                    >
                                        {arrival_inx !== -1 && (
                                            <div className='flex h-full '>
                                                <div className='bg-primary-baseRed rounded-l-lg w-1'>

                                                </div>
                                                <div className="bg-primary-lightRed p-1 w-full flex flex-col">
                                                    <div className="text-[9px] leading-3 text-primary-mediumRed font-medium">{j.time_str}</div>
                                                    <div className="flex items-center gap-1">
                                                        <div>
                                                            <Image src={arrivals[arrival_inx].image} width={20} height={20} alt={"user image"} />
                                                        </div>
                                                        <div className="text-[9px] leading-3 text-primary-mediumRed font-medium">{arrivals[arrival_inx].name}</div>
                                                    </div>
                                                </div>
                                            </div>


                                        )}
                                    </td>
                                )
                            })}
                        </tr>
                    )}
                </tbody>

            </table>
        </div>
    )
}

export default ArrivalCalendar

