import React, { useState } from "react";
import InputWithLabel from "../Inputs/InputWithLabel";
import CommonButton from "../Buttons/CommonButton";
import CustomSelect from "../Dropdown/CustomSelect";
// import CalendarSVG from "../../utils/Images/CalendarSVG";
// import CheckBox from "../../utils/Inputs/CheckBox";
// import PlusSvg from "../../utils/Images/PlusSvg";
import { DOWN_PAYMENT_OPTIONS, SECURITY_DEPOSIT_OPTIONS } from "../../utils/constants/constants";
import AddTaxItems from "./AddTaxItems";
import CloseSvg from "../../utils/Images/CloseSvg";
import CheckNumberOnlyFunction from "../Functions/CheckNumberOnlyFunction";


function ChargeProfile({ data, setData }) {

    const handleSelect = (field_name, value) => {

        setData({ ...data, [field_name]: value })
    }

    const [taxItem, setTaxItem] = useState(false);

    const handleTaxItems = (fee_and_tax) => {
        setData({ ...data, fee_and_tax: [...data?.fee_and_tax, fee_and_tax] })
        setTaxItem(false)
    }


    const handleRemoveFeeAndTax = (inx) => {
        const fee_and_tax = data.fee_and_tax;
        fee_and_tax.splice(inx, 1);
        setData({ ...data, fee_and_tax: fee_and_tax });
    }

    const handleChange = (e) => {

        if (e.target.name == 'down_payments') {
            if (CheckNumberOnlyFunction(e.target.value))
                setData({ ...data, [e.target.name]: e.target.value })
            return
        }

        setData({ ...data, [e.target.name]: e.target.value })
    }

    return (
        <>

            <div className="w-full mt-4">
                <div>
                    <div className="text-sm font-normal">
                        <div className="text-black font-semibold">Fees & Taxes </div>
                        <div className="text-primary-baseGray font-medium mt-2">Specify what extra charges are to be paid by guests booking this property</div>
                    </div>
                    <div className="col-span-2 pt-4">

                        {data?.fee_and_tax?.length ? (

                            <table className="table-auto w-full  rounded  border-separate border-spacing-y-2">
                                <thead>
                                    <tr className="border-[#e8e8e8]">
                                        <th className={`p-3 border-y-2 text-black text-sm font-bold`}>Kind</th>
                                        <th className={`p-3 border-y-2 text-black text-sm font-bold`}>Type</th>
                                        <th className={`p-3 border-y-2 text-black text-sm font-bold`}>Name</th>
                                        <th className={`p-3 border-y-2 text-black text-sm font-bold`}>Calculation</th>
                                        <th className={`p-3 border-y-2 text-black text-sm font-bold`}>Value</th>
                                        <th className={`p-3 border-y-2 text-black text-sm font-bold`}>Collection</th>
                                        <th className={`p-3 border-y-2 text-black text-sm font-bold`}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {data?.fee_and_tax.map((i, inx) =>
                                        <tr key={inx} className="border-[#e8e8e8]">
                                            <td className={`p-3 ${inx === 0 ? "border-b" : "border-y"} text-sm not-italic font-medium text-black`}>{i.type}</td>
                                            <td className={`p-3 ${inx === 0 ? "border-b" : "border-y"} text-sm not-italic font-medium text-black`}>{i.extra_charge_type}</td>
                                            <td className={`p-3 ${inx === 0 ? "border-b" : "border-y"} text-sm not-italic font-medium text-black`}>{i.name}</td>
                                            <td className={`p-3 ${inx === 0 ? "border-b" : "border-y"} text-sm not-italic font-medium text-black`}>{i.calculation_type}</td>
                                            <td className={`p-3 ${inx === 0 ? "border-b" : "border-y"} text-sm not-italic font-medium text-black`}>{i.value}</td>
                                            <td className={`p-3 ${inx === 0 ? "border-b" : "border-y"} text-sm not-italic font-medium text-black`}>{i.collection_time}</td>
                                            <td className={`p-3 ${inx === 0 ? "border-b" : "border-y"} text-sm not-italic font-medium text-black`}>
                                                <div className="flex items-center gap-2">
                                                    {/* <div>
                            <EditSvg width={16} height={16} className={`fill-primary-baseGreen`} />
                        </div> */}
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
                                <AddTaxItems data={data} handleTaxItems={handleTaxItems} />
                            ) : (
                                <CommonButton className={`bg-primary-baseRed font-Nunito text-white text-base font-bold px-4 py-2 h-10 cursor-pointer rounded-lg border transition flex items-center gap-2`} onClick={() => setTaxItem(true)}>Add line item</CommonButton>
                            )}
                        </div>

                    </div>
                </div>
                <div className="w-full mt-4">
                    <div className="text-sm font-normal">
                        <div className="text-black font-semibold">Down Payment</div>
                        <div className="mt-4 grid grid-cols-3 items-center gap-3">
                            <div className="col-span-1">Down payment calculation type</div>
                            <div className="col-span-1">
                                <CustomSelect
                                    defaultValue={data?.down_payments_type}
                                    placeholder={'No prepayment'}
                                    optionalFunction={(e) => { handleSelect('down_payments_type', e.id) }}
                                    listItem={DOWN_PAYMENT_OPTIONS}
                                />
                            </div>
                        </div>
                        <div className="mt-4 grid grid-cols-3 items-center gap-3">
                            <div className="col-span-1">Amount USD</div>
                            <div className="col-span-1">
                                <InputWithLabel placeholder={'0.00'} name={'down_payments'} value={data?.down_payments} setValue={handleChange} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full mt-4">
                    <div className="text-sm font-normal">
                        <div className="text-black font-semibold">Security Deposit</div>
                        <div className="mt-4 grid grid-cols-3 items-center gap-3">
                            <div className="col-span-1">Security deposit calculation type</div>
                            <div className="col-span-1">
                                <CustomSelect
                                    defaultValue={data?.security_deposit_type}
                                    placeholder={'No Deposit'}
                                    optionalFunction={(e) => { handleSelect('security_deposit_type', e.id) }}
                                    listItem={SECURITY_DEPOSIT_OPTIONS}
                                />
                            </div>
                        </div>
                        <div className="mt-4 grid grid-cols-3 items-center gap-3">
                            <div className="col-span-1">Amount USD</div>
                            <div className="col-span-1">
                                <InputWithLabel placeholder={'0.00'} name={'security_deposit'} value={data?.security_deposit} setValue={handleChange} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChargeProfile;