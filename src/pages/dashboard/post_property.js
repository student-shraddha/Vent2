import AddListingCss from "../../styles/dashboard/AddListing.module.css";
import Head from "next/head";
import Image from "next/image";
import ProtectedRoute from "../../../common components/protected_route";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import AddListing00 from "../../../common components/add_listing00";
import AddListing01 from "../../../common components/add_listing01";
import AddListing02 from "../../../common components/add_listing02";
import AddListing03 from "../../../common components/add_listing03";
import AddListing04 from "../../../common components/add_listing04";
import AddListing05 from "../../../common components/add_listing05";
import axios from 'axios';
import { message } from "antd";

const BottomSection = dynamic(
  () => import("../../../common components/bottomGroup"),
  {
    suspense: true,
  }
);

const Addlisting = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const initVal = {
    name: null,
    description: null,
    type: null,
    area: null,
    capacity: null,
    beds: null,
    bathrooms: null,

    address: null,
    amenities: [],

    price: null,
    cancellationPolicies: {
      freeCancellation: "",///
      cancellationFees: [{
        hoursBeforeCheckIn: null,
        feePercentage: null,
        description: null
      }]
    },
    termsAndConditions: {
      general: null,
      checkInTime: null,
      checkOutTime: null,
      childrenPolicy: null,
      petPolicy: null,
      smokingPolicy: null
    },
    images: [],
    videos: []

  }
  const [initialValues, setInitialValues] = useState(initVal)
  const [loadings, setLoadings] = useState(false);

  const [token, setToken] = useState(null)

  const handleContinue = (values) => {
    // console.log("values", values)

    // Object(values).entries()

    const fields = {}
    for (const [key, value] of Object.entries(values)) {
      if (initialValues[key] !== undefined)
        fields[key] = value
    }
    // console.log("fields: ", fields)

    setInitialValues({ ...initialValues, ...fields })

    setCurrentStep((prevStep) => prevStep + 1);
  };
  const handleBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  useEffect(() => {
    setToken((sessionStorage.getItem("token") || localStorage.getItem("token")))
  }, [])

  const handleSubmit = (values) => {


    const fields = {
      cancellationPolicies: {
        freeCancellation: "",///
        cancellationFees: [{
          hoursBeforeCheckIn: null,
          feePercentage: null,
          description: null
        }]
      },
      termsAndConditions: {
        general: null,
        checkInTime: null,
        checkOutTime: null,
        childrenPolicy: null,
        petPolicy: null,
        smokingPolicy: null
      },
    }
    for (const [key, value] of Object.entries(values)) {

      if (['checkInTime', 'general', 'checkOutTime', 'childrenPolicy', 'petPolicy', 'smokingPolicy'].includes(key)) {
        // if (!fields["termsAndConditions"])
        //   fields["termsAndConditions"] = {}

        // console.log('initialValues["termsAndConditions"]', initialValues["termsAndConditions"])
        // console.log("key: ", key)
        if (initialValues["termsAndConditions"][key] !== undefined)
          fields["termsAndConditions"][key] = value

      } else if (['freeCancellation'].includes(key)) {
        if (initialValues["cancellationPolicies"][key] !== undefined)
          fields["cancellationPolicies"][key] = value
      } else {

        if (values.cancellationFeesCount) {
          for (let i = 0; i < values.cancellationFeesCount; i++) {
            // console.log("i", `${key}-${i}`)

            if (!fields["cancellationPolicies"]["cancellationFees"][i]) {
              fields["cancellationPolicies"]["cancellationFees"].push({
                hoursBeforeCheckIn: null,
                feePercentage: null,
                description: null
              })
            }


            if (key === `hoursBeforeCheckIn-${i}`)
              fields["cancellationPolicies"]["cancellationFees"][i]['hoursBeforeCheckIn'] = value

            if (key === `feePercentage-${i}`)
              fields["cancellationPolicies"]["cancellationFees"][i]['feePercentage'] = value

            if (key === `description-${i}`)
              fields["cancellationPolicies"]["cancellationFees"][i]['description'] = value

          }
        }


        // console.log("values.cancellationFeesArr:", values.cancellationFeesArr)
        // console.log("key: ", key)
      }
    }
    // console.log("fields: ", fields)

    const latestData = { ...initialValues, ...fields }
    setInitialValues(latestData)
    uploadProperty()

  };
  // console.log("initialValues: ", initialValues)

  const uploadProperty = async () => {
    setLoadings(true);
    try {
      // console.log("initialValues: ", initialValues)

      const formData = new FormData();
      for (const [key, value] of Object.entries(initialValues)) {
        // console.log(key, value)
        // console.log("key", typeof value)
        if (["cancellationPolicies", "termsAndConditions", 'amenities'].includes(key)) {

          if (key === "amenities") {
            value && value.length && formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, JSON.stringify(value));
          }

        } else if (["images", "videos"].includes(key)) {


          let fileList = value
          fileList.length && fileList.forEach((file) => {
            formData.append(key, file.originFileObj
            );
          });
          // formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }

      }
      const url = `${process.env.NEXT_PUBLIC_VENTIFY_API_URL}/v1/properties`;


      // console.log("token ", token)
      const response = await axios({
        method: 'post',
        url: url,
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': `multipart/form-data;`,
        },
      });

      if (response.status === 200) {
        setLoadings(true);
        setInitialValues(initVal)
        message.success("Property uploaded successfully");
        setCurrentStep(0);
      }


    } catch (error) {
      console.log("error: ", error)
      setLoadings(false);
      const errorMessage = error.response
        ? error.response.data.message
        : "An error occurred during signup.";
      message.error(errorMessage);
    }
  }



  const RenderCurrentStep = () => {
    if (currentStep === 0) {
      return <AddListing00 onContinue={handleContinue} onBack={handleBack} initialValues={initialValues} />;
    } else if (currentStep === 1) {
      return <AddListing01 onContinue={handleContinue} onBack={handleBack} initialValues={initialValues} />;
    } else if (currentStep === 2) {
      return <AddListing02 onContinue={handleContinue} onBack={handleBack} initialValues={initialValues} setInitialValues={setInitialValues} />;
    } else if (currentStep === 3) {
      return <AddListing03 onContinue={handleContinue} onBack={handleBack} initialValues={initialValues} />;
    } else if (currentStep === 4) {
      return <AddListing04 onContinue={handleContinue} onBack={handleBack} initialValues={initialValues} />;
    } else if (currentStep === 5) {
      return <AddListing05 onContinue={handleSubmit} onBack={handleBack} initialValues={initialValues} setInitialValues={setInitialValues} loadings={loadings} />;
    } else {
      return null;
    }
  };

  return (
    <>
      <ProtectedRoute>
        <Head>
          <title>Ventify | Add Listing</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {/*  -------------------------         BANNER IMAGE FAQ         ------------------------------*/}
        <div>
          <Image
            fill
            className={AddListingCss.banner_img}
            src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/images/post-property-banner.svg`}
            alt="faq banner image"
          ></Image>
        </div>

        {/*     -------------------------     TEXT AREA      ----------------------------    */}

        <RenderCurrentStep />

        {/*  -----------------------------           BOTTOM IMAGE SECTION         ----------------------------  */}

        <BottomSection />
      </ProtectedRoute>
    </>
  );
};

export default Addlisting;