import Image from "next/image";

import TropicalIslandSVG from "../../../../public/images/host/tropical-island.svg";
import TropicalhotelSVG from "../../../../public/images/host/tropical-hotel.svg";
import CommonButton from "@/components/host/Common/Buttons/CommonButton";
import { useSession } from "next-auth/react";
import DashboardCalendar from "@/components/host/Common/Dashboard/DashboardCalendar";
import { useEffect, useRef, useState } from "react";
import moment from 'moment/moment'
import DashboardStates from "@/components/host/Common/Dashboard/DashboardStates";
import CalendarSVG from "@/components/host/utils/Images/CalendarSVG";
import DatePickerComponent from "@/components/host/Common/Calendar/DatePickerComponent";
import { successtoast, errortoast } from "@/components/host/Common/Toastify";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/router";


const HostHome = () => {

    const { data: session, status } = useSession();
    const router = useRouter();

    const [propertyStatistics, setPropertyStatistics] = useState({
        Active: 0,
        Inactive: 0,
        Draft: 0,
    });

    const [calendarData, setCalendarData] = useState([]);
    const [CalendarOpen, setCalendarOpen] = useState(false);
    const [arrivals, setArrivals] = useState([
        {
            name: "Cameron Williamson",
            image: "/images/host/user/Cameron Williamson.svg",
            arrival_time: `${moment().add(1, "days").format("YYYY-MM-DD")} 09:00 am`
        },
        {
            name: "Cameron Williamson",
            image: "/images/host/user/Cameron Williamson.svg",
            arrival_time: `${moment().add(1, "days").format("YYYY-MM-DD")} 10:00 am`
        },
        {
            name: "Cameron Williamson",
            image: "/images/host/user/Cameron Williamson.svg",
            arrival_time: `${moment().add(2, "days").format("YYYY-MM-DD")} 09:00 am`
        },
        {
            name: "Cameron Williamson",
            image: "/images/host/user/Cameron Williamson.svg",
            arrival_time: `${moment().add(2, "days").format("YYYY-MM-DD")} 09:00 am`
        },
        {
            name: "Cameron Williamson",
            image: "/images/host/user/Cameron Williamson.svg",
            arrival_time: `${moment().add(4, "days").format("YYYY-MM-DD")} 04:00 pm`
        },
        {
            name: "Cameron Williamson",
            image: "/images/host/user/Cameron Williamson.svg",
            arrival_time: `${moment().add(5, "days").format("YYYY-MM-DD")} 01:00 pm`
        },
    ]);

    const [bookings, setBookings] = useState([
        {
            name: "Cameron Williamson",
            image: "/images/host/user/Cameron Williamson.svg",
            booking_date: `${moment().add(1, "days").format("YYYY-MM-DD")}`
        },
        {
            name: "Cameron Williamson",
            image: "/images/host/user/Cameron Williamson.svg",
            booking_date: `${moment().add(1, "days").format("YYYY-MM-DD")}`
        },
        {
            name: "Cameron Williamson",
            image: "/images/host/user/Cameron Williamson.svg",
            booking_date: `${moment().add(2, "days").format("YYYY-MM-DD")}`
        },
        {
            name: "Cameron Williamson",
            image: "/images/host/user/Cameron Williamson.svg",
            booking_date: `${moment().add(2, "days").format("YYYY-MM-DD")}`
        },
        {
            name: "Cameron Williamson",
            image: "/images/host/user/Cameron Williamson.svg",
            booking_date: `${moment().add(4, "days").format("YYYY-MM-DD")}`
        },
        {
            name: "Cameron Williamson",
            image: "/images/host/user/Cameron Williamson.svg",
            booking_date: `${moment().add(5, "days").format("YYYY-MM-DD")}`
        },
    ]);

    const calendarRef = useRef(null)
    useEffect(() => {
        // only add the event listener when the dropdown is opened
        if (!CalendarOpen) return;
        function handleClick(event) {
            console.log("CalendarOpen: ", CalendarOpen)
            if (calendarRef.current && !calendarRef.current.contains(event.target)) {
                setCalendarOpen(false);
            }
        }
        window.addEventListener("click", handleClick);
        // clean up
        return () => window.removeEventListener("click", handleClick);
    }, [calendarRef]);



    async function getPropertyStatistics() {
        try {
            const response = await axiosInstance.get(`/v1/host/property-statistics`, {
                headers: { Authorization: `Bearer ${session?.user?.token}` }
            });


            if (response.status === 200) {
                setPropertyStatistics(response.data.data)
            }
        } catch (err) {

            // if (err?.response?.data?.status === 'fail') {
            //     errortoast({ message: err?.response?.data?.message || "Something went wrong" });
            // } else {
            //     errortoast({ message: err.message || "Something went wrong" });
            // }
        }
    }


    useEffect(() => {

        let start_date = moment();
        let end_date = moment(start_date).add(7, 'days');

        let start_time = "8:00";
        let end_time = "18:00";

        let stime = moment(`${start_date.format("YYYY-MM-DD")} ${start_time}`);
        let etime = moment(`${start_date.format("YYYY-MM-DD")} ${end_time}`);

        const time_arr = [];
        let i = 0
        while (stime < etime) {

            // console.log("d", stime.format("hh a"))
            time_arr.push({
                time: stime.format("hh a"),
                time_str: stime.format("hh:mm a"),
                full_time: stime.format("YYYY-MM-DD hh:mm a"),
            });

            stime.add(1, 'hour');
            i++;
        }

        const calendar_arr = [];
        while (start_date < end_date) {

            calendar_arr.push({
                date: start_date.format("YYYY-MM-DD"),
                day: start_date.format("DD"),
                day_name: start_date.format("ddd"),
            });

            start_date.add(1, 'days');

        }

        setCalendarData({
            days: calendar_arr,
            time: time_arr
        });

        // get dashboard statistics
        getPropertyStatistics();
    }, []);

    const chartData = {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        datasets: [
            {
                label: 'Bookings',
                data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56],
                fill: true,
                borderColor: '#9E7B74',
                backgroundColor: '#9E7B743B',
                tension: 0.1,
            },
        ],
    };

    return (
        <>
            <div className="pb-2">
                <div className=" gap-x-6 p-7 mb-2 bg-contain bg-no-repeat  bg-[url('/images/host/dashboard-bg.svg')] w-[800px]">
                    <div>
                        <div className="font-Mulish text-black text-lg font-bold">My Dashboard</div>
                        <div className="font-Mulish text-black text-base font-medium">Good Morning {session?.user?.username}, Welcome to Ventify Dashboard!</div>
                    </div>

                    <div className=" flex w-full h-full gap-x-6 mt-8">
                        <div className="border-2 border-white border-solid rounded-lg bg-[#707070] bg-opacity-5 shadow-[0_4px_4px_0px_rgba(162,154,154,0.25)] backdrop-blur-md p-3 flex-1 justify-end">
                            <div>
                                <div className="flex items-center gap-2 ">
                                    <div>
                                        <Image src={TropicalIslandSVG} width={172} height={115} />
                                    </div>
                                    <div className="flex flex-col gap-1 h-full">
                                        <div className="flex items-center rounded-xl bg-[#ffffff61] p-2">
                                            <div className="bg-white shadow-[0_4.414px_4.414px_0px_rgba(0,0,0,0.15)]  shadow-inner-[0_-1.54px_3.08px_0px_rgba(0,0,0,0.25)] rounded">
                                                <CheckShield className="rounded" />
                                            </div>

                                            <div className="ml-2">
                                                <div className="font-Nunito text-black text-sm tracking-[0.7px] font-bold">Ready : </div>
                                                <div className="font-Nunito text-black text-sm tracking-[0.7px] font-bold">{propertyStatistics.Active}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center rounded-xl bg-[#ffffff61] p-2">
                                            <div className="bg-white shadow-[0_4.414px_4.414px_0px_rgba(0,0,0,0.15)]  shadow-inner-[0_-1.54px_3.08px_0px_rgba(0,0,0,0.25)] rounded"><MindMap className="rounded" /></div>

                                            <div className="ml-2">
                                                <div className="font-Nunito text-black text-sm tracking-[0.7px] font-bold">Connected : </div>
                                                <div className="font-Nunito text-black text-sm tracking-[0.7px] font-bold">{propertyStatistics.Draft + propertyStatistics.Inactive}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-6">
                                    <CommonButton className={"bg-primary-baseRed font-Nunito text-white text-sm font-bold px-2.5 py-3.5  w-full cursor-pointer rounded-lg border transition"} onClick={() => { router.push("/host/properties/add-new-property") }}>Add Properties</CommonButton>
                                </div>
                            </div>
                        </div>
                        <div className="border-2 border-white border-solid rounded-lg bg-[#707070] bg-opacity-5 shadow-[0_4px_4px_0px_rgba(162,154,154,0.25)] backdrop-blur-md p-3 flex-1 justify-end">
                            <div className="flex flex-col justify-end h-full">
                                <div className="flex items-center gap-2">
                                    <div>
                                        <Image src={TropicalhotelSVG} width={172} height={115} />
                                    </div>

                                    <div className="flex flex-col gap-1  h-full">
                                        <div className="flex items-center rounded-xl bg-[#ffffff61]  p-2">
                                            <div className="rounded bg-white shadow-[0_4.414px_4.414px_0px_rgba(0,0,0,0.15)]  shadow-inner-[0_-1.54px_3.08px_0px_rgba(0,0,0,0.25)]">
                                                <YellowStar className="rounded" />
                                            </div>

                                            <div className="ml-2">
                                                <div className="font-Nunito text-black text-sm tracking-[0.7px] font-bold">Bookings : </div>
                                                <div className="font-Nunito text-black text-sm tracking-[0.7px] font-bold">0</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-6">
                                    <CommonButton className={"bg-primary-baseRed font-Nunito text-white text-sm font-bold px-2.5 py-3.5  w-full cursor-pointer rounded-lg border transition"}>Change Price</CommonButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="font-Nunito text-black text-lg font-bold ">Calendar</div>

                    <DashboardCalendar calendarData={calendarData} arrivals={arrivals} bookings={bookings} />
                </div>

                <div className="pt-3 ">
                    <div className="font-Nunito text-black text-lg font-bold ">Stats</div>

                    <div className="flex w-full px-8 gap-3">
                        <div className="flex-auto">
                            <DashboardStates data={chartData} />
                        </div>

                        <div className="flex-auto w-72">
                            <div className="flex justify-between">
                                <CommonButton
                                    className={`font-Nunit text-sm font-medium px-4 py-2.5 cursor-pointer rounded-lg border transition bg-white border-[#E9E9E9]`}

                                >This Week
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                                        <path d="M8.49996 9.32978L12.0061 5.82373L13.0078 6.82546L8.49996 11.3333L3.99219 6.82546L4.99392 5.82373L8.49996 9.32978Z" fill="black" />
                                    </svg>
                                </CommonButton>

                                <div className="relative inline-block">
                                    <CommonButton
                                        className={`font-Nunit text-sm font-medium px-4 py-2.5 cursor-pointer border-0 transition bg-white`}
                                        onClick={() => setCalendarOpen(b => !b)}
                                    >
                                        <div className="flex items-center gap-2">
                                            <div>
                                                <CalendarSVG />
                                            </div>
                                            <div className="font-Nunito text-sm font-semibold text-primary-baseRed">Select Date</div>
                                        </div>
                                    </CommonButton>
                                    {CalendarOpen && <div ref={calendarRef}>
                                        <div className="rounded absolute w-80 bg-[#fafafa] top-14 right-0 shadow-lg z-10">
                                            <DatePickerComponent layoutClassName={'drop-shadow-lg p-6'} />
                                        </div>
                                    </div>}
                                </div>
                            </div>

                            <div className="flex justify-center">
                                <div className="pl-5 pt-5">
                                    <div className="text-sm font-normal text-primary-textGray leading-7">Bookings</div>
                                    <div className="text-3xl font-semibold text-[#1D2129] leading-10">35</div>

                                    <div className="flex items-center gap-1">
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="6" viewBox="0 0 9 6" fill="none">
                                                <path d="M4.56522 0.652864L9 5.08765L0.130435 5.08765L4.56522 0.652864Z" className="fill-primary-baseGreen" />
                                            </svg>
                                        </div>
                                        <div className="text-xs font-normal text-primary-baseGreen">
                                            11.2%
                                        </div>
                                        <div className="text-sm font-normal text-[#86909C]">This Week</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}



const CheckShield = ({ className }) => {
    return <svg className={className} xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
        <g clipPath="url(#clip0_405_6792)">
            <rect width="27.4694" height="27.4694" transform="translate(0.323853 0.207275) rotate(0.243351)" fill="white" />
            <g filter="url(#filter0_dii_405_6792)">
                <path d="M13.4271 24.5168C13.7628 24.698 14.1851 24.6986 14.5224 24.5203C23.7134 19.6332 24.4056 10.0114 24.4092 7.2748C24.4092 7.05484 24.3451 6.83965 24.2248 6.65556C24.1044 6.47148 23.9329 6.32649 23.7314 6.23837L14.5351 2.11779C14.3888 2.05253 14.2304 2.01857 14.0702 2.01809C13.9099 2.0176 13.7514 2.05061 13.6046 2.11498L4.43777 6.15757C4.23847 6.24404 4.06824 6.38598 3.94734 6.56647C3.82644 6.74697 3.75997 6.95842 3.75586 7.17563C3.70538 9.89834 4.21266 19.5458 13.4271 24.5168Z" fill="url(#paint0_linear_405_6792)" />
            </g>
            <g filter="url(#filter1_dii_405_6792)">
                <path fillRule="evenodd" clipRule="evenodd" d="M19.7761 8.56575C20.3357 9.12223 20.3383 10.027 19.7818 10.5867L13.8077 16.5951C13.2671 17.1388 12.3939 17.159 11.8288 16.6411L9.05509 14.099C8.47326 13.5657 8.43387 12.6618 8.96713 12.0799C9.50038 11.4981 10.4043 11.4587 10.9862 11.9919L12.7484 13.607L17.7551 8.57153C18.3116 8.01186 19.2164 8.00928 19.7761 8.56575Z" fill="white" />
            </g>
        </g>
        <defs>
            <filter id="filter0_dii_405_6792" x="0.57728" y="0.906589" width="27.0075" height="29.3041" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="2.38174" />
                <feGaussianBlur stdDeviation="1.58782" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.318372 0 0 0 0 0.579167 0 0 0 0 0.154444 0 0 0 0.55 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_405_6792" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_405_6792" result="shape" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="-1.11148" />
                <feGaussianBlur stdDeviation="1.826" />
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend mode="normal" in2="shape" result="effect2_innerShadow_405_6792" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="-0.476347" />
                <feGaussianBlur stdDeviation="0.317565" />
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.974333 0 0 0 0 1 0 0 0 0 0.954167 0 0 0 0.67 0" />
                <feBlend mode="normal" in2="effect2_innerShadow_405_6792" result="effect3_innerShadow_405_6792" />
            </filter>
            <filter id="filter1_dii_405_6792" x="7.16251" y="7.35623" width="14.464" height="11.7245" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="0.63513" />
                <feGaussianBlur stdDeviation="0.714521" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_405_6792" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_405_6792" result="shape" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="-0.793912" />
                <feGaussianBlur stdDeviation="0.396956" />
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend mode="normal" in2="shape" result="effect2_innerShadow_405_6792" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="-0.476347" />
                <feGaussianBlur stdDeviation="0.476347" />
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.85 0" />
                <feBlend mode="normal" in2="effect2_innerShadow_405_6792" result="effect3_innerShadow_405_6792" />
            </filter>
            <linearGradient id="paint0_linear_405_6792" x1="14.1038" y1="2.01823" x2="14.0077" y2="24.6535" gradientUnits="userSpaceOnUse">
                <stop stopColor="#96D14A" />
                <stop offset="1" stopColor="#61B539" />
            </linearGradient>
            <clipPath id="clip0_405_6792">
                <rect width="27.4694" height="27.4694" fill="white" transform="translate(0.323853 0.207275) rotate(0.243351)" />
            </clipPath>
        </defs>
    </svg>
}
const MindMap = ({ className, height = 27, width = 27 }) => {
    return <div style={{ height, width }} className='bg-transparent'>
        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none" className="w-full h-full">
            <g clipPath="url(#clip0_405_6800)">
                <g filter="url(#filter0_i_405_6800)">
                    <path d="M18.0665 10.5759L17.7049 8.74378L11.9335 9.91944L11.9493 3.69328L10.1181 3.68863L10.1038 9.31964L3.75077 5.18324L2.73965 6.73722L9.6869 11.2414L4.3128 18.2322L5.77499 19.3347L10.9654 12.5723L14.7962 18.3962L16.3553 17.3929L12.5243 11.6606L18.0665 10.5759Z" fill="url(#paint0_linear_405_6800)" />
                </g>
                <g filter="url(#filter1_dii_405_6800)">
                    <path d="M3.45025 8.40464C4.74581 8.40792 5.79874 7.36033 5.80203 6.06477C5.80532 4.7692 4.75772 3.71628 3.46216 3.71299C2.16659 3.7097 1.11367 4.75729 1.11038 6.05286C1.10709 7.34842 2.15468 8.40135 3.45025 8.40464Z" fill="#FFCE50" />
                </g>
                <g filter="url(#filter2_dii_405_6800)">
                    <path d="M11.0336 5.70005C12.3292 5.70333 13.3821 4.65574 13.3854 3.36018C13.3887 2.06461 12.3411 1.01169 11.0455 1.0084C9.74997 1.00511 8.69704 2.0527 8.69375 3.34827C8.69046 4.64383 9.73806 5.69676 11.0336 5.70005Z" fill="#FFCE50" />
                </g>
                <g filter="url(#filter3_dii_405_6800)">
                    <path d="M17.8536 11.5462C19.1491 11.5495 20.2021 10.5019 20.2053 9.20637C20.2086 7.9108 19.161 6.85788 17.8655 6.85459C16.5699 6.8513 15.517 7.89889 15.5137 9.19446C15.5104 10.49 16.558 11.5429 17.8536 11.5462Z" fill="#FFCE50" />
                </g>
                <g filter="url(#filter4_dii_405_6800)">
                    <path d="M15.4719 20.0975C16.7674 20.1008 17.8203 19.0532 17.8236 17.7576C17.8269 16.4621 16.7793 15.4091 15.4838 15.4059C14.1882 15.4026 13.1353 16.4502 13.132 17.7457C13.1287 19.0413 14.1763 20.0942 15.4719 20.0975Z" fill="#FFCE50" />
                </g>
                <g filter="url(#filter5_dii_405_6800)">
                    <path d="M4.64666 21.0724C5.94222 21.0756 6.99515 20.0281 6.99844 18.7325C7.00173 17.4369 5.95413 16.384 4.65857 16.3807C3.36301 16.3774 2.31008 17.425 2.30679 18.7206C2.3035 20.0161 3.3511 21.0691 4.64666 21.0724Z" fill="#FFCE50" />
                </g>
                <g filter="url(#filter6_dii_405_6800)">
                    <path d="M11.0119 14.102C12.7141 14.1064 14.0975 12.73 14.1018 11.0278C14.1061 9.32569 12.7297 7.94232 11.0276 7.938C9.32543 7.93368 7.94205 9.31004 7.93773 11.0122C7.93341 12.7144 9.30978 14.0977 11.0119 14.102Z" fill="#FFCE50" />
                </g>
            </g>
            <defs>
                <filter id="filter0_i_405_6800" x="2.73962" y="3.0392" width="15.3269" height="16.2955" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="-0.649523" />
                    <feGaussianBlur stdDeviation="0.378889" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.36 0" />
                    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_405_6800" />
                </filter>
                <filter id="filter1_dii_405_6800" x="-1.30764" y="1.6979" width="9.52762" height="9.52762" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="0.402998" />
                    <feGaussianBlur stdDeviation="1.20899" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.766638 0 0 0 0 0.465592 0 0 0 0 0.11219 0 0 0 0.31 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_405_6800" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_405_6800" result="shape" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="-1.29905" />
                    <feGaussianBlur stdDeviation="0.541269" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.483304 0 0 0 0 0.261434 0 0 0 0 0.0566303 0 0 0 0.38 0" />
                    <feBlend mode="normal" in2="shape" result="effect2_innerShadow_405_6800" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="-0.324762" />
                    <feGaussianBlur stdDeviation="0.162381" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.960695 0 0 0 0 0.82134 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="effect2_innerShadow_405_6800" result="effect3_innerShadow_405_6800" />
                </filter>
                <filter id="filter2_dii_405_6800" x="6.27574" y="-1.00669" width="9.52762" height="9.52762" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="0.402998" />
                    <feGaussianBlur stdDeviation="1.20899" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.766638 0 0 0 0 0.465592 0 0 0 0 0.11219 0 0 0 0.31 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_405_6800" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_405_6800" result="shape" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="-1.29905" />
                    <feGaussianBlur stdDeviation="0.541269" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.483304 0 0 0 0 0.261434 0 0 0 0 0.0566303 0 0 0 0.38 0" />
                    <feBlend mode="normal" in2="shape" result="effect2_innerShadow_405_6800" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="-0.324762" />
                    <feGaussianBlur stdDeviation="0.162381" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.960695 0 0 0 0 0.82134 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="effect2_innerShadow_405_6800" result="effect3_innerShadow_405_6800" />
                </filter>
                <filter id="filter3_dii_405_6800" x="13.0957" y="4.8395" width="9.52762" height="9.52762" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="0.402998" />
                    <feGaussianBlur stdDeviation="1.20899" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.766638 0 0 0 0 0.465592 0 0 0 0 0.11219 0 0 0 0.31 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_405_6800" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_405_6800" result="shape" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="-1.29905" />
                    <feGaussianBlur stdDeviation="0.541269" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.483304 0 0 0 0 0.261434 0 0 0 0 0.0566303 0 0 0 0.38 0" />
                    <feBlend mode="normal" in2="shape" result="effect2_innerShadow_405_6800" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="-0.324762" />
                    <feGaussianBlur stdDeviation="0.162381" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.960695 0 0 0 0 0.82134 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="effect2_innerShadow_405_6800" result="effect3_innerShadow_405_6800" />
                </filter>
                <filter id="filter4_dii_405_6800" x="10.714" y="13.3908" width="9.52762" height="9.52762" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="0.402998" />
                    <feGaussianBlur stdDeviation="1.20899" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.766638 0 0 0 0 0.465592 0 0 0 0 0.11219 0 0 0 0.31 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_405_6800" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_405_6800" result="shape" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="-1.29905" />
                    <feGaussianBlur stdDeviation="0.541269" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.483304 0 0 0 0 0.261434 0 0 0 0 0.0566303 0 0 0 0.38 0" />
                    <feBlend mode="normal" in2="shape" result="effect2_innerShadow_405_6800" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="-0.324762" />
                    <feGaussianBlur stdDeviation="0.162381" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.960695 0 0 0 0 0.82134 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="effect2_innerShadow_405_6800" result="effect3_innerShadow_405_6800" />
                </filter>
                <filter id="filter5_dii_405_6800" x="-0.111224" y="14.3656" width="9.52762" height="9.52762" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="0.402998" />
                    <feGaussianBlur stdDeviation="1.20899" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.766638 0 0 0 0 0.465592 0 0 0 0 0.11219 0 0 0 0.31 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_405_6800" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_405_6800" result="shape" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="-1.29905" />
                    <feGaussianBlur stdDeviation="0.541269" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.483304 0 0 0 0 0.261434 0 0 0 0 0.0566303 0 0 0 0.38 0" />
                    <feBlend mode="normal" in2="shape" result="effect2_innerShadow_405_6800" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="-0.324762" />
                    <feGaussianBlur stdDeviation="0.162381" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.960695 0 0 0 0 0.82134 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="effect2_innerShadow_405_6800" result="effect3_innerShadow_405_6800" />
                </filter>
                <filter id="filter6_dii_405_6800" x="4.76091" y="5.29063" width="12.5177" height="12.5177" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="0.529472" />
                    <feGaussianBlur stdDeviation="1.58842" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.766638 0 0 0 0 0.465592 0 0 0 0 0.11219 0 0 0 0.31 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_405_6800" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_405_6800" result="shape" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="-1.70673" />
                    <feGaussianBlur stdDeviation="0.711138" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.483304 0 0 0 0 0.261434 0 0 0 0 0.0566303 0 0 0 0.38 0" />
                    <feBlend mode="normal" in2="shape" result="effect2_innerShadow_405_6800" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="-0.426683" />
                    <feGaussianBlur stdDeviation="0.213341" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.960695 0 0 0 0 0.82134 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="effect2_innerShadow_405_6800" result="effect3_innerShadow_405_6800" />
                </filter>
                <linearGradient id="paint0_linear_405_6800" x1="4.40914" y1="2.21352" x2="21.7406" y2="22.0927" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#6B7AFF" />
                    <stop offset="1" stopColor="#1430C6" />
                </linearGradient>
                <clipPath id="clip0_405_6800">
                    <rect width="21.9747" height="21.9747" fill="white" transform="translate(0.0557861 0.000244141) rotate(0.145449)" />
                </clipPath>
            </defs>
        </svg>
    </div>
}
const YellowStar = ({ className, height = 27, width = 27 }) => {
    return <div style={{ height, width }} className='bg-transparent'>
        <svg xmlns="http://www.w3.org/2000/svg" width="33" height="35" viewBox="0 0 33 35" fill="none" className="w-full h-full">
            <rect width="33" height="33" rx="4.28875" fill="white" />
            <g filter="url(#filter0_dii_405_6795)">
                <path d="M15.6273 7.12075C16.0555 6.25317 17.2927 6.25317 17.7209 7.12075L20.01 11.7582C20.1799 12.1024 20.5082 12.3411 20.888 12.3966L26.0089 13.1451C26.9661 13.285 27.3476 14.4616 26.6546 15.1366L22.951 18.7439C22.6756 19.0121 22.5499 19.3987 22.6149 19.7775L23.4887 24.8724C23.6523 25.8261 22.6512 26.5533 21.7948 26.1029L17.2175 23.6958C16.8773 23.5169 16.4709 23.5169 16.1307 23.6958L11.5534 26.1029C10.697 26.5533 9.69584 25.8261 9.85942 24.8724L10.7332 19.7775C10.7982 19.3987 10.6725 19.0121 10.3972 18.7439L6.69354 15.1366C6.00057 14.4616 6.38206 13.285 7.33923 13.1451L12.4602 12.3966C12.84 12.3411 13.1682 12.1024 13.3381 11.7582L15.6273 7.12075Z" fill="url(#paint0_linear_405_6795)" />
            </g>
            <defs>
                <filter id="filter0_dii_405_6795" x="1.66978" y="5.30256" width="30.0086" height="29.109" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="3.50222" />
                    <feGaussianBlur stdDeviation="2.33482" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.441638 0 0 0 0 0.245593 0 0 0 0 0.0646293 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_405_6795" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_405_6795" result="shape" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="-1.16741" />
                    <feGaussianBlur stdDeviation="1.16741" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.549971 0 0 0 0 0.304646 0 0 0 0 0.0781912 0 0 0 0.57 0" />
                    <feBlend mode="normal" in2="shape" result="effect2_innerShadow_405_6795" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="-1.16741" />
                    <feGaussianBlur stdDeviation="0.583704" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.981301 0 0 0 0 0.813007 0 0 0 0.72 0" />
                    <feBlend mode="normal" in2="effect2_innerShadow_405_6795" result="effect3_innerShadow_405_6795" />
                </filter>
                <linearGradient id="paint0_linear_405_6795" x1="12.0211" y1="7.47327" x2="17.1017" y2="25.7194" gradientUnits="userSpaceOnUse">
                    <stop offset="0.0001" stopColor="#FFED8C" />
                    <stop offset="1" stopColor="#F4B335" />
                </linearGradient>
            </defs>
        </svg>
    </div>
}

export default HostHome;