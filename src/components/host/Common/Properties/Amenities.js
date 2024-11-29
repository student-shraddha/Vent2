import React, { useState } from "react";
import CheckBox from "@/components/host/utils/Inputs/CheckBox";
import Image from "next/image";
import IncrementDecrementInput from "../Inputs/IncrementDecrementInput";
import { AMENITIES } from "@/components/host/utils/constants/constants";
import ErrorBlock from "../ErrorBlock";
import { successtoast, errortoast } from "@/components/host/Common/Toastify";

function Amenities({ onSave, data, setData }) {

  const [errorFields, setErrorFields] = useState({

    bedrooms: "",
    bathrooms: "",
    toilets: "",
    amenities: ""

    // rooms: "", remain
    // beds: "", remain
    // is_separate_kitchen:""
  });

  const handleChange = (e) => {

    const { name, checked, value } = event.target;

    if (name === 'is_separate_kitchen') {
      setData({ ...data, [name]: checked })
      return;
    }

    if (name === 'amenities') {

      const current_amenities = data?.amenities || [];
      if (checked) {
        current_amenities.push(value)
      } else {
        const inx = current_amenities.findIndex((i) => i === value);
        if (inx !== -1)
          current_amenities.splice(inx, 1);
      }
      setData({ ...data, [name]: current_amenities })
      return;
    }
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSelect = (field_name, value) => {

    setData({ ...data, [field_name]: value })
  }

  const handleSubmit = () => {

    let isValid = true;
    let bedroomsError = null;
    let bathroomsError = null;
    let toiletsError = null;
    let amenitiesError = null;

    if (data?.bedrooms < 0)
      bedroomsError = "Please enter number of bedrooms";

    if (data?.bathrooms < 1)
      bathroomsError = "Please enter number of bathrooms";

    if (data?.toilets < 0)
      toiletsError = "Please enter number of toilets";

    if (!data?.amenities.length)
      amenitiesError = "Please select at least one amenity";

    if (bedroomsError || bathroomsError || toiletsError || amenitiesError) {
      isValid = false;
    }

    // console.log("bedroomsError", bedroomsError)


    setErrorFields({
      ...errorFields,
      bedrooms: bedroomsError,
      bathrooms: bathroomsError,
      toilets: toiletsError,
      amenities: amenitiesError
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

      <div className="w-full h-auto flex flex-col mt-[20px] items-center justify-start px-2.5 ">
        {/* ------------------------------        STEP-2 -> COMPOSITION     ------------------------  */}
        <div className="w-full h-auto max-h-10vh overflow-hidden">
          <div>
            <div className="font-Nunito text-black font-semibold text-xl">
              Composition
            </div>
          </div>


          {/* -----------NO OF BEDS & TOILET SELECTION & BATH TUBS */}
          <div className="flex flex-wrap justify-between mt-2 overflow-hidden ">
            {/* -----------NO OF BEDS  */}
            <div className="w-1/4 h-[auto] border-4 overflow-hidden ">
              <div className="flex justify-center">
                <Image src="/images/vector/bed_icon.svg" width={36} height={36} alt={'beds'} />
              </div>
              <div className="flex justify-center">
                <IncrementDecrementInput name={"bedrooms"} handleCounter={handleSelect} defaultValue={data?.bedrooms || 0} />
              </div>
              {errorFields?.bedrooms && <ErrorBlock>{errorFields?.bedrooms}</ErrorBlock>}
              <div className="text-center text-sm font-Nunito font-medium mt-2 text-black">
                {" "}
                Number of bedrooms <br /> (keep 0 if it’s a studio){" "}
              </div>
            </div>
            {/* ----------- BATH TUB SELECTION */}
            <div className="w-1/4 h-[auto] ">
              <div className="flex justify-center">
                <Image src="/images/vector/bath_icon.svg" width={36} height={36} alt="bathrooms" />
              </div>
              <div className="flex justify-center">
                <IncrementDecrementInput name={"bathrooms"} handleCounter={handleSelect} defaultValue={data?.bathrooms || 0} />
              </div>
              {errorFields?.bathrooms && <ErrorBlock>{errorFields?.bathrooms}</ErrorBlock>}
              <div className="text-center text-sm font-Nunito font-medium mt-2 text-black">
                {" "}
                Number of bathrooms* <br />
                (or shower rooms)
              </div>
            </div>

            {/* ----------- TOILET SELECTION */}

            <div className="w-1/4 h-[auto] ">
              <div className="flex justify-center">
                <Image src="/images/vector/toilet_icon.svg" width={36} height={36} alt="toilet" />
              </div>
              <div className="flex justify-center">
                <IncrementDecrementInput name={"toilets"} handleCounter={handleSelect} defaultValue={data?.toilets || 0} />
              </div>
              {errorFields?.toilets && <ErrorBlock>{errorFields?.toilets}</ErrorBlock>}
              <div className="text-center text-sm font-Nunito font-medium mt-2 text-black">
                {" "}
                Number of toilets <br />
                (that are separate from bathrooms)
              </div>
            </div>
          </div>

          <div className="relative w-full mt-4 ">

            <CheckBox label={"This property Includes Separates Kitchen/Cooking Area/Kitchenette"} id={"is_separate_kitchen"} name={'is_separate_kitchen'} checked={data?.is_separate_kitchen} onChange={handleChange} />

          </div>
        </div>


        <div className="w-full h-fit  mt-5">
          <div className="font-base text-black align-middle font-medium">Property Amenities*</div>


          <div className="mt-2 grid grid-cols-3 max-h-96 overflow-y-auto">

            {Object.entries(AMENITIES).map(([key, value]) =>
              <div className="col-span-1" key={key}>
                <CheckBox label={value} id={key} name={'amenities'} checked={data?.amenities.includes(key)} onChange={handleChange} />
              </div>
            )}

          </div>
          {errorFields?.amenities && <ErrorBlock>{errorFields?.amenities}</ErrorBlock>}
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

export default Amenities;
