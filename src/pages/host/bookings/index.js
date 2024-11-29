import Breadcrumb from "@/components/host/Common/Breadcrumb";
import CommonButton from "@/components/host/Common/Buttons/CommonButton";
import Pagination from "@/components/host/Common/Pagination";
import CalendarSVG from "@/components/host/utils/Images/CalendarSVG";
import SearchSvg from "@/components/host/utils/Images/SearchSvg";
import React, { useEffect, useState } from "react";

const HostBookings = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [bookings, setBookings] = useState([]);
    const [allBookings, setAllBookings] = useState([
        { id: 1, property_name: "Property Name", guest_name: "Alex David", location: "New York", date: "12/23/2024", nights: "04", check_in: "08:00 PM", total_price: "$50" },
        { id: 2, property_name: "Property Name", guest_name: "Alex David", location: "New York", date: "12/23/2024", nights: "04", check_in: "08:00 PM", total_price: "$50" },
        { id: 3, property_name: "Property Name", guest_name: "Alex David", location: "New York", date: "12/23/2024", nights: "04", check_in: "08:00 PM", total_price: "$50" },
        { id: 4, property_name: "Property Name", guest_name: "Alex David", location: "New York", date: "12/23/2024", nights: "04", check_in: "08:00 PM", total_price: "$50" },
        { id: 5, property_name: "Property Name", guest_name: "Alex David", location: "New York", date: "12/23/2024", nights: "04", check_in: "08:00 PM", total_price: "$50" },
        { id: 6, property_name: "Property Name", guest_name: "Alex David", location: "New York", date: "12/23/2024", nights: "04", check_in: "08:00 PM", total_price: "$50" },
        { id: 7, property_name: "Property Name", guest_name: "Alex David", location: "New York", date: "12/23/2024", nights: "04", check_in: "08:00 PM", total_price: "$50" },
        { id: 8, property_name: "Property Name", guest_name: "Alex David", location: "New York", date: "12/23/2024", nights: "04", check_in: "08:00 PM", total_price: "$50" },
        { id: 9, property_name: "Property Name", guest_name: "Alex David", location: "New York", date: "12/23/2024", nights: "04", check_in: "08:00 PM", total_price: "$50" },
        { id: 10, property_name: "Property Name", guest_name: "Alex David", location: "New York", date: "12/23/2024", nights: "04", check_in: "08:00 PM", total_price: "$50" },
        { id: 11, property_name: "Property Name", guest_name: "Alex David", location: "New York", date: "12/23/2024", nights: "04", check_in: "08:00 PM", total_price: "$50" },
        { id: 12, property_name: "Property Name", guest_name: "Alex David", location: "New York", date: "12/23/2024", nights: "04", check_in: "08:00 PM", total_price: "$50" },
        { id: 13, property_name: "Property Name", guest_name: "Alex David", location: "New York", date: "12/23/2024", nights: "04", check_in: "08:00 PM", total_price: "$50" },
        { id: 14, property_name: "Property Name", guest_name: "Alex David", location: "New York", date: "12/23/2024", nights: "04", check_in: "08:00 PM", total_price: "$50" },
        { id: 15, property_name: "Property Name", guest_name: "Alex David", location: "New York", date: "12/23/2024", nights: "04", check_in: "08:00 PM", total_price: "$50" },
    ]);

    const pageSize = 4;
    const onPageChange = (page) => {
        setCurrentPage(page);
    };


    useEffect(() => {
        setBookings([...allBookings].splice((currentPage - 1) * pageSize, pageSize));
    }, [currentPage, allBookings])

    return (
        <div>
            <Breadcrumb title={"Search Bookings"} subtitle={"Search, view and edit all your bookings."} />

            <div className="w-full pt-4 grid grid-cols-2 items-center px-3">
                <div>
                    <div className="flex items-center gap-4">
                        <div className="min-w-80 flex items-center justify-between px-4 py-3.5 border-2 rounded border-solid border-[#D7D7D7] shadow-[0_4px_4px_0px_rgba(206,206,206,0.25)]">
                            <div className="font-Nunito text-[#8A8A8A] text-sm font-medium">Check-In</div>
                            <div><svg xmlns="http://www.w3.org/2000/svg" width="17" height="10" viewBox="0 0 17 10" fill="none">
                                <path d="M0.390747 2.89294H16.0661" stroke="#8A8A8A" strokeWidth="0.757174" />
                                <line x1="0.661103" y1="2.81774" x2="2.85164" y2="0.726192" stroke="#8A8A8A" strokeWidth="0.757174" />
                                <path d="M16.0659 7.43604H0.390529" stroke="#8A8A8A" strokeWidth="0.757174" />
                                <line x1="15.7956" y1="7.51118" x2="13.605" y2="9.60273" stroke="#8A8A8A" strokeWidth="0.757174" />
                            </svg></div>
                            <div className="font-Nunito text-[#8A8A8A] text-sm font-medium">Check-Out</div>
                            <div><CalendarSVG /></div>
                        </div>
                        <CommonButton className={`bg-primary-baseRed font-Nunito border-2 border-solid border-primary-baseRed text-white text-sm font-bold px-4 py-3.5 cursor-pointer rounded-lg  transition`}>Apply</CommonButton>
                    </div>
                </div>
                <div className="flex items-center gap-4 justify-end">
                    <div className='flex items-center bg-white w-[40%] max-w-[400px] px-2 py-3.5 font-Nunito border-2 rounded border-solid border-[#D7D7D7]'>
                        <input className='appearance-none rounded-md focus-visible:none focus:outline-none pl-1 w-full bg-white placeholder:text-primary-grayPlaceholder text-black border-0 text-base placeholder:text-[13px] not-italic font-normal ml-2 ' placeholder={"Search Booking"} />
                        <SearchSvg />
                    </div>
                    <CommonButton className={`bg-primary-baseRed font-Nunito border-2 border-solid border-primary-baseRed text-white text-sm font-bold px-4 py-3.5 cursor-pointer rounded-lg  transition`}>
                        <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
                                <g clipPath="url(#clip0_405_20477)">
                                    <path d="M7 0.302734C6.69058 0.302734 6.39383 0.425651 6.17504 0.644443C5.95625 0.863236 5.83333 1.15998 5.83333 1.4694V6.13607H1.16667C0.857247 6.13607 0.560501 6.25898 0.341709 6.47778C0.122917 6.69657 0 6.99331 0 7.30273C0 7.61215 0.122917 7.9089 0.341709 8.12769C0.560501 8.34648 0.857247 8.4694 1.16667 8.4694H5.83333V13.1361C5.83333 13.4455 5.95625 13.7422 6.17504 13.961C6.39383 14.1798 6.69058 14.3027 7 14.3027C7.30942 14.3027 7.60616 14.1798 7.82496 13.961C8.04375 13.7422 8.16667 13.4455 8.16667 13.1361V8.4694H12.8333C13.1428 8.4694 13.4395 8.34648 13.6583 8.12769C13.8771 7.9089 14 7.61215 14 7.30273C14 6.99331 13.8771 6.69657 13.6583 6.47778C13.4395 6.25898 13.1428 6.13607 12.8333 6.13607H8.16667V1.4694C8.16667 1.15998 8.04375 0.863236 7.82496 0.644443C7.60616 0.425651 7.30942 0.302734 7 0.302734Z" fill="white" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_405_20477">
                                        <rect width="14" height="14" fill="white" transform="translate(0 0.302734)" />
                                    </clipPath>
                                </defs>
                            </svg>
                            <div>New Properties</div>
                        </div>
                    </CommonButton>
                </div>
            </div>

            <div className="mt-4 ">
                <table className="table-auto w-full  rounded  border-separate border-spacing-y-2">
                    <thead>
                        <tr className="border-[#e8e8e8]">
                            <th className={`p-3 border-y-2 text-black text-sm font-bold`}>Reservation ID</th>
                            <th className={`p-3 border-y-2 text-black text-sm font-bold`}>Property Name</th>
                            <th className={`p-3 border-y-2 text-black text-sm font-bold`}>Guest Name</th>
                            <th className={`p-3 border-y-2 text-black text-sm font-bold`}>Location</th>
                            <th className={`p-3 border-y-2 text-black text-sm font-bold`}>Date</th>
                            <th className={`p-3 border-y-2 text-black text-sm font-bold`}>Nights</th>
                            <th className={`p-3 border-y-2 text-black text-sm font-bold`}>Check-In</th>
                            <th className={`p-3 border-y-2 text-black text-sm font-bold`}>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((i, inx) =>
                            <tr key={inx} className="border-[#e8e8e8]">
                                <td className={`p-3 ${inx === 0 ? "border-b" : "border-y"} text-sm not-italic font-medium text-black`}>{i.id}</td>
                                <td className={`p-3 ${inx === 0 ? "border-b" : "border-y"} text-sm not-italic font-medium text-black`}>{i.property_name}</td>
                                <td className={`p-3 ${inx === 0 ? "border-b" : "border-y"} text-sm not-italic font-medium text-black`}>{i.guest_name}</td>
                                <td className={`p-3 ${inx === 0 ? "border-b" : "border-y"} text-sm not-italic font-medium text-black`}>{i.location}</td>
                                <td className={`p-3 ${inx === 0 ? "border-b" : "border-y"} text-sm not-italic font-medium text-black`}>{i.date}</td>
                                <td className={`p-3 ${inx === 0 ? "border-b" : "border-y"} text-sm not-italic font-medium text-black`}>{i.nights}</td>
                                <td className={`p-3 ${inx === 0 ? "border-b" : "border-y"} text-sm not-italic font-medium text-black`}>{i.check_in}</td>
                                <td className={`p-3 ${inx === 0 ? "border-b" : "border-y"} text-sm not-italic font-medium text-black`}>{i.total_price}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <Pagination
                    items={allBookings.length} // 100
                    currentPage={currentPage} // 1
                    pageSize={pageSize} // 10
                    onPageChange={onPageChange}
                />
            </div>
        </div>
    )
};

export default HostBookings;