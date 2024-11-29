import React, { useState } from "react";
import InputWithLabel from "../Inputs/InputWithLabel";
import PhoneInput from "../Inputs/phone_input";
import IncrementDecrementInput from "../Inputs/IncrementDecrementInput";
import CustomSelect from "../Dropdown/CustomSelect";
import Accordion from "../Accordion";
import CheckNumberOnlyFunction from "../Functions/CheckNumberOnlyFunction";
import { CHECKIN_FROM, LATE_IN_EARLY_OUT_FEES } from "../../utils/constants/constants";
import DescriptionBox from "../Inputs/DescriptionBox";
import CheckInCheckoutFees from "./CheckInCheckoutFees";
import CommonButton from "../Buttons/CommonButton";
import CloseSvg from "../../utils/Images/CloseSvg";


function CheckInCheckOut({ onSave, data, setData }) {

    const [taxItem, setTaxItem] = useState(false);

    const handleTaxItems = (CheckInCheckOutFees) => {
        setData({ ...data, CheckInCheckOutFees: [...data?.CheckInCheckOutFees, CheckInCheckOutFees] })
        setTaxItem(false)
    }

    const handleRemoveFeeAndTax = (inx) => {
        const CheckInCheckOutFees = data.CheckInCheckOutFees;
        CheckInCheckOutFees.splice(inx, 1);
        setData({ ...data, CheckInCheckOutFees: CheckInCheckOutFees });
    }


    const handleSelect = (field_name, value) => {

        setData({ ...data, [field_name]: value })
    }

    const handleChange = (e) => {

        if (e.target.name === 'contact_prior_days' || e.target.name === 'landlord_phone') {
            if (CheckNumberOnlyFunction(e.target.value))
                setData({ ...data, [e.target.name]: e.target.value })
            return
        }

        setData({ ...data, [e.target.name]: e.target.value })
    }


    const handleSubmit = () => {

        // After validation done, can submit step
        onSave();
    }




    return (
        <>
            <div className="w-full h-auto flex flex-col items-center justify-start pt-3 px-2.5 ">
                <div className="w-full">

                    <div>
                        <div className="font-Nunito text-black font-semibold text-xl">
                            Arrival Information
                        </div>
                    </div>

                    <div className="flex  flex-wrap rounded-lg mt-4 w-full gap-4 items-center">
                        <div className='font-Nunito text-primary-baseGray text-base font-medium mt-1'>
                            Please contact the Landlord
                        </div>
                        <div><InputWithLabel placeholder={'Landlord'} name={`landlord_name`} setValue={handleChange} value={data?.landlord_name} /></div>
                        <div className='font-Nunito text-primary-baseGray text-base font-medium mt-1'>
                            At Least
                        </div>
                        <div><InputWithLabel placeholder={'0'} name={"contact_prior_days"} setValue={handleChange} value={data?.contact_prior_days} /></div>
                        <div className='font-Nunito text-primary-baseGray text-base font-medium mt-1'>
                            days prior to your
                        </div>

                    </div>

                    <div className="flex  flex-col rounded-lg mt-4 w-full gap-2">
                        <div className='font-Nunito text-primary-baseGray text-base font-medium mt-1'>
                            Arrival to confirm your arrival time and transport mode using this email
                        </div>
                        <div className=" max-w-52">
                            <InputWithLabel placeholder={'Enter your email id'} name={`landlord_email`} setValue={handleChange} value={data?.landlord_email} />
                        </div>
                    </div>

                    <div className="flex  flex-col rounded-lg mt-4 w-full gap-2">
                        <div className='font-Nunito text-primary-baseGray text-base font-medium mt-1'>
                            Or this telephone number
                        </div>
                        <div className="flex items-center gap-3">
                            <div className=" h-fit">
                                <PhoneInput
                                    elementId="doctor-input-phone"
                                    defaultValue={(data?.landlord_phonecode?.code ? data?.landlord_phonecode?.code.toLowerCase() : "")}
                                    onCountryCodeSelect={(countryCodeValue) => { handleSelect('landlord_phonecode', countryCodeValue) }}
                                />
                            </div>
                            <div className=" max-w-52">
                                <InputWithLabel placeholder={'Enter your phone number'} name={`landlord_phone`} setValue={handleChange} value={data?.landlord_phone} />
                            </div>
                        </div>
                    </div>

                    <div className="mt-4">
                        <div className="font-Nunito text-black font-semibold text-base">
                            Normal Check-in/Check-out Times
                        </div>

                        <div className="flex items-center rounded-lg mt-4 w-full gap-2">
                            <div className='font-Nunito text-primary-baseGray text-base font-medium mt-1'>
                                Normal checkin times (without a charge)
                            </div>
                            <div> <IncrementDecrementInput defaultValue={data?.checkIn || "13:00"} name={'checkIn'} handleCounter={handleSelect} type={'time'} step={30} /></div>
                            <div className='font-Nunito text-primary-baseGray text-base font-medium mt-1'>
                                At Least
                            </div>
                            <div> <IncrementDecrementInput defaultValue={data?.checkIn_To || "17:00"} name={'checkIn_To'} handleCounter={handleSelect} type={'time'} step={30} /></div>
                        </div>
                        <div className="flex items-center rounded-lg mt-4 w-full gap-2">
                            <div className='font-Nunito text-primary-baseGray text-base font-medium mt-1'>
                                Normal checkout time (without a charge)
                            </div>
                            <div> <IncrementDecrementInput defaultValue={data?.checkOut || "11:00"} name={'checkOut'} handleCounter={handleSelect} type={'time'} step={30} /></div>
                        </div>
                        <div className="flex items-center rounded-lg mt-4 w-full gap-2">
                            <div className='font-Nunito text-primary-baseGray text-base font-medium mt-1'>
                                The checkin will happen:
                            </div>
                            <div>
                                <CustomSelect
                                    defaultValue={data?.checkin_at}
                                    label={false}
                                    placeholder={'At the property'}
                                    optionalFunction={(e) => { handleSelect('checkin_at', e.id) }}
                                    listItem={Object.entries(CHECKIN_FROM).map(([key, value]) => { return { id: key, name: value } })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-4">
                        <div className="font-Nunito text-black font-semibold text-xl">
                            Arrival Instructions
                        </div>

                        <div className="mt-3">
                            <Accordion title={'Arrival Instructions'} open={false}>
                                <DescriptionBox placeholder={'Enter arrival instructions'} rows={10} value={data?.ArrivalInstructions} name={'ArrivalInstructions'} setValue={handleChange} />
                            </Accordion>
                        </div>
                    </div>

                    <div className="mt-4">
                        <div className="font-Nunito text-black font-semibold text-xl">
                            Early Check-in/Late Check-out
                        </div>

                        <div className="mt-3">
                            <Accordion title={'Fees'} open={false}>

                                {data?.CheckInCheckOutFees?.length ? (

                                    <table className="table-auto w-full  rounded  border-separate border-spacing-y-2">
                                        <thead>
                                            <tr className="border-[#e8e8e8]">
                                                <th className={`p-3 border-y-2 text-black text-sm font-bold`}>Fee Type</th>
                                                <th className={`p-3 border-y-2 text-black text-sm font-bold`}>From</th>
                                                <th className={`p-3 border-y-2 text-black text-sm font-bold`}>To</th>
                                                <th className={`p-3 border-y-2 text-black text-sm font-bold`}>Cost</th>
                                                <th className={`p-3 border-y-2 text-black text-sm font-bold`}>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {data?.CheckInCheckOutFees.map((i, inx) =>
                                                <tr key={inx} className="border-[#e8e8e8]">
                                                    <td className={`p-3 ${inx === 0 ? "border-b" : "border-y"} text-sm not-italic font-medium text-black`}>{LATE_IN_EARLY_OUT_FEES[i.type] || ""}</td>
                                                    <td className={`p-3 ${inx === 0 ? "border-b" : "border-y"} text-sm not-italic font-medium text-black`}>{i.from}</td>
                                                    <td className={`p-3 ${inx === 0 ? "border-b" : "border-y"} text-sm not-italic font-medium text-black`}>{i.to}</td>
                                                    <td className={`p-3 ${inx === 0 ? "border-b" : "border-y"} text-sm not-italic font-medium text-black`}>{i.cost}</td>
                                                    <td className={`p-3 ${inx === 0 ? "border-b" : "border-y"} text-sm not-italic font-medium text-black`}>
                                                        <div className="flex items-center gap-2">

                                                            <div className="cursor-pointer" onClick={() => { handleRemoveFeeAndTax(inx) }}>
                                                                <CloseSvg width={12} height={12} className={`fill-primary-baseRed`} />
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>

                                ) : ""}
                                <div className="mt-4">
                                    {taxItem ? (
                                        <CheckInCheckoutFees data={data} handleTaxItems={handleTaxItems} setTaxItem={setTaxItem} />
                                    ) : (
                                        <CommonButton className={`bg-primary-baseRed font-Nunito text-white text-base font-bold px-4 py-2 h-10 cursor-pointer rounded-lg border transition flex items-center gap-2`} onClick={() => setTaxItem(true)}>Add Fee</CommonButton>
                                    )}
                                </div>
                            </Accordion>
                        </div>
                    </div>
                </div>

                <div className="w-full h-auto mt-4 flex justify-center ">
                    <button className="bg-[#828282] text-[#FFFFFF]  w-1/4 py-2 px-4 rounded text-base border-none " onClick={handleSubmit}>
                        Save & Next
                    </button>
                </div>
            </div>
        </>
    );
}

export default CheckInCheckOut;