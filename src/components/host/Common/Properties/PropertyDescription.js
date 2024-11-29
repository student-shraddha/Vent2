import React, { useState } from "react";
// import CharacterCounter from "../../../../pages/host/properties/add-new-property/CharacterCounter";

import DescriptionBox from "../Inputs/DescriptionBox";
import ErrorBlock from "../ErrorBlock";
import { successtoast, errortoast } from "@/components/host/Common/Toastify";

function PropertyDescription({ onSave, data, setData }) {

  const [errorFields, setErrorFields] = useState({
    description: "",
  });

  const handleChange = (e) => {

    if (e.target.name === 'description') {
      if (e.target.value.length > 700)
        return;
    }

    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {

    let isValid = true;
    let descriptionError = null;

    if (!data?.description.length)
      descriptionError = "Please enter property description";

    if (descriptionError) {
      isValid = false;
    }


    setErrorFields({
      ...errorFields,
      description: descriptionError,
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
      <div className="w-full flex flex-col items-center justify-start pt-3 px-2.5 ">
        <div className="w-full ">

          <div>
            <div className="font-Nunito text-black font-semibold text-xl">
              Description*
            </div>
          </div>

          <DescriptionBox helpText={`700 characters maximum without HTML tags(Plain texts). ${data?.description && data?.description?.length || 0}/700`} placeholder={'Enter Description'} rows={10} value={data?.description} name={'description'} setValue={handleChange} />
          {errorFields?.description && <ErrorBlock>{errorFields?.description}</ErrorBlock>}

          {/* <div className="mt-4">
            <div className="font-Mulish text-[#828282] text-base font-normal">
              700 characters minimum without HTML. 0/700
            </div>
            <CharacterCounter />
          </div> */}

          <div>
            <div className="w-full h-auto mt-4 flex justify-center ">
              <button className="bg-primary-baseGray text-white w-1/4 h-[3.125rem] py-2 px-4 rounded text-base border-none" onClick={handleSubmit}>
                Save & Next
              </button>
            </div>
          </div>
        </div>
      </div >
    </>
  );
}

export default PropertyDescription;
