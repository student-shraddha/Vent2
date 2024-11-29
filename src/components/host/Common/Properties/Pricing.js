import React, { useState } from "react";
import InputWithLabel from "../Inputs/InputWithLabel";
import CommonButton from "../Buttons/CommonButton";
import Accordion from "../Accordion";
// import CustomSelect from "../Dropdown/CustomSelect";
// import CalendarSVG from "../../utils/Images/CalendarSVG";
import CheckBox from "../../utils/Inputs/CheckBox";
import PlusSvg from "../../utils/Images/PlusSvg";
import CheckNumberOnlyFunction from "../Functions/CheckNumberOnlyFunction";
import { successtoast, errortoast } from "@/components/host/Common/Toastify";
import dayjs from "dayjs";


import { DatePicker } from 'antd';
import ErrorBlock from "../ErrorBlock";
import CloseSvg from "../../utils/Images/CloseSvg";
// import EditSvg from "../../utils/Images/EditSvg";
const { RangePicker } = DatePicker;

function Pricing({ data, setData }) {

    const [seasonData, setSeasonData] = useState({
        season_name: "",
        from_date: "",
        to_date: "",
        daily_price: "",
        no_of_guest: "",
        extra_guest_price: "",
        min_stay: ""
    });


    const handleSeasonChange = (e) => {

        if (['daily_price', 'no_of_guest', 'extra_guest_price', 'min_stay'].includes(e.target.name)) {
            if (CheckNumberOnlyFunction(e.target.value))
                setSeasonData({ ...seasonData, [e.target.name]: e.target.value })
            return
        }

        setSeasonData({ ...seasonData, [e.target.name]: e.target.value })
    }

    const OnChangeDateInput = (date) => {
        setSeasonData({ ...seasonData, from_date: (date && date[0].format("YYYY-MM-DD") || ""), to_date: (date && date[1].format("YYYY-MM-DD") || "") })
    }
    const handleRemoveSeason = (inx) => {
        const season_prices = data.season_prices;
        season_prices.splice(inx, 1);
        setData({ ...data, season_prices: season_prices });
    }

    const [errorFieldsSeason, setErrorFieldsSeason] = useState({
        season_name: "",
        from_date: "",
        to_date: "",
        daily_price: "",
        no_of_guest: "",
        extra_guest_price: "",
        min_stay: ""
    });

    const onSaveSeason = () => {

        let isValid = true;
        let seasonNameError = null;
        let fromDateError = null;
        let toDateError = null;
        let dailyPriceError = null;
        let noOfGuestError = null;
        let extraGuestPriceError = null;
        let minStayError = null;

        if (!seasonData?.season_name.length)
            seasonNameError = "Please enter season name";

        if (!seasonData?.from_date.length) {
            fromDateError = "Please enter from date";
        } else if (!seasonData?.to_date.length) {
            toDateError = "Please enter to date";
        }

        if (!seasonData?.daily_price.length)
            dailyPriceError = "Please enter daily price";
        if (!seasonData?.no_of_guest.length)
            noOfGuestError = "Please enter number of guest";
        if (!seasonData?.extra_guest_price.length)
            extraGuestPriceError = "Please enter extra guest price";
        if (!seasonData?.min_stay.length)
            minStayError = "Please enter min stay";


        if (seasonNameError || fromDateError || toDateError || dailyPriceError || noOfGuestError || extraGuestPriceError || minStayError) {
            isValid = false;
        }

        setErrorFieldsSeason({
            ...errorFieldsSeason,
            season_name: seasonNameError,
            from_date: fromDateError,
            to_date: toDateError,
            daily_price: dailyPriceError,
            no_of_guest: noOfGuestError,
            extra_guest_price: extraGuestPriceError,
            min_stay: minStayError,
        });

        if (!isValid) {
            errortoast({ message: "Please fill all the required fields" });
            return false;
        }

        setData({ ...data, season_prices: [...data.season_prices, { ...seasonData }] });
        setSeasonData({
            season_name: "",
            from_date: "",
            to_date: "",
            daily_price: "",
            no_of_guest: "",
            extra_guest_price: "",
            min_stay: ""
        });
    }

    const handleChange = (e) => {

        const { name, checked, value } = event.target;
        if (name === 'applies_on' || name === 'never_check_in' || name === 'never_check_out') {

            const checked_options = data[name] || [];
            if (checked) {
                checked_options.push(value)
            } else {
                const inx = checked_options.findIndex((i) => i === value);
                if (inx !== -1)
                    checked_options.splice(inx, 1);
            }
            setData({ ...data, [name]: checked_options })
            return;
        }
        if (name === "event_only") {
            setData({ ...data, [name]: parseInt(value) });
            return;
        }
        if (e.target.name == 'no_of_guests_daily_price' || e.target.name == 'weekend_price' || e.target.name == 'price' || e.target.name == "event_price") {
            if (CheckNumberOnlyFunction(e.target.value))
                setData({ ...data, [e.target.name]: e.target.value })
            return
        }

        setData({ ...data, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className="w-full flex items-center">
                <div className="w-1/2 text-base font-semibold">
                    Number of Guests in your Daily price:
                </div>
                <div className="w-1/2 flex items-center gap-3">
                    <InputWithLabel placeholder={'People'} name={"no_of_guests_daily_price"} value={data?.no_of_guests_daily_price} setValue={handleChange} />
                    {/* <CommonButton className={`bg-primary-baseRed font-Nunito text-white text-sm font-bold px-4 py-2 h-10 cursor-pointer rounded-lg border transition`} >Save</CommonButton> */}
                </div>
            </div>

            <div className="w-full flex items-center mt-4">
                <div className="w-1/2 text-base font-semibold">
                    Price / Night:
                </div>
                <div className="w-1/2 flex items-center gap-3">
                    <InputWithLabel placeholder={'Price / Night'} name={"price"} value={data?.price} setValue={handleChange} />
                    {/* <CommonButton className={`bg-primary-baseRed font-Nunito text-white text-sm font-bold px-4 py-2 h-10 cursor-pointer rounded-lg border transition`} >Save</CommonButton> */}
                </div>
            </div>

            <div className="w-full flex items-center mt-4">
                <div className="w-1/2 text-base font-semibold">
                    Property Stay Option:
                </div>
                <div className="w-1/2 flex items-center gap-3">
                    <div className="flex items-center mb-4">
                        <input id="default-radio-1" type="radio" value={0} name="event_only" className="w-4 h-4  bg-gray-100 border-gray-300 focus:ring-0" checked={data.event_only === 0} onChange={handleChange} />
                        <label for="default-radio-1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nightly Stay + Event</label>
                    </div>
                    <div className="flex items-center mb-4">
                        <input id="default-radio-2" type="radio" value={1} name="event_only" className="w-4 h-4  bg-gray-100 border-gray-300 focus:ring-0" checked={data.event_only === 1} onChange={handleChange} />
                        <label for="default-radio-2" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Event Only</label>
                    </div>

                </div>
            </div>


            <div className="w-full flex items-center mt-4">
                <div className="w-1/2 text-base font-semibold">
                    Minimum Event Fee:
                </div>
                <div className="w-1/2 flex items-center gap-3">
                    <InputWithLabel placeholder={'Minimum Event Fee'} name={"event_price"} value={data?.event_price} setValue={handleChange} />
                </div>
            </div>



            <div className="w-full mt-4">
                <Accordion title={'Add / Edit Season'} open={false}>
                    <div className="flex gap-5">
                        <div className="w-full">
                            {/* <CustomSelect
                                defaultValue={''}
                                label={`Season name`}
                                placeholder={'Please Select'}
                                optionalFunction={(e) => { }}
                                listItem={[]}
                            /> */}
                            <InputWithLabel placeholder={'Season Name'} name={"season_name"} value={seasonData?.season_name} setValue={handleSeasonChange} />
                            {errorFieldsSeason?.season_name && <ErrorBlock>{errorFieldsSeason?.season_name}</ErrorBlock>}
                        </div>
                        <div className="text-sm text-primary-baseGray ">Channels need to display your taxes separately to the guest, we advise you to exclude them from your rental rates</div>
                    </div>

                    <div className="w-full mt-4 flex gap-4 ">
                        <div className="flex w-1/2">
                            <div className="w-full">
                                <div className="flex">
                                    <div className="w-1/2 font-Nunito text-primary-baseGray text-base mb-[4px] font-medium">From</div>
                                    <div className="w-1/2 font-Nunito text-primary-baseGray text-base mb-[4px] font-medium">To</div>
                                </div>
                                <div>
                                    <RangePicker
                                        className="flex h-10 border-[#E9E9E9] border-1"
                                        onChange={OnChangeDateInput}
                                        format={"MM/DD/YYYY"}
                                        value={seasonData?.from_date && seasonData?.to_date ? [dayjs(seasonData?.from_date), dayjs(seasonData?.to_date)] : ""}
                                    />
                                </div>
                                {errorFieldsSeason?.from_date && <ErrorBlock>{errorFieldsSeason?.from_date}</ErrorBlock>}
                                {errorFieldsSeason?.to_date && <ErrorBlock>{errorFieldsSeason?.to_date}</ErrorBlock>}
                            </div>

                            {/* <div className="w-full">
                                <div className="flex  tracking-[0.7px] mb-1 font-Nunito text-primary-baseGray text-base font-medium">
                                    <div className="w-1/2">From</div>
                                    <div className="w-1/2">To</div>
                                </div>
                                <div className="flex items-center w-full">
                                    <div className="min-w-80 w-full flex items-center justify-between px-4 py-2 border-1 rounded border-solid border-primary-borderGray ">
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
                                </div>
                            </div> */}
                        </div>
                        <div className="mt-[2rem]">
                            <PlusSvg />
                        </div>
                        <div className="flex w-1/2">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-1">
                                    <InputWithLabel label={'Daily price USD'} placeholder={'0.00'} name={"daily_price"} value={seasonData?.daily_price} setValue={handleSeasonChange} />
                                    {errorFieldsSeason?.daily_price && <ErrorBlock>{errorFieldsSeason?.daily_price}</ErrorBlock>}
                                </div>
                                <div className="col-span-1">
                                    <InputWithLabel label={'For N# of Guest'} placeholder={'1'} name={"no_of_guest"} value={seasonData?.no_of_guest} setValue={handleSeasonChange} />
                                    {errorFieldsSeason?.no_of_guest && <ErrorBlock>{errorFieldsSeason?.no_of_guest}</ErrorBlock>}
                                </div>
                                <div className="col-span-1">
                                    <InputWithLabel label={'Extra Guest Price USD'} placeholder={'0.00'} name={"extra_guest_price"} value={seasonData?.extra_guest_price} setValue={handleSeasonChange} />
                                    {errorFieldsSeason?.extra_guest_price && <ErrorBlock>{errorFieldsSeason?.extra_guest_price}</ErrorBlock>}
                                </div>
                                <div className="col-span-1">
                                    <InputWithLabel label={'Minimum Stay'} placeholder={'1'} name={"min_stay"} value={seasonData?.min_stay} setValue={handleSeasonChange} />
                                    {errorFieldsSeason?.min_stay && <ErrorBlock>{errorFieldsSeason?.min_stay}</ErrorBlock>}
                                </div>
                                <div className="col-span-2 flex justify-content-end">
                                    <CommonButton className={`bg-primary-baseRed font-Nunito text-white text-sm font-bold px-4 py-2 h-10 cursor-pointer rounded-lg border transition`} onClick={onSaveSeason}>Save</CommonButton>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div className="flex w-full mt-4">
                        {data?.season_prices?.length ? (

                            <table className="table-auto w-full  rounded  border-separate border-spacing-y-2">
                                <thead>
                                    <tr className="border-[#e8e8e8]">
                                        <th className={`p-3 border-y-2 text-black text-sm font-bold`}>Season</th>
                                        <th className={`p-3 border-y-2 text-black text-sm font-bold`}>Date From</th>
                                        <th className={`p-3 border-y-2 text-black text-sm font-bold`}>Date To</th>
                                        <th className={`p-3 border-y-2 text-black text-sm font-bold`}>Daily Price</th>
                                        <th className={`p-3 border-y-2 text-black text-sm font-bold`}>Extra Guest</th>
                                        <th className={`p-3 border-y-2 text-black text-sm font-bold`}>Min. Stay</th>
                                        <th className={`p-3 border-y-2 text-black text-sm font-bold`}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {data?.season_prices.map((i, inx) =>
                                        <tr key={inx} className="border-[#e8e8e8]">
                                            <td className={`p-3 ${inx === 0 ? "border-b" : "border-y"} text-sm not-italic font-medium text-black`}>{i.season_name}</td>
                                            <td className={`p-3 ${inx === 0 ? "border-b" : "border-y"} text-sm not-italic font-medium text-black`}>{dayjs(i.from_date).format("MM/DD/YYYY")}</td>
                                            <td className={`p-3 ${inx === 0 ? "border-b" : "border-y"} text-sm not-italic font-medium text-black`}>{dayjs(i.to_date).format("MM/DD/YYYY")}</td>
                                            <td className={`p-3 ${inx === 0 ? "border-b" : "border-y"} text-sm not-italic font-medium text-black`}>{i.daily_price}</td>
                                            <td className={`p-3 ${inx === 0 ? "border-b" : "border-y"} text-sm not-italic font-medium text-black`}>{i.extra_guest_price}</td>
                                            <td className={`p-3 ${inx === 0 ? "border-b" : "border-y"} text-sm not-italic font-medium text-black`}>{i.min_stay}</td>
                                            <td className={`p-3 ${inx === 0 ? "border-b" : "border-y"} text-sm not-italic font-medium text-black`}>
                                                <div className="flex items-center gap-2">
                                                    {/* <div>
                                                        <EditSvg width={16} height={16} className={`fill-primary-baseGreen`} />
                                                    </div> */}
                                                    <div className="cursor-pointer" onClick={() => { handleRemoveSeason(inx) }}>
                                                        <CloseSvg width={12} height={12} className={`fill-primary-baseRed`} />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                        ) : ""}
                    </div>
                </Accordion>
            </div>

            <div className="w-full mt-4">
                <Accordion title={'Show advanced options (changeovers, weekend, rates and fees)'} open={true}>


                    <div className="w-full mt-4 flex gap-4 ">
                        <div className="flex w-1/2">

                            <div className="w-full">
                                <div className="font-semibold font-Nunito text-base">
                                    Weekend pricing:
                                </div>
                                <div className="grid grid-cols-2  mt-3">
                                    <div className="col-span-1">
                                        <div className="font-Nunito text-primary-baseGray text-base font-medium mt-1 mb-0">
                                            Applies on:
                                        </div>

                                        <div className="pt-5">
                                            {["Thursday", "Friday", "Saturday", "Sunday"].map((value, key) =>
                                                <CheckBox label={value} key={key} id={value} name={'applies_on'} checked={data?.applies_on.includes(value)} onChange={handleChange} />
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-span-1">
                                        <InputWithLabel label={'Price per night:'} name={"weekend_price"} value={data?.weekend_price} setValue={handleChange} />
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="flex w-1/2">
                            <div className="w-full">
                                <div className="font-semibold font-Nunito text-base">
                                    Changeover:
                                </div>
                                <div className="grid grid-cols-2 mt-3">
                                    <div className="col-span-1">
                                        <div className="font-Nunito text-primary-baseGray text-base font-medium mt-1 mb-0">
                                            Check-in never on:
                                        </div>
                                        <div className="pt-5">
                                            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((value, key) =>
                                                <CheckBox label={value} key={key} id={value} name={'never_check_in'} checked={data?.never_check_in.includes(value)} onChange={handleChange} />
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-span-1">
                                        <div className="font-Nunito text-primary-baseGray text-base font-medium mt-1 mb-0">
                                            Check-out never on:
                                        </div>
                                        <div className="pt-5">
                                            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((value, key) =>
                                                <CheckBox label={value} key={key} id={value} name={'never_check_out'} checked={data?.never_check_out.includes(value)} onChange={handleChange} />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className="w-full mt-4 flex gap-5 ">
                        <div className="flex w-1/2">
                            <div>
                                <div className="text-sm font-normal">
                                    <div>
                                        <span className="text-black font-semibold">Occupancy pricing:</span><span className="text-primary-baseGray font-medium ml-3">Extra price per guest</span>
                                    </div>
                                    <div className="text-primary-baseGray font-medium">If you have X extras guest the price per extra guest per night will be Y</div>
                                </div>
                                <div className="col-span-2 pt-4">
                                    <CommonButton className={`bg-primary-baseRed font-Nunito text-white text-base font-bold px-4 py-2 h-10 cursor-pointer rounded-lg border transition flex items-center gap-2`} ><PlusSvg fill={'fill-white'} width={16} heigth={16} /> <span>Add Price</span></CommonButton>
                                </div>
                                <div className="text-sm font-normal pt-4">
                                    <div>
                                        <span className="text-black font-semibold">Discounts:</span><span className="text-primary-baseGray font-medium ml-3">last minute</span>
                                    </div>
                                </div>
                                <div className="col-span-2 pt-3">
                                    <CommonButton className={`bg-primary-baseRed font-Nunito text-white text-base font-bold px-4 py-2 h-10 cursor-pointer rounded-lg border transition flex items-center gap-2`} ><PlusSvg fill={'fill-white'} width={16} heigth={16} /> <span>Add Price</span></CommonButton>
                                </div>
                            </div>
                        </div>

                        <div className="flex w-1/2">
                            <div>
                                <div className="text-sm font-normal">
                                    <div>
                                        <span className="text-black font-semibold">LOS pricing:</span><span className="text-primary-baseGray font-medium ml-3">Length of stay price</span>
                                    </div>
                                    <div className="text-primary-baseGray font-medium">If you have X amount of guests staying Y amounts of nights the price per night will be Z.</div>
                                </div>
                                <div className="col-span-2 pt-4">
                                    <CommonButton className={`bg-primary-baseRed font-Nunito text-white text-base font-bold px-4 py-2 h-10 cursor-pointer rounded-lg border transition flex items-center gap-2`} ><PlusSvg fill={'fill-white'} width={16} heigth={16} /> <span>Add Price</span></CommonButton>
                                </div>
                                <div className="text-sm font-normal pt-4">
                                    <div>
                                        <span className="text-black font-semibold">Discounts:</span><span className="text-primary-baseGray font-medium ml-3">Length of Stay</span>
                                    </div>
                                </div>
                                <div className="col-span-2 pt-3">
                                    <CommonButton className={`bg-primary-baseRed font-Nunito text-white text-base font-bold px-4 py-2 h-10 cursor-pointer rounded-lg border transition flex items-center gap-2`} ><PlusSvg fill={'fill-white'} width={16} heigth={16} /> <span>Add Price</span></CommonButton>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </Accordion >
            </div >
        </>
    )
}

export default Pricing;