import React, { useState } from "react";
import InputWithLabel from "../Inputs/InputWithLabel";
import CustomSelect from "../Dropdown/CustomSelect";
import { FEE_AND_TAX, FEE_AND_TAX_CALCULATION_TYPES, COLLECTIVE_TYPES, LATE_IN_EARLY_OUT_FEES } from "../../utils/constants/constants";
import CommonButton from "../Buttons/CommonButton";
import CloseSvg from "../../utils/Images/CloseSvg";
import { useEffect } from "react";
import ErrorBlock from "../ErrorBlock";
import { successtoast, errortoast } from "@/components/host/Common/Toastify";
import CheckNumberOnlyFunction from "../Functions/CheckNumberOnlyFunction";
import IncrementDecrementInput from "../Inputs/IncrementDecrementInput";

function CheckInCheckoutFees({ data, handleTaxItems, setTaxItem }) {

    const [feeItem, setFeeItem] = useState({
        type: "",
        from: "",
        to: "",
        cost: "",
    });



    const [extra_charge_types, set_extra_charge_types] = useState([]);

    const handleSelect = (field_name, value) => {

        setFeeItem({ ...feeItem, [field_name]: value })
    }

    useEffect(() => {
        set_extra_charge_types((feeItem?.type ? FEE_AND_TAX[feeItem?.type] : []));
        setFeeItem({ ...feeItem, extra_charge_type: "" });
    }, [feeItem?.type]);

    useEffect(() => {
        setFeeItem({ ...feeItem, name: feeItem?.extra_charge_type });
    }, [feeItem?.extra_charge_type]);

    const handleChange = (e) => {

        if (e.target.name == 'cost') {
            if (CheckNumberOnlyFunction(e.target.value))
                setFeeItem({ ...feeItem, [e.target.name]: e.target.value })
            return
        }

        setFeeItem({ ...feeItem, [e.target.name]: e.target.value })
    }

    const [errorFieldsFeeItems, setErrorFieldsFeeItems] = useState({
        type: "",
        from: "",
        to: "",
        cost: "",
    });


    const saveTaxItem = () => {

        let isValid = true;
        let typeError = null;
        let fromError = null;
        let toError = null;
        let costError = null;

        if (!feeItem?.type.toString().length)
            typeError = "Please select kind";

        if (!feeItem?.from.length)
            fromError = "Please enter from time";

        if (!feeItem?.to.length)
            toError = "Please enter to time";

        if (!feeItem?.cost.length)
            costError = "Please enter cost";


        if (typeError || fromError || toError || costError) {
            isValid = false;
        }

        setErrorFieldsFeeItems({
            ...errorFieldsFeeItems,
            type: typeError,
            from: fromError,
            to: toError,
            cost: costError,
        });

        if (!isValid) {
            errortoast({ message: "Please fill all the required fields" });
            return false;
        }

        handleTaxItems(feeItem);
        setFeeItem({
            type: "",
            from: "",
            to: "",
            cost: "",
        });
    }

    console.log("feeItem: ", feeItem)
    return (
        <>
            <div>
                <div className="border p-4 rounded relative">
                    <div className="flex items-center gap-3">
                        <div>
                            <CustomSelect
                                label="Fee Type"
                                defaultValue={feeItem?.type}
                                placeholder={'Please Select'}
                                optionalFunction={(e) => { handleSelect('type', e.id) }}
                                listItem={Object.entries(LATE_IN_EARLY_OUT_FEES).map(([key, value]) => { return { id: key, name: value } })}
                            />
                            {errorFieldsFeeItems?.type && <ErrorBlock>{errorFieldsFeeItems?.type}</ErrorBlock>}
                        </div>
                        <div cl>
                            <IncrementDecrementInput label={"From"} defaultValue={"00:00"} name={'from'} handleCounter={handleSelect} type={'time'} step={30} />
                            {errorFieldsFeeItems?.from && <ErrorBlock>{errorFieldsFeeItems?.from}</ErrorBlock>}
                        </div>
                        <div>
                            <IncrementDecrementInput label={"To"} defaultValue={"00:00"} name={'to'} handleCounter={handleSelect} type={'time'} step={30} />
                            {errorFieldsFeeItems?.to && <ErrorBlock>{errorFieldsFeeItems?.to}</ErrorBlock>}
                        </div>
                        <div>
                            <InputWithLabel label={'Cost'} value={feeItem?.cost} name={'cost'} placeholder={"0.00"} setValue={handleChange} />
                            {errorFieldsFeeItems?.cost && <ErrorBlock>{errorFieldsFeeItems?.cost}</ErrorBlock>}
                        </div>
                        <div className="mt-4">
                            <CommonButton className={`bg-primary-baseGray font-Nunito text-white text-base font-bold px-4 py-2 h-10 cursor-pointer rounded-lg border transition flex items-center `} onClick={() => saveTaxItem(true)}>Add</CommonButton>
                        </div>

                    </div>


                    <CommonButton className={`bg-white font-Nunito text-primary-baseRed text-sm font-bold px-2 py-1  cursor-pointer rounded-lg border transition flex items-center gap-2 absolute top-2 right-2`} onClick={() => setTaxItem(false)}><CloseSvg width={12} height={12} className={'fill-primary-baseRed'} /><span>Close</span></CommonButton>
                </div>
            </div>

        </>

    )
}
export default CheckInCheckoutFees;