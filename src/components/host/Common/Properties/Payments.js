import React, { useState } from "react";
import CommonButton from "../Buttons/CommonButton";
import PlusSvg from "../../utils/Images/PlusSvg";
import PaymentMethods from "./Payment/PaymentMethods";
import CloseSvg from "../../utils/Images/CloseSvg";
import Penalties from "./Payment/Penalties";
import TermsLinks from "./Payment/TermsLinks";
import LoaderSVG from "../../utils/Images/LoaderSVG";

function Payments({ onSave, data, setData, isSubmitDisabled, isLoading }) {
    const [paymentMethod, setPaymentMethod] = useState(false);
    const handlePaymentMethodItems = (paymentMethods) => {
        setData({ ...data, paymentMethods: [...data?.paymentMethods, paymentMethods] })
        setPaymentMethod(false)
    }
    const handleRemovePaymentMethod = (inx) => {
        const paymentMethods = data.paymentMethods;
        paymentMethods.splice(inx, 1);
        setData({ ...data, paymentMethods: paymentMethods });
    }


    const [penalty, setPenalty] = useState(false);
    const handlePenaltyItems = (penalties) => {
        setData({ ...data, penalties: [...data?.penalties, penalties] })
        setPaymentMethod(false)
    }
    const handleRemovePenalty = (inx) => {
        const penalties = data.penalties;
        penalties.splice(inx, 1);
        setData({ ...data, penalties: penalties });
    }


    const [termLinks, setTermLinks] = useState(false);
    const handleTermLinks = (TermsAndConditionsLinks) => {
        setData({ ...data, TermsAndConditionsLinks: [...data?.TermsAndConditionsLinks, TermsAndConditionsLinks] })
        setTermLinks(false)
    }
    const handleRemoveTermLink = (inx) => {
        const TermsAndConditionsLinks = data.TermsAndConditionsLinks;
        TermsAndConditionsLinks.splice(inx, 1);
        setData({ ...data, TermsAndConditionsLinks: TermsAndConditionsLinks });
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
                            Payment Method
                        </div>
                    </div>

                    <div className="mt-14">
                        <div className='font-Nunito text-primary-baseGray text-base font-medium mt-1'>
                            Payment
                        </div>
                        <div className="mt-7">

                            {data?.paymentMethods?.length ? (

                                <table className="table-auto w-full  rounded  border-separate border-spacing-y-2">
                                    <thead>
                                        <tr className="border-[#e8e8e8]">
                                            <th className={`p-3 border-y-2 text-black text-sm font-bold`}>Payment Method</th>
                                            <th className={`p-3 border-y-2 text-black text-sm font-bold`}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {data?.paymentMethods.map((i, inx) =>
                                            <tr key={inx} className="border-[#e8e8e8]">
                                                <td className={`p-3 ${inx === 0 ? "border-b" : "border-y"} text-sm not-italic font-medium text-black`}>{i.name}</td>
                                                <td className={`p-3 ${inx === 0 ? "border-b" : "border-y"} text-sm not-italic font-medium text-black`}>
                                                    <div className="flex items-center gap-2">

                                                        <div className="cursor-pointer" onClick={() => { handleRemovePaymentMethod(inx) }}>
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
                                {paymentMethod ? (
                                    <PaymentMethods data={data} handlePaymentMethodItems={handlePaymentMethodItems} setPaymentMethod={setPaymentMethod} />
                                ) : (
                                    <CommonButton className={`bg-primary-baseRed font-Nunito text-white text-base font-bold px-4 py-2 h-10 cursor-pointer rounded-lg border transition flex items-center gap-2`} onClick={() => setPaymentMethod(true)}>
                                        <PlusSvg fill={'fill-white'} width={16} height={16} /> <span>Add Payment Method</span>
                                    </CommonButton>
                                )}

                            </div>
                        </div>
                    </div>

                    <div className="mt-14">
                        <div className='font-Nunito text-primary-baseGray text-base font-medium mt-1'>
                            Cancellation Policy
                        </div>

                        <div className="mt-7">

                            {data?.penalties?.length ? (

                                <table className="table-auto w-full  rounded  border-separate border-spacing-y-2">
                                    <thead>
                                        <tr className="border-[#e8e8e8]">
                                            <th className={`p-3 border-y-2 text-black text-sm font-bold`}>From</th>
                                            <th className={`p-3 border-y-2 text-black text-sm font-bold`}>To</th>
                                            <th className={`p-3 border-y-2 text-black text-sm font-bold`}>Charge(%)</th>
                                            <th className={`p-3 border-y-2 text-black text-sm font-bold`}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {data?.penalties.map((i, inx) =>
                                            <tr key={inx} className="border-[#e8e8e8]">
                                                <td className={`p-3 ${inx === 0 ? "border-b" : "border-y"} text-sm not-italic font-medium text-black`}>{i.from}</td>
                                                <td className={`p-3 ${inx === 0 ? "border-b" : "border-y"} text-sm not-italic font-medium text-black`}>{i.to}</td>
                                                <td className={`p-3 ${inx === 0 ? "border-b" : "border-y"} text-sm not-italic font-medium text-black`}>{i.charge}</td>
                                                <td className={`p-3 ${inx === 0 ? "border-b" : "border-y"} text-sm not-italic font-medium text-black`}>
                                                    <div className="flex items-center gap-2">

                                                        <div className="cursor-pointer" onClick={() => { handleRemovePenalty(inx) }}>
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
                                {penalty ? (
                                    <Penalties data={data} handlePenaltyItems={handlePenaltyItems} setPenalty={setPenalty} />
                                ) : (
                                    <CommonButton className={`bg-primary-baseRed font-Nunito text-white text-base font-bold px-4 py-2 h-10 cursor-pointer rounded-lg border transition flex items-center gap-2`} onClick={() => setPenalty(true)}>
                                        <PlusSvg fill={'fill-white'} width={16} height={16} /> <span>Add Penalty</span>
                                    </CommonButton>

                                )}

                            </div>
                        </div>
                    </div>

                    <div className="mt-14">
                        <div className='font-Nunito text-primary-baseGray text-base font-medium mt-1'>
                            Terms and Conditions links
                        </div>

                        <div className="mt-7">

                            {data?.TermsAndConditionsLinks?.length ? (

                                <table className="table-auto w-full  rounded  border-separate border-spacing-y-2">
                                    <thead>
                                        <tr className="border-[#e8e8e8]">
                                            <th className={`p-3 border-y-2 text-black text-sm font-bold`}>Link</th>
                                            <th className={`p-3 border-y-2 text-black text-sm font-bold`}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {data?.TermsAndConditionsLinks.map((i, inx) =>
                                            <tr key={inx} className="border-[#e8e8e8]">
                                                <td className={`p-3 ${inx === 0 ? "border-b" : "border-y"} text-sm not-italic font-medium text-black`}>{i.link}</td>
                                                <td className={`p-3 ${inx === 0 ? "border-b" : "border-y"} text-sm not-italic font-medium text-black`}>
                                                    <div className="flex items-center gap-2">

                                                        <div className="cursor-pointer" onClick={() => { handleRemoveTermLink(inx) }}>
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
                                {termLinks ? (
                                    <TermsLinks data={data} handleTermLinks={handleTermLinks} setTermLinks={setTermLinks} />
                                ) : (
                                    <CommonButton className={`bg-primary-baseRed font-Nunito text-white text-base font-bold px-4 py-2 h-10 cursor-pointer rounded-lg border transition flex items-center gap-2`} onClick={() => setTermLinks(true)}>
                                        <PlusSvg fill={'fill-white'} width={16} height={16} /> <span>Add Terms and Conditions links</span>
                                    </CommonButton>
                                )}

                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full h-auto mt-4 flex justify-center ">
                    {/* <button className="bg-[#828282] text-[#FFFFFF]  w-1/4 py-2 px-4 rounded text-base border-none " onClick={handleSubmit}>
                        Save
                    </button> */}

                    <CommonButton
                        className="bg-[#828282] text-[#FFFFFF] w-1/4 py-2 px-4 rounded text-base border-none"
                        disabled={isSubmitDisabled}
                        onClick={handleSubmit}
                    >
                        {isLoading ? (
                            <>
                                <LoaderSVG />
                                <span>Saving...</span>
                            </>
                        ) : "Save"}
                    </CommonButton>
                </div>
            </div>
        </>
    );
}

export default Payments;