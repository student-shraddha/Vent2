import Breadcrumb from "@/components/host/Common/Breadcrumb";
import CustomSelect from "@/components/host/Common/Dropdown/CustomSelect";
import InputWithLabel from "@/components/host/Common/Inputs/InputWithLabel";
import TextAreaWithLabel from "@/components/host/Common/Inputs/TextAreaWithLabel";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { successtoast, errortoast } from "@/components/host/Common/Toastify";
import axiosInstance from "@/utils/axiosInstance";
import Loading from "@/components/host/Common/Loader/loading";
import CommonButton from "@/components/host/Common/Buttons/CommonButton";
import LoaderSVG from "@/components/host/utils/Images/LoaderSVG";
import { DatePicker } from 'antd';
import dynamic from 'next/dynamic';
import { LANGUAGES_SPOKEN, NATIONALITIES } from "@/components/host/utils/constants/constants";
// const DynamicDatePicker = dynamic(() => import('antd/lib/date-picker'));
import dayjs from 'dayjs';
import CustomMultiSelect from "@/components/host/Common/Dropdown/CustomMultiSelect";
import ErrorBlock from "@/components/host/Common/ErrorBlock";

function Profile() {

  const { data: session, update } = useSession();

  const [errorFields, setErrorFields] = useState({
    firstName: null,
    lastName: null,
    email: null,
  });


  const [isEdit, setIsEdit] = useState(false);
  const [profilePic, setProfilePic] = useState({ preview: (session?.user?.profile || "/images/vector/profile_icon.png"), raw: "" });

  //Submit button
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  //set initial data
  const [data, setData] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // For profile image
  const singleInputRef = useRef(null);
  const handleImageClick = () => {
    singleInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setProfilePic({ preview: URL.createObjectURL(selectedFile), raw: selectedFile });
  };


  async function getProfileData() {
    try {

      const response = await axiosInstance.get(`/v1/auth/profile`, {
        headers: {
          Authorization: `Bearer ${session?.user?.token}`
        }
      });

      if (response.status === 200) {
        setIsDataLoaded(true)
        // setIsFormDisabled(false);

        const user = response.data.data.user;
        setData({
          email: user.email || "",
          firstName: user?.firstName || "",
          lastName: user?.lastName || "",
          mobile: user?.mobile || "",
          address: user?.address || "",
          dob: user?.dob || "",
          nationality: user?.nationality || "",
          zipcode: user?.zipcode || "",
          state: user?.state || "",
          country: user?.country || "",
          city: user?.city || "",
          host_role: user?.host_role || "",
          languages: user?.languages || []
        });
        user.profile && setProfilePic({ ...profilePic, preview: user.profile });
      }
    } catch (err) {
      setIsDataLoaded(true)
      if (err?.response?.data?.status === 'fail') {
        errortoast({ message: err?.response?.data?.message || "Something went wrong" });
      } else {
        errortoast({ message: err.message || "Something went wrong" });
      }
    }
  };
  useEffect(() => {
    getProfileData();
  }, []);


  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSelect = (field_name, value) => {
    setData({ ...data, [field_name]: value })
  }

  const handleSubmit = async () => {
    setIsSubmitDisabled(true);
    setIsLoading(true);

    let isValid = true;
    let firstNameError = null;
    let lastNameError = null;
    let emailError = null;

    if (!data?.firstName.length)
      firstNameError = "Please enter first name";

    if (!data?.lastName.length)
      lastNameError = "Please enter last name";

    if (!data?.email.length)
      emailError = "Please enter email";
    else if (!/\S+@\S+\.\S+/.test(data?.email))
      emailError = 'Please enter valid email';


    if (firstNameError || lastNameError || emailError) {
      isValid = false;
    }

    setErrorFields({
      ...errorFields,
      firstName: firstNameError,
      lastName: lastNameError,
      email: emailError,
    });

    if (!isValid) {
      setIsSubmitDisabled(false);
      setIsLoading(false);
      errortoast({ message: "Please fill all the required fields" });
      return false;
    }


    try {

      const formData = new FormData();
      formData.append('firstName', data?.firstName);
      formData.append('lastName', data?.lastName);
      formData.append('email', data?.email);
      formData.append('mobile', data?.mobile);
      formData.append('address', data?.address);
      formData.append('dob', data?.dob);
      formData.append('nationality', data?.nationality);
      formData.append('zipcode', data?.zipcode);
      formData.append('state', data?.state);
      formData.append('country', data?.country);
      formData.append('city', data?.city);
      formData.append('host_role', data?.host_role);
      formData.append('languages', JSON.stringify(data?.languages));
      profilePic?.raw && formData.append('profile', profilePic?.raw);


      const response = await axiosInstance({
        method: 'patch',
        url: "/v1/user/updateMe",
        data: formData,
        headers: {
          Authorization: `Bearer ${session?.user?.token}`,
          'Content-Type': `multipart/form-data;`,
        },
      });

      if (response.status === 200) {

        successtoast({ message: "Profile has been updated successfully" });
        setIsSubmitDisabled(false);
        setIsLoading(false);
        setTimeout(() => {
          update({
            ...data,
            ...(response.data.profile && { profile: response.data.profile })
          });
        }, 1000)
      } else {
        setIsSubmitDisabled(false);
        setIsLoading(false);
        if (response?.data?.status === "fail") {
          errortoast({ message: response?.data?.message || "Something went wrong" });
        }
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
      {isDataLoaded ? (
        <div>
          <Breadcrumb title={"My Profile"} subtitle={"Set your profile up."} />

          <div className="mt-4 w-full pb-5">
            <div className="flex justify-center ">
              <div className=" w-3/5 ">
                <div className="relative">
                  <div className="flex justify-center">
                    <div>
                      <input type="file" className="hidden" ref={singleInputRef} onChange={handleFileChange} />
                      <Image className={`rounded-full ${isEdit ? "cursor-pointer" : ""}`} src={profilePic.preview} alt="avatar" width={160} height={160} onClick={() => {
                        isEdit && handleImageClick()
                      }} />
                      <h3 className="text-primary-baseGray font-bold text-base text-center">{`${session?.user?.firstName || ""} ${session?.user?.lastName || ""}`} </h3>
                    </div>
                  </div>

                  <div className="bg-white drop-shadow-[0_0_20px_rgba(0,0,0,0.10)] absolute top-0 right-0 w-10 h-10 flex items-center justify-center cursor-pointer rounded-full" onClick={() => setIsEdit(!isEdit)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M3.96669 15.6747C3.96669 15.6747 4.03335 15.6747 4.05835 15.6747L6.50002 15.4497C6.84169 15.4163 7.15835 15.2663 7.40002 15.0247L16.6167 5.80801C17.05 5.37467 17.2917 4.79967 17.2917 4.19134C17.2917 3.58301 17.05 3.00801 16.6167 2.57467L16.025 1.98301C15.1584 1.11634 13.65 1.11634 12.7834 1.98301L11.6084 3.15801L3.57502 11.1913C3.33335 11.433 3.18335 11.7497 3.15835 12.0913L2.93335 14.533C2.90835 14.8413 3.01669 15.1413 3.23335 15.3663C3.43335 15.5663 3.69169 15.6747 3.96669 15.6747ZM14.4084 2.55801C14.675 2.55801 14.9417 2.65801 15.1417 2.86634L15.7334 3.45801C15.9334 3.65801 16.0417 3.91634 16.0417 4.19134C16.0417 4.46634 15.9334 4.73301 15.7334 4.92467L15 5.65801L12.9417 3.59967L13.675 2.86634C13.875 2.66634 14.1417 2.55801 14.4084 2.55801ZM4.40002 12.208C4.40002 12.158 4.42502 12.1163 4.45835 12.083L12.05 4.48301L14.1084 6.54134L6.51669 14.133C6.51669 14.133 6.43335 14.1913 6.39169 14.1913L4.20002 14.3913L4.40002 12.1997V12.208ZM18.9584 18.333C18.9584 18.6747 18.675 18.958 18.3334 18.958H1.66669C1.32502 18.958 1.04169 18.6747 1.04169 18.333C1.04169 17.9913 1.32502 17.708 1.66669 17.708H18.3334C18.675 17.708 18.9584 17.9913 18.9584 18.333Z" fill="#9E7B74" className={`${isEdit ? "fill-primary-baseRed" : "fill-primary-baseGray"} `} />
                    </svg>
                  </div>
                </div>

                <div>

                  <div className="grid grid-cols-2 gap-y-5 gap-x-24">
                    <div className="col-span-1">
                      <InputWithLabel label={'First Name*'} placeholder={'Enter First Name'} name={'firstName'} value={data?.firstName} disable={!isEdit} setValue={handleChange} />
                      {errorFields?.firstName && <ErrorBlock>{errorFields?.firstName}</ErrorBlock>}
                    </div>

                    <div className="col-span-1">
                      <InputWithLabel label={'Last Name*'} placeholder={'Enter Last Name'} name={'lastName'} value={data?.lastName} disable={!isEdit} setValue={handleChange} />
                      {errorFields?.lastName && <ErrorBlock>{errorFields?.lastName}</ErrorBlock>}
                    </div>

                    <div className="col-span-1">

                      <div className='flex flex-col w-full h-fit items-start'>
                        <div className='font-Nunito text-primary-baseGray text-base mb-[4px] font-medium'>
                          Email*
                        </div>

                        <div className="border border-[#E9E9E9] rounded-md flex items-center  w-full h-[40px] px-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="16" viewBox="0 0 22 16" fill="none">
                            <g clipPath="url(#clip0_448_852)">
                              <path d="M13.8232 8.88574L12.0365 10.6785C11.3119 11.4056 10.0371 11.4212 9.2969 10.6785L7.51011 8.88574L1.09277 15.3239C1.33165 15.4344 1.59502 15.5003 1.87502 15.5003H19.4584C19.7384 15.5003 20.0016 15.4345 20.2404 15.324L13.8232 8.88574Z" fill="#828282" />
                              <path d="M19.4583 0.5H1.87494C1.59494 0.5 1.33157 0.565917 1.09277 0.676375L7.95015 7.5565C7.95061 7.55696 7.95115 7.55704 7.95161 7.5575C7.95207 7.55796 7.95215 7.55858 7.95215 7.55858L10.1819 9.79567C10.4187 10.0325 10.9146 10.0325 11.1514 9.79567L13.3807 7.55896C13.3807 7.55896 13.3812 7.55796 13.3817 7.5575C13.3817 7.5575 13.3827 7.55696 13.3831 7.5565L20.2404 0.676333C20.0016 0.565833 19.7383 0.5 19.4583 0.5Z" fill="#828282" />
                              <path d="M0.199417 1.55078C0.0758333 1.8007 0 2.07811 0 2.37528V13.6253C0 13.9224 0.07575 14.1999 0.199375 14.4498L6.62783 8.00049L0.199417 1.55078Z" fill="#828282" />
                              <path d="M21.1335 1.55078L14.7051 8.00057L21.1335 14.4499C21.257 14.2 21.3329 13.9226 21.3329 13.6254V2.37536C21.3329 2.07811 21.257 1.8007 21.1335 1.55078Z" fill="#828282" />
                            </g>
                            <defs>
                              <clipPath id="clip0_448_852">
                                <rect width="21.3333" height="16" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                          <input className='text-sm appearance-none border-0 w-full focus-visible:outline-none p-2 font-Mulish placeholder:text-primary-grayPlaceholder text-primary-textGrey placeholder:text-sm '
                            type='text'
                            placeholder={'Enter Email'}
                            name={'email'}
                            value={data?.email}
                            disabled={!isEdit}
                            onChange={handleChange}
                          />
                        </div>
                        {errorFields?.email && <ErrorBlock>{errorFields?.email}</ErrorBlock>}
                      </div>
                    </div>

                    <div className="col-span-1">
                      <InputWithLabel label={'Phone'} placeholder={'Enter Phone'} name={'mobile'} value={data?.mobile} disable={!isEdit} setValue={handleChange} />
                    </div>

                    <div className="col-span-1">
                      {/* <InputWithLabel label={'Birthday'} placeholder={'30/01/1998'} name={'dob'} value={data?.dob} disable={!isEdit} setValue={handleChange} /> */}

                      <p className='font-Nunito text-primary-baseGray text-base mb-[4px] font-medium'>
                        Birthday
                      </p>
                      <DatePicker
                        className="text-sm appearance-none  border border-[#E9E9E9] rounded-md w-full h-[40px] focus-visible:outline-none p-2 font-Mulish placeholder:text-primary-grayPlaceholder text-primary-textGrey placeholder:text-sm"
                        format={"MM/DD/YYYY"}
                        onChange={(date) => {
                          handleSelect('dob', (date && date.format("YYYY-MM-DD") || ""))
                        }}
                        defaultValue={(data?.dob ? dayjs(data?.dob) : "")}
                      />
                    </div>

                    <div className="col-span-1">
                      <CustomSelect
                        label={'Nationality'}
                        placeholder={'Select Nationality'}
                        optionalFunction={(e) => { handleSelect('nationality', e.id) }}
                        listItem={Object.entries(NATIONALITIES).map(([key, value]) => { return { id: key, name: value } })}
                        disable={!isEdit}
                        defaultValue={data?.nationality}
                      />
                    </div>

                    <div className="col-span-1">
                      <InputWithLabel label={'Country'} placeholder={'Enter Country'} name={'country'} value={data?.country} disable={!isEdit} setValue={handleChange} />
                    </div>

                    <div className="col-span-1">
                      <InputWithLabel label={'State'} placeholder={'Enter State'} name={'state'} value={data?.state} disable={!isEdit} setValue={handleChange} />
                    </div>


                    <div className="col-span-1">
                      <InputWithLabel label={'City'} placeholder={'Enter City'} name={'city'} value={data?.city} disable={!isEdit} setValue={handleChange} />
                    </div>

                    <div className="col-span-1">
                      <InputWithLabel label={'Zip Code'} placeholder={'Enter Zip Code'} name={'zipcode'} value={data?.zipcode} disable={!isEdit} setValue={handleChange} />
                    </div>

                    <div className="col-span-2">
                      <TextAreaWithLabel label={'Street Address'} placeholder={'Enter Address'} name={'address'} value={data?.address} disabled={!isEdit} setValue={handleChange} />
                    </div>
                    <div className="col-span-1">
                      <CustomSelect
                        label={'What sentence describes you best?'}
                        placeholder={'What sentence describes you best?'}
                        listItem={[
                          { id: 'owner', name: 'I m property owner' },
                          { id: 'manager', name: 'I m property manager' }
                        ]}
                        defaultValue={data?.host_role}
                        optionalFunction={(e) => { handleSelect('host_role', e.id) }}
                        disabled={!isEdit}

                      />
                    </div>
                    <div className="col-span-1">

                      <CustomMultiSelect
                        label={'Language'}
                        options={Object.entries(LANGUAGES_SPOKEN).map(([key, value]) => { return { value: key, label: value } })}
                        onChange={(e) => { handleSelect('languages', e.map(({ value }) => value)) }}
                        defaultValue={data?.languages || []}
                      />

                      {/* <CustomSelect
                        label={'Language'}
                        placeholder={'Select Language'}
                        optionalFunction={(e) => { handleSelect('nationality', e.id) }}
                        listItem={Object.entries(LANGUAGES_SPOKEN).map(([key, value]) => { return { id: key, name: value } })}
                        disable={!isEdit}
                        defaultValue={data?.languages}
                      /> */}


                    </div>
                  </div>

                  {isEdit && (
                    <div className="mt-4">
                      <div className="w-full h-auto mt-4 flex justify-center ">
                        <CommonButton
                          className={'bg-primary-baseGray text-white w-1/4 h-[3.125rem] py-2 px-4 rounded text-base border-none'}
                          onClick={handleSubmit}
                          disabled={isSubmitDisabled}
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
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )
        : <Loading />
      }
    </>
  );
}

export default Profile;
