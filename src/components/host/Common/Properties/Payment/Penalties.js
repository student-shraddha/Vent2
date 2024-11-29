import React, { useState } from "react";
import InputWithLabel from "../../Inputs/InputWithLabel";
import CommonButton from "../../Buttons/CommonButton";
import CloseSvg from "../../../utils/Images/CloseSvg";
import ErrorBlock from "../../ErrorBlock";
import { successtoast, errortoast } from "@/components/host/Common/Toastify";

function Penalties({ data, handlePenaltyItems, setPenalty }) {

    const [penaltyItem, setPenaltyItem] = useState({
        from: "",
        to: "",
        charge: "",
    });

    const handleChange = (e) => {
        setPenaltyItem({ ...penaltyItem, [e.target.name]: e.target.value })
    }

    const [errorFieldsPenaltyItem, setErrorFieldsPenaltyItem] = useState({
        from: "",
        to: "",
        charge: "",
    });


    const saveTaxItem = () => {

        let isValid = true;
        let fromError = null;
        let toError = null;
        let chargeError = null;

        console.log("penaltyItem", penaltyItem)

        if (!penaltyItem?.from.toString().length)
            fromError = "Please enter from days";

        if (!penaltyItem?.to.toString().length)
            toError = "Please enter to days";

        if (!penaltyItem?.charge.toString().length)
            chargeError = "Please enter charge percentage";

        if (fromError || toError || chargeError) {
            isValid = false;
        }

        setErrorFieldsPenaltyItem({
            ...errorFieldsPenaltyItem,
            from: fromError,
            to: toError,
            charge: chargeError,
        });

        if (!isValid) {
            errortoast({ message: "Please fill all the required fields" });
            return false;
        }

        handlePenaltyItems(penaltyItem);
        setPenaltyItem({
            from: "",
            to: "",
            charge: "",
        });
    }

    return (
        <>
            <div>
                <div className="border p-4 rounded relative">
                    <div className="flex items-center justify-between gap-3">

                        <div className="w-14">
                            <InputWithLabel label={'From'} value={penaltyItem?.from} name={'from'} setValue={handleChange} />
                            {errorFieldsPenaltyItem?.from && <ErrorBlock>{errorFieldsPenaltyItem?.from}</ErrorBlock>}
                        </div>
                        <div className="mt-4">days</div>
                        <div className="w-14">
                            <InputWithLabel label={'To'} value={penaltyItem?.to} name={'to'} setValue={handleChange} />
                            {errorFieldsPenaltyItem?.to && <ErrorBlock>{errorFieldsPenaltyItem?.to}</ErrorBlock>}
                        </div>
                        <div className="mt-4">days before arrival charge</div>
                        <div className="w-24">
                            <InputWithLabel label={'Charge (%)'} value={penaltyItem?.charge} name={'charge'} setValue={handleChange} />
                            {errorFieldsPenaltyItem?.charge && <ErrorBlock>{errorFieldsPenaltyItem?.charge}</ErrorBlock>}
                        </div>
                        <div className="mt-4">of total booking amount</div>
                        <div className="mt-4">
                            <CommonButton className={`bg-primary-baseGray font-Nunito text-white text-base font-bold px-4 py-2 h-10 cursor-pointer rounded-lg border transition flex items-center `} onClick={() => saveTaxItem(true)}>Save</CommonButton>
                        </div>
                    </div>

                    <CommonButton className={`bg-white font-Nunito text-primary-baseRed text-sm font-bold px-2 py-1  cursor-pointer rounded-lg border transition flex items-center gap-2 absolute top-2 right-2`} onClick={() => setPenalty(false)}><CloseSvg width={12} height={12} className={'fill-primary-baseRed'} /><span>Close</span></CommonButton>
                </div>
            </div>

        </>

    )
}
export default Penalties;