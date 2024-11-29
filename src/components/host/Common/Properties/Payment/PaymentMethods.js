import React, { useState } from "react";
import InputWithLabel from "../../Inputs/InputWithLabel";
import CommonButton from "../../Buttons/CommonButton";
import CloseSvg from "../../../utils/Images/CloseSvg";
import ErrorBlock from "../../ErrorBlock";
import { successtoast, errortoast } from "@/components/host/Common/Toastify";

function PaymentMethods({ data, handlePaymentMethodItems, setPaymentMethod }) {

    const [paymentMethodItem, setPaymentMethodItem] = useState({
        name: "",
    });

    const handleChange = (e) => {
        setPaymentMethodItem({ ...paymentMethodItem, [e.target.name]: e.target.value })
    }

    const [errorFieldsPaymentMethodItem, setErrorFieldsPaymentMethodItem] = useState({
        name: "",
    });


    const saveTaxItem = () => {

        let isValid = true;
        let nameError = null;

        if (!paymentMethodItem?.name.length)
            nameError = "Please enter name";

        if (nameError) {
            isValid = false;
        }

        setErrorFieldsPaymentMethodItem({
            ...errorFieldsPaymentMethodItem,
            name: nameError,
        });

        if (!isValid) {
            errortoast({ message: "Please fill all the required fields" });
            return false;
        }

        handlePaymentMethodItems(paymentMethodItem);
        setPaymentMethodItem({
            name: "",
        });
    }

    return (
        <>
            <div>
                <div className="border p-4 rounded relative">
                    <div className="flex gap-3">

                        <div className="w-1/3">
                            <InputWithLabel label={'Payment Method'} value={paymentMethodItem?.name} name={'name'} setValue={handleChange} />
                            {errorFieldsPaymentMethodItem?.name && <ErrorBlock>{errorFieldsPaymentMethodItem?.name}</ErrorBlock>}
                        </div>
                        <div className="mt-4">
                            <CommonButton className={`bg-primary-baseGray font-Nunito text-white text-base font-bold px-4 py-2 h-10 cursor-pointer rounded-lg border transition flex items-center `} onClick={() => saveTaxItem(true)}>Add</CommonButton>
                        </div>
                    </div>

                    <CommonButton className={`bg-white font-Nunito text-primary-baseRed text-sm font-bold px-2 py-1  cursor-pointer rounded-lg border transition flex items-center gap-2 absolute top-2 right-2`} onClick={() => setPaymentMethod(false)}><CloseSvg width={12} height={12} className={'fill-primary-baseRed'} /><span>Close</span></CommonButton>
                </div>
            </div>

        </>

    )
}
export default PaymentMethods;