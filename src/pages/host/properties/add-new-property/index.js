import Breadcrumb from "@/components/host/Common/Breadcrumb";
import React, { useEffect, useState } from "react";
import VerticalStepper from "../../../../components/host/Common/VerticalStepper";

import BasicInfo from "@/components/host/Common/Properties/BasicInfo";
import AmenitiesComp from "@/components/host/Common/Properties/Amenities";
import PropertyDescription from "@/components/host/Common/Properties/PropertyDescription";
import PropertyPhotos from "@/components/host/Common/Properties/PropertyPhotos";
import PriceAndAvailability from "@/components/host/Common/Properties/PriceAndAvailability";
import CheckInCheckOut from "@/components/host/Common/Properties/CheckInCheckOut";
import Payments from "@/components/host/Common/Properties/Payments";
import { successtoast, errortoast } from "@/components/host/Common/Toastify";
import axiosInstance from "@/utils/axiosInstance";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";


const HostProperties = () => {

  const router = useRouter();
  const { data: session, status } = useSession();
  const [currentStep, setCurrentStep] = useState(1);

  const [steps, setSteps] = useState([
    { step: "Step 1", title: "Basic Info", is_completed: false },
    { step: "Step 2", title: "Amenities", is_completed: false },
    { step: "Step 1", title: "Basic Info", is_completed: false },
    { step: "Step 1", title: "Basic Info", is_completed: false },
    { step: "Step 1", title: "Basic Info", is_completed: false },
    { step: "Step 1", title: "Basic Info", is_completed: false },
    { step: "Step 1", title: "Basic Info", is_completed: false },
  ]);

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //set initial data
  const [data, setData] = useState({
    name: "", //done
    price: "",
    imageUrl: "",
    otherImageUrls: "",
    ownerName: "",// no need
    description: "",
    accomodation: "",
    bedrooms: "",
    bathrooms: "",
    checkIn: "",
    checkOut: "",
    amenities: [],
    latitude: "",
    longitude: "",
    rooms: "",
    beds: "",
    videoUrl: "",
    minNightsOfBooking: "",
    maxNightsOfBooking: "",
    paymentMethods: "",
    ownerId: "", // no need
    ownerDetail: "",
    address: "",
    city: "",
    state: "",
    country: "",


    property_type: "",
    floor: "",
    area_in_sqr_mt: "",
    area_in_sqr_feet: "",
    license_no: "",
    has_license: false,
    is_separate_kitchen: true,
    toilets: "",

    no_of_guests_daily_price: "",
    season_prices: [],
    weekend_price: "",
    applies_on: "",
    never_check_in: [],
    never_check_out: [],
    down_payments_type: "",
    down_payments: "",
    security_deposit_type: "",
    security_deposit: "",
    fee_and_tax: [],
    landlord_name: "",
    contact_prior_days: "",
    landlord_email: "",
    landlord_phone: "",
    landlord_phonecode: "",
    checkIn_To: "",
    checkin_at: "",
    ArrivalInstructions: "",
    CheckInCheckOutFees: [],
    penalties: [],
    TermsAndConditionsLinks: [],
    availability: {
      blocked_dates: []
    },
    event_only: 0,
    event_price: 0,
  });

  const goToStep = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  const onSave = async () => {


    if (currentStep < 7) {
      setSteps((prev) => {
        const new_steps = [...steps];
        const current = new_steps[currentStep - 1];
        new_steps[currentStep - 1] = { ...current, is_completed: true };
        return new_steps;
      });

      setCurrentStep((prev) => prev + 1);
      return
    }
    //to make button disabled
    setIsSubmitDisabled(true);
    setIsLoading(true);

    // Submit data

    try {


      const body = {
        name: data?.name || "",
        price: data?.price || "",
        imageUrl: data?.imageUrl || "",
        otherImageUrls: data?.otherImageUrls || [],
        description: data?.description || "",
        accomodation: data?.accomodation || "",
        bedrooms: data?.bedrooms || 0,
        bathrooms: data?.bathrooms || 0,
        checkIn: data?.checkIn || "",
        checkOut: data?.checkOut || "",
        amenities: data?.amenities || [],
        latitude: data?.latitude || "",
        longitude: data?.longitude || "",
        rooms: data?.rooms || "",
        beds: data?.beds || "",
        videoUrl: data?.videoUrl || "",
        minNightsOfBooking: data?.minNightsOfBooking || "",
        maxNightsOfBooking: data?.maxNightsOfBooking || "",
        paymentMethods: data?.paymentMethods && data?.paymentMethods.length && data?.paymentMethods.map(p => p.name) || [],
        address: data?.address || "",
        city: data?.city || "",
        state: data?.state || "",
        country: data?.country || "",

        arrival_instructions: {
          ArrivalInstructions: data?.ArrivalInstructions || "",
          landlord_name: data?.landlord_name || "",
          landlord_email: data?.landlord_email || "",
          landlord_phone: data?.landlord_phone || "",
          landlord_phonecode: data?.landlord_phonecode || "",
          contact_prior_days: data?.contact_prior_days || "",
          checkIn_To: data?.checkIn_To || "",
          checkin_at: data?.checkin_at || "",
        },
        property_info: {
          property_type: data?.property_type || "",
          floor: data?.floor || "",
          area_in_sqr_mt: data?.area_in_sqr_mt || "",
          area_in_sqr_feet: data?.area_in_sqr_feet || "",
          license_no: data?.license_no || "",
          has_license: data?.has_license || "",
          is_separate_kitchen: data?.is_separate_kitchen || "",
          toilets: data?.toilets || 0,
        },
        pricing: {
          no_of_guests_daily_price: data?.no_of_guests_daily_price || "",
          season_prices: data?.season_prices || [],
          weekend_price: data?.weekend_price || "",
          applies_on: data?.applies_on || [],
          never_check_in: data?.never_check_in || [],
          never_check_out: data?.never_check_out || [],
          down_payments_type: data?.down_payments_type || "",
          down_payments: data?.down_payments || "",
          security_deposit_type: data?.security_deposit_type || "",
          security_deposit: data?.security_deposit || "",
          fee_and_tax: data?.fee_and_tax || [],
        },
        policies: {
          CheckInCheckOutFees: data?.CheckInCheckOutFees || [],
          penalties: data?.penalties || [],
          TermsAndConditionsLinks: data?.TermsAndConditionsLinks || []
        },
        availability: {
          blocked_dates: data?.blocked_dates
        },
        event_only: data?.event_only || 0,
        event_price: data?.event_price || 0,
      }

      const response = await axiosInstance.post(`/v1/host/property`, body, {
        headers: { Authorization: `Bearer ${session?.user?.token}` }
      });

      if (response.status === 201) {

        successtoast({ message: "Property has been created successfully" });

        setTimeout(() => {
          // setIsSubmitDisabled(false);
          // setIsLoading(false);

          router.push(`/host/properties/all-properties`)
        }, 1000)
      }


    } catch (err) {
      setIsSubmitDisabled(false);
      setIsLoading(false);

      if (err?.response?.data?.status === 'fail') {
        errortoast({ message: err?.response?.data?.message || "Something went wrong" });
      } else {
        errortoast({ message: err.message || "Something went wrong" });
      }
    }

  }

  return (
    <>
      <Breadcrumb
        title={"Add New Properties"}
        subtitle={"Create and edit your property information."}
      />

      <div className="w-full flex items-center justify-center pt-3 pb-5">
        <div className=" w-full  mt-2 gap-2 ">

          {/* ------------------------------       FORM CONTAINER    ------------------------  */}
          <div className="w-full  flex rounded-lg first-letter:rounded-xl mr-4 border-3 border-solid border-white shadow-[0_4px_4px_0px_rgba(162,154,154,0.25)] gap-[36px] bg-[rgba(255,255,255,0.06)] backdrop-blur-md">

            {/* ------------------------------         STEPPER    ------------------------  */}
            <div className="  w-1/4 h-auto">
              <div className=" mx-auto">
                <VerticalStepper
                  currentStep={currentStep}
                  steps={steps}
                  goToStep={goToStep}
                />
              </div>
            </div>

            {/* ------------------------------        FORM DATA     ------------------------  */}
            <div className=" w-3/4 h-fit pb-4 min-w-169 bg-white flex justify-start ml-3">
              {/* ------------------------------        STEP-1   STARTED   ------------------------  */}
              {currentStep === 1 ? <BasicInfo onSave={onSave} data={data} setData={setData} /> : null}

              {/* ------------------------------        STEP-2    STARTED    ------------------------  */}
              {currentStep === 2 ? <AmenitiesComp onSave={onSave} data={data} setData={setData} /> : null}

              {/* ------------------------------        STEP-3    STARTED   ------------------------  */}
              {currentStep === 3 ? <PropertyDescription onSave={onSave} data={data} setData={setData} /> : null}

              {/* ------------------------------        STEP-4   STARTED    ------------------------  */}
              {currentStep === 4 ? <PropertyPhotos onSave={onSave} data={data} setData={setData} /> : null}

              {/* ------------------------------        STEP-5   STARTED    ------------------------  */}
              {currentStep === 5 ? <PriceAndAvailability onSave={onSave} data={data} setData={setData} /> : null}

              {/* ------------------------------        STEP-6   STARTED    ------------------------  */}
              {currentStep === 6 ? <CheckInCheckOut onSave={onSave} data={data} setData={setData} /> : null}

              {/* ------------------------------        STEP-7   STARTED    ------------------------  */}
              {currentStep === 7 ? <Payments onSave={onSave} data={data} setData={setData} isSubmitDisabled={isSubmitDisabled} isLoading={isLoading} /> : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HostProperties;
