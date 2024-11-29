import React, { useState } from "react";
import InputWithLabel from "../Inputs/InputWithLabel";
import CustomSelect from "../Dropdown/CustomSelect";
import { FEE_AND_TAX, FEE_AND_TAX_CALCULATION_TYPES, COLLECTIVE_TYPES } from "../../utils/constants/constants";
import CommonButton from "../Buttons/CommonButton";
import CloseSvg from "../../utils/Images/CloseSvg";
import { useEffect } from "react";
import ErrorBlock from "../ErrorBlock";
import { successtoast, errortoast } from "@/components/host/Common/Toastify";
import CheckNumberOnlyFunction from "../Functions/CheckNumberOnlyFunction";

function AddTaxItems({ data, handleTaxItems }) {

    const [feeItem, setFeeItem] = useState({
        type: "",
        extra_charge_type: "",
        name: "",
        calculation_type: "",
        value: "",
        collection_time: ""
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

        if (e.target.name == 'value') {
            if (CheckNumberOnlyFunction(e.target.value))
                setFeeItem({ ...feeItem, [e.target.name]: e.target.value })
            return
        }

        setFeeItem({ ...feeItem, [e.target.name]: e.target.value })
    }

    const [errorFieldsFeeItems, setErrorFieldsFeeItems] = useState({
        type: "",
        extra_charge_type: "",
        name: "",
        calculation_type: "",
        value: "",
        collection_time: ""
    });


    const saveTaxItem = () => {

        let isValid = true;
        let typeError = null;
        let extraChargeTypeError = null;
        let nameError = null;
        let calculationTypeError = null;
        let valueError = null;
        let collectionTimeError = null;

        if (!feeItem?.type.length)
            typeError = "Please select kind";

        if (!feeItem?.extra_charge_type.length)
            extraChargeTypeError = "Please select extra charge type";

        if (!feeItem?.name.length)
            nameError = "Please enter name";

        if (!feeItem?.calculation_type.length)
            calculationTypeError = "Please select calculation type";

        if (!feeItem?.value.length)
            valueError = "Please enter value for calculation type";

        if (!feeItem?.collection_time.length)
            collectionTimeError = "Please select collection time";


        if (typeError || extraChargeTypeError || nameError || calculationTypeError || valueError || collectionTimeError) {
            isValid = false;
        }

        setErrorFieldsFeeItems({
            ...errorFieldsFeeItems,
            type: typeError,
            extra_charge_type: extraChargeTypeError,
            name: nameError,
            calculation_type: calculationTypeError,
            value: valueError,
            collection_time: collectionTimeError
        });

        if (!isValid) {
            errortoast({ message: "Please fill all the required fields" });
            return false;
        }

        handleTaxItems(feeItem);
        setFeeItem({
            type: "",
            extra_charge_type: "",
            name: "",
            calculation_type: "",
            value: "",
            collection_time: ""
        });
    }

    return (
        <>
            <div>
                <div className="border p-4 rounded relative">
                    <div className="flex gap-3">
                        <div>
                            <CustomSelect
                                label="Kind"
                                defaultValue={feeItem?.type}
                                placeholder={'Please Select'}
                                optionalFunction={(e) => { handleSelect('type', e.id) }}
                                listItem={Object.entries(FEE_AND_TAX).map(([key, value]) => { return { id: key, name: key } })}
                            />
                            {errorFieldsFeeItems?.type && <ErrorBlock>{errorFieldsFeeItems?.type}</ErrorBlock>}
                        </div>
                        <div>
                            <CustomSelect
                                label="Extra charge type"
                                defaultValue={feeItem?.extra_charge_type}
                                placeholder={'Please Select'}
                                optionalFunction={(e) => { handleSelect('extra_charge_type', e.id) }}
                                listItem={Object.entries(extra_charge_types).map(([key, value]) => { return { id: key, name: key } })}
                            />
                            {errorFieldsFeeItems?.extra_charge_type && <ErrorBlock>{errorFieldsFeeItems?.extra_charge_type}</ErrorBlock>}
                        </div>
                        <div>
                            <InputWithLabel label={'Name'} value={feeItem?.name} name={'name'} setValue={handleChange} />
                            {errorFieldsFeeItems?.name && <ErrorBlock>{errorFieldsFeeItems?.name}</ErrorBlock>}
                        </div>
                    </div>

                    <div className="flex gap-3 w-2/3 mt-3">
                        <div>
                            <CustomSelect
                                label="Calculation type"
                                defaultValue={feeItem?.calculation_type}
                                placeholder={'Please Select'}
                                optionalFunction={(e) => { handleSelect('calculation_type', e.id) }}
                                listItem={FEE_AND_TAX_CALCULATION_TYPES}
                            />
                            {errorFieldsFeeItems?.calculation_type && <ErrorBlock>{errorFieldsFeeItems?.calculation_type}</ErrorBlock>}
                        </div>
                        <div>
                            <InputWithLabel label={'Value'} value={feeItem?.value} name={'value'} setValue={handleChange} />
                            {errorFieldsFeeItems?.value && <ErrorBlock>{errorFieldsFeeItems?.value}</ErrorBlock>}
                        </div>
                    </div>

                    <div className="flex gap-3 w-1/3 mt-3">
                        <div>
                            <CustomSelect
                                label="Collection time"
                                defaultValue={feeItem?.collection_time}
                                placeholder={'Please Select'}
                                optionalFunction={(e) => { handleSelect('collection_time', e.id) }}
                                listItem={COLLECTIVE_TYPES}

                            />
                            {errorFieldsFeeItems?.collection_time && <ErrorBlock>{errorFieldsFeeItems?.collection_time}</ErrorBlock>}
                        </div>
                    </div>

                    <CommonButton className={`bg-primary-baseGray font-Nunito text-white text-base font-bold px-4 py-2 h-10 cursor-pointer rounded-lg border transition flex items-center gap-2 absolute bottom-4 right-4`} onClick={() => saveTaxItem(true)}>Add</CommonButton>

                    <CommonButton className={`bg-white font-Nunito text-primary-baseRed text-sm font-bold px-2 py-1  cursor-pointer rounded-lg border transition flex items-center gap-2 absolute top-2 right-2`} onClick={() => setTaxItem(true)}><CloseSvg width={12} height={12} className={'fill-primary-baseRed'} /><span>Close</span></CommonButton>
                </div>
            </div>

        </>

    )
}
export default AddTaxItems;