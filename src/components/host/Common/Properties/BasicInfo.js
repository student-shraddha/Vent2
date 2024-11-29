import React, { useEffect, useState } from "react";
import CustomSelect from "@/components/host/Common/Dropdown/CustomSelect";

import { PROPERTY_TYPES, PROPERTY_FLOORS } from "@/components/host/utils/constants/constants";
import InputWithLabel from "../Inputs/InputWithLabel";
import DescriptionBox from "../Inputs/DescriptionBox";
import CustomGoogleMap from "../CustomGoogleMap";
import IncrementDecrementInput from "../Inputs/IncrementDecrementInput";
import CheckNumberOnlyFunction from "../Functions/CheckNumberOnlyFunction";
import CheckBox from "../../utils/Inputs/CheckBox";
import { successtoast, errortoast } from "@/components/host/Common/Toastify";
import ErrorBlock from "../ErrorBlock";

function BasicInfo({ onSave, data, setData }) {

  const [errorFields, setErrorFields] = useState({
    name: null,
    property_type: null,
    accomodation: null,
    address: null,
    // floor: "",
    // area_in_sqr_mt: "",
    // area_in_sqr_feet: "",
    // license_no: "",
    // latitude: "",
    // longitude: "",
    // has_license: false,
    // city:"",
    // state:"",
    // country:""
  });
  const handleChange = (e) => {

    const { name, checked } = event.target;

    if (name === 'has_license') {
      setData({ ...data, [name]: checked })
      return;
    }

    if (e.target.name === 'name') {
      if (e.target.value.length > 150)
        return;
    }

    if (e.target.name == 'area_in_sqr_mt' || e.target.name == 'area_in_sqr_feet') {
      if (CheckNumberOnlyFunction(e.target.value))
        setData({ ...data, [e.target.name]: e.target.value })
      return
    }

    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSelect = (field_name, value) => {

    setData({ ...data, [field_name]: value })
  }

  const handleSubmit = () => {

    let isValid = true;
    let nameError = null;
    let propertyTypeError = null;
    let accomodationError = null;
    let addressError = null;

    if (!data?.name.length)
      nameError = "Please enter property name";

    if (!data?.property_type.length)
      propertyTypeError = "Please select property type";

    if (data?.accomodation < 1)
      accomodationError = "Please enter max sleep people";

    if (!data?.address.length)
      addressError = "Please place pin at property location";

    if (nameError || propertyTypeError || accomodationError || addressError) {
      isValid = false;
    }


    setErrorFields({
      ...errorFields,
      name: nameError,
      property_type: propertyTypeError,
      accomodation: accomodationError,
      address: addressError,
    });

    if (!isValid) {
      errortoast({ message: "Please fill all the required fields" });
      return false;
    }
    // After validation done, can submit step
    onSave();
  }

  return (
    <>
      <div className="w-full h-auto flex flex-col mt-[20px] p-3">
        {/* ------------------------------        STEP-1 -> PROPERTY NAME     ------------------------  */}
        <div className="Proper_Name">

          <div className="mt-6">
            <DescriptionBox label={"Property Name*"} placeholder={'Enter'} helpText={`Give your Property a name. 70 characters is ideal. ${data?.name && data?.name.length || 0} /150`} value={data?.name} name={'name'} setValue={handleChange} />
            {errorFields?.name && <ErrorBlock>{errorFields?.name}</ErrorBlock>}
          </div>
        </div>

        {/* ------------------------------        STEP-1 -> PROPERTY Type     ------------------------  */}
        <div className="mt-6">
          <div>
            <div className="font-Nunito text-black font-bold text-xl">
              Property Type*
            </div>
          </div>

          <div className="mt-6 flex justify-between">

            {/* ------------------------------        STEP-1 -> PROPERTY Type -> Its DROPDOWN     ------------------------  */}
            <div className="w-1/2">
              <div className="relative w-50 mt-2 ">
                <CustomSelect
                  defaultValue={data?.property_type}
                  label={`It's*`}
                  name={'property_type'}
                  placeholder={'Please Select'}
                  optionalFunction={(e) => { handleSelect('property_type', e.id) }}
                  listItem={Object.entries(PROPERTY_TYPES).map(([key, value]) => { return { id: key, name: value } })}
                />
                {errorFields?.property_type && <ErrorBlock>{errorFields?.property_type}</ErrorBlock>}
              </div>
            </div>

            {/* ------------------------------        STEP-1 -> PROPERTY Type ->   & it sleeps,People INCREASE DECRESE BUTTONS    ------------------------  */}
            <div className="w-1/2">
              <div className="font-Nunito text-primary-baseGray text-base font-medium mt-1">
                & it sleeps, max people*
              </div>

              <IncrementDecrementInput name={'accomodation'} handleCounter={handleSelect} defaultValue={data?.accomodation || 0} />
              {errorFields?.accomodation && <ErrorBlock>{errorFields?.accomodation}</ErrorBlock>}

            </div>
          </div>

          <div className="mt-6 flex justify-between">
            {/* ------------------------------        STEP-1 -> PROPERTY Type -> Its DROPDOWN     ------------------------  */}

            <div className="w-1/2">
              <div className="relative w-50 mt-2 ">
                <CustomSelect
                  defaultValue={data?.floor}
                  label={`It's on floor number`}
                  placeholder={'Please Select'}
                  name={'floor'}
                  optionalFunction={(e) => { handleSelect('floor', e.id) }}
                  listItem={PROPERTY_FLOORS}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-between items-center gap-3">

            <div className="w-1/2">
              <InputWithLabel label={`It's total size is`} placeholder={'M²'} name={"area_in_sqr_mt"} value={data?.area_in_sqr_mt} setValue={handleChange} />
            </div>
            <div className="pr-4">OR</div>
            <div className="w-1/2">
              <InputWithLabel label={`It's total size is`} placeholder={'sqf'} name={"area_in_sqr_feet"} value={data?.area_in_sqr_feet} setValue={handleChange} />
            </div>
          </div>

        </div>
        {/* ------------------------------        STEP-1 -> PROPERTY Type -> LOCATION     ------------------------  */}
        <div className="mt-6">

          <div>
            <div className="font-Nunito text-black font-bold text-xl">
              Location*
            </div>
            <div className="font-Nunito text-primary-baseGray text-base font-medium">
              Please drop pin at your property address
            </div>
          </div>

          <div className="mt-4">
            <CustomGoogleMap data={data} isSingleLocation={true} isAddress={true} isMarker={true} setGoogleAddressObj={(geoData) => {
              setData({
                ...data,
                address: geoData?.completeAddress[0]?.formatted_address,
                latitude: geoData.lat,
                longitude: geoData.lng,
                country:
                  geoData?.completeAddress[0]?.address_components.filter(
                    (data) => data.types[0] === "country"
                  )[0]?.long_name || "",
                state:
                  geoData?.completeAddress[0]?.address_components.filter(
                    (data) => data.types[0] === "administrative_area_level_1"
                  )[0]?.long_name || "",
                city:
                  geoData?.completeAddress[0]?.address_components.filter(
                    (data) => data.types.includes('locality')
                  )[0]?.long_name || "",
              })
            }} />
            {errorFields?.address && <ErrorBlock>{errorFields?.address}</ErrorBlock>}
          </div>
        </div>
        {/* ------------------------------        STEP-1 -> PROPERTY Type -> LEGAL INFORMATION     ------------------------  */}

        <div className="mt-6  flex justify-center">
          <div className="w-[95%] mt-3">
            <div>
              <div className="font-Nunito text-black font-bold text-base">
                Legal Information
              </div>
              <div className="font-Nunito text-primary-baseGray text-base font-medium pt-2">
                Some cities require properties to be registered before they can
                be offered for rent. In case this property is in such a
                location, please add all of the required information below -
                Ventify will then send it to the various sales channels.
                Read on to see how to use this section
                <br /> <p className="text-primary-baseRed font-medium">See more.</p>
              </div>
              <div className="relative w-3/5 mt-4 ">

                <InputWithLabel label={`Enter License Number`} placeholder={'Enter License Number'} name={"license_no"} value={data?.license_no} setValue={handleChange} />
              </div>
              {/* ------------------------------        STEP-1 -> PROPERTY Type -> LEGAL INFORMATION -> LICENCE NUMBER INPUT     ------------------------  */}



              <div className=" w-full mt-4 ">
                <CheckBox label={"This property does not have a license number"} id={"legalInformationCheckbox"} name={'has_license'} checked={data?.has_license} onChange={handleChange} />
              </div>

              {/* ------------------------------        STEP-1 -> PROPERTY Type -> LEGAL INFORMATION -> LICENCE NUMBER INPUT     ------------------------  */}
              {/* <div className="w-53 h-11 pt-4">
                <button className="bg-gradient-to-r from-[#9E7B74] to-[#FE6C69] text-white py-2 px-4 rounded text-base border-none ">
                  +&nbsp;Add Legal Information
                </button>
              </div> */}
            </div>

            <div className="w-full h-auto mt-5 flex justify-center ">
              <button className="bg-[#828282] text-[#FFFFFF]  w-1/4 h-[3.125rem] py-2 px-4 rounded text-base border-none" onClick={handleSubmit}>
                Save & Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BasicInfo;
