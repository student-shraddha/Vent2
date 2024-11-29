import Breadcrumb from "@/components/host/Common/Breadcrumb";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Image as AntdImage } from "antd";
import Image from "next/image";
import CommonBox from "@/components/host/Common/CommonBox";
import CalendarSVG from "@/components/host/utils/Images/CalendarSVG";
import CheckIInOutDropDown from "@/components/host/Common/Dropdown/CheckIInOutDropDown";
import CommonButton from "@/components/host/Common/Buttons/CommonButton";
import DatePickerComponent from "@/components/host/Common/Calendar/DatePickerComponent";
import { Line } from "react-chartjs-2";
import CustomGoogleMap from "@/components/host/Common/CustomGoogleMap";
import axiosInstance from "@/utils/axiosInstance";
import { useSession } from "next-auth/react";
import Loading from "@/components/host/Common/Loader/loading";
import { AMENITIES_ICONS } from "@/components/host/utils/constants/constants";
import { errortoast } from "@/components/host/Common/Toastify";



const ViewHostProperty = () => {

    const router = useRouter();
    const { data: session, status } = useSession();

    const { slug } = router.query;
    const [data, setData] = useState(null);


    const getProperty = async () => {
        try {
            const response = await axiosInstance.get(`/v1/host/property/getBySlug/${slug}`, {
                headers: { Authorization: `Bearer ${session?.user?.token}` }
            });

            if (response.status === 200) {
                setData(response.data.response)
            }
        } catch (err) {
            if (err?.response?.data?.status === 'fail') {
                errortoast({ message: err?.response?.data?.message || "Something went wrong" });
            } else {
                errortoast({ message: err.message || "Something went wrong" });
            }
        }

    }

    useEffect(() => {
        getProperty();
    }, [slug]);

    console.log("data", data)
    return (
        <>
            {data ? (
                <div>

                    <Breadcrumb title={data?.name} subtitle={data?.address} />

                    <div>
                        <div className="flex">

                            <div className="grid-container grid grid-cols-auto grid-rows-2 gap-2 grid-flow-col aspect-video">
                                <AntdImage.PreviewGroup>
                                    <div className={"row-start-1 col-start-1 row-end-3 col-end-3 aspect-auto"}>

                                        <AntdImage
                                            alt="Golf group"
                                            loading="lazy"
                                            className={"!h-full"}
                                            src={data?.imageUrl || "/images/noImageFound.png"}
                                            fill="true"
                                            fallback={BlurImage}
                                        ></AntdImage>
                                    </div>


                                    {data.otherImageUrls && data.otherImageUrls.length ?


                                        data.otherImageUrls.map((image, inx) => {
                                            return (
                                                <div key={inx} className={`relative ${inx >= 6 ? "hidden" : ""}`}>
                                                    <AntdImage
                                                        alt="Golf group"
                                                        loading="lazy"
                                                        className={`!h-full `}
                                                        src={image}
                                                        fill="true"
                                                        fallback={BlurImage}
                                                    ></AntdImage>
                                                    {inx === 5 && data.otherImageUrls.length > 6 ? (
                                                        <div className="text-lg font-Nunito font-bold text-white bg-black/50 absolute rounded-xl inset-0 z-10 flex justify-center items-center">+{data.otherImageUrls.length - 6} Images</div>
                                                    ) : ""}

                                                </div>
                                            )
                                        })
                                        : ""
                                    }
                                    {/* <div className={"row-start-1 col-start-3 row-end-2 col-end-4 aspect-video"}>
                                        <Image
                                            alt="Golf group"
                                            loading="lazy"
                                            className={"!h-full"}
                                            src={data.otherImageUrls[0]}
                                            fill="true"
                                            fallback={BlurImage}
                                        ></Image>
                                    </div>
                                    <div className={"row-start-1 col-start-4 row-end-2 col-end-5 aspect-video"}>
                                        <Image
                                            alt="Golf group"
                                            loading="lazy"
                                            className={"!h-full"}
                                            src={data.otherImageUrls[1]}
                                            fill="true"
                                            fallback={BlurImage}
                                        ></Image>
                                    </div>
                                    <div className={"row-start-2 col-start-3 row-end-3 col-end-4 aspect-video"}>
                                        <Image
                                            alt="Golf group"
                                            loading="lazy"
                                            className={"!h-full"}
                                            src={data.otherImageUrls[2]}
                                            fill="true"
                                            fallback={BlurImage}
                                        ></Image>
                                    </div>

                                    <div className={"row-start-2 col-start-4 row-end-3 col-end-0 relative aspect-video"}>
                                        <Image
                                            alt="Golf group"
                                            loading="lazy"
                                            className={"!h-full "}
                                            src={data.otherImageUrls[3]}
                                            fill="true"
                                            fallback={BlurImage}
                                        ></Image>
                                        <div className="text-lg font-Nunito font-bold text-white bg-black/50 absolute rounded-xl inset-0 z-10 flex justify-center items-center">+18 Images</div>
                                    </div> */}
                                </AntdImage.PreviewGroup>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-5 gap-4">
                        <div className="col-span-3">
                            <div className="py-3">
                                <CommonBox>
                                    <div className="font-Nunito text-primary-lightBlack text-xl font-bold">Description</div>
                                    <div className="font-Nunito text-primary-lightBlack text-lg font-medium pt-2">{data?.description}</div>
                                    <div className="font-Nunito text-primary-lightBlack text-base font-normal pt-2">
                                        Composition: {[data?.bedrooms ? "Bedrooms" : "", data?.bathrooms ? "Bathroom" : "", data?.property_info?.toilets ? "Toilet" : ""].filter((c) => c.length).join(", ")}
                                    </div>
                                    <div className="font-Nunito text-primary-lightBlack text-base font-normal">Amenities: {data.amenities.join(", ")}</div>
                                </CommonBox>
                            </div>

                            <div className="py-3">
                                <CommonBox>
                                    <div className="font-Nunito text-primary-lightBlack text-xl font-bold">Composition</div>

                                    <div className="pt-4 gap-x-24 gap-y-10 grid grid-cols-2 ">
                                        {data?.bathrooms && (
                                            <div className="flex items-center col-span-1">
                                                <Image src="/images/icons/1 Bathroom.svg" width={33} height={33} alt="Bathroom" />
                                                <div className="ml-3">{`${data?.bathrooms || 0} Bathroom`}</div>
                                            </div>
                                        )}

                                        {data?.without_elevator && (
                                            <div className="flex items-center col-span-1">
                                                <Image src="/images/icons/1st floor without elevator.svg" width={33} height={33} alt="without elevator" />
                                                <div className="ml-3">1st floor without elevator</div>
                                            </div>
                                        )}

                                        {data?.bedrooms && (
                                            <div className="flex items-center col-span-1">
                                                <Image src="/images/icons/Bedroom.svg" width={33} height={33} alt="Bedroom" />
                                                <div className="ml-3">{`${data?.bedrooms || 0} Bedroom`}</div>
                                            </div>
                                        )}

                                        {data?.property_info?.toilets && (
                                            <div className="flex items-center col-span-1">
                                                <Image src="/images/icons/Toilet.svg" width={33} height={33} alt="Toilet" />
                                                <div className="ml-3">{`${data?.property_info?.toilets || 0} Toilet`}</div>
                                            </div>
                                        )}
                                    </div>

                                </CommonBox>
                            </div>

                            <div className="py-3">
                                <CommonBox>
                                    <div className="font-Nunito text-primary-lightBlack text-xl font-bold">Amenities</div>

                                    <div className="pt-4 gap-x-24 gap-y-10 grid grid-cols-2 max-h-52 overflow-y-scroll">

                                        {data?.amenities && data?.amenities.length ?
                                            data?.amenities.map((title, inx) =>
                                                <div key={inx} className="flex items-center col-span-1">
                                                    <Image src={`/images/icons/amenities/${AMENITIES_ICONS[title] ? AMENITIES_ICONS[title] : "default-amenity.svg"}`} width={33} height={33} alt={title} />
                                                    <div className="ml-3">{title}</div>
                                                </div>
                                            )
                                            :
                                            "No amenities found"
                                        }
                                    </div>

                                </CommonBox>
                            </div>


                        </div>
                        <div className="col-span-2">
                            <div className="py-3">
                                <CommonBox>
                                    <div className="font-Nunito text-primary-lightBlack text-xl font-bold">Important Information</div>

                                    <div className="pt-4 flex flex-col gap-y-4">
                                        <div className="flex items-center">
                                            <Image src="/images/icons/atm-card.svg" width={33} height={33} alt="paymentMethods" />
                                            <div className="ml-3">{data?.paymentMethods && data?.paymentMethods.length ? data?.paymentMethods.join(", ") : "N/A"}</div>
                                        </div>
                                        <div className="flex items-center">
                                            <Image src="/images/icons/entry-in.svg" width={33} height={33} alt="Normal check-in hours" />
                                            <div className="ml-3">{data?.checkIn ? `Normal check-in hours (no charge) ${data?.checkIn} ${data?.arrival_instructions?.checkIn_To ? ` to ${data?.arrival_instructions?.checkIn_To}` : ""}` : "N/A"}</div>
                                        </div>
                                        <div className="flex items-center">
                                            <Image src="/images/icons/entry-out.svg" width={33} height={33} alt="Hour of latest check-out" />
                                            <div className="ml-3">{data?.checkOut ? `Hour of latest check-out on departure day ${data?.checkOut}` : ""}</div>
                                        </div>
                                    </div>
                                </CommonBox>
                            </div>
                            {/* <div className="py-3">
                                <CommonBox>
                                    <div className="font-Nunito text-primary-lightBlack text-xl font-bold">Check In-Out Dates</div>

                                    <div className="pt-4">
                                        <div className="flex items-center justify-between py-3 px-3 border-1 rounded-lg border-solid border-[#F3F3F3] shadow-[0_4px_4px_0px_rgba(206,206,206,0.25)]">
                                            <div className="font-Nunito text-[#8A8A8A] text-sm font-medium">Check-In</div>
                                            <div><svg xmlns="http://www.w3.org/2000/svg" width="17" height="10" viewBox="0 0 17 10" fill="none">
                                                <path d="M0.390747 2.89294H16.0661" stroke="#8A8A8A" strokeWidth="0.757174" />
                                                <line x1="0.661103" y1="2.81774" x2="2.85164" y2="0.726192" stroke="#8A8A8A" strokeWidth="0.757174" />
                                                <path d="M16.0659 7.43604H0.390529" stroke="#8A8A8A" strokeWidth="0.757174" />
                                                <line x1="15.7956" y1="7.51118" x2="13.605" y2="9.60273" stroke="#8A8A8A" strokeWidth="0.757174" />
                                            </svg></div>
                                            <div className="font-Nunito text-[#8A8A8A] text-sm font-medium">Check-Out</div>
                                            <div><CalendarSVG /></div>
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <CheckIInOutDropDown />
                                    </div>
                                    <CommonButton className={`bg-primary-baseRed font-Nunito text-white text-sm font-bold px-2.5 py-3.5  w-full cursor-pointer rounded-lg border transition mt-4`}>Book Now</CommonButton>

                                </CommonBox>
                            </div> */}

                            {/* <div className="py-3">
                                <CommonBox>
                                    <div className="font-Nunito text-primary-lightBlack text-xl font-bold">Availability</div>

                                    <div className="pt-4">
                                        <DatePickerComponent />
                                    </div>
                                </CommonBox>
                            </div> */}

                            <div className="py-3">
                                <CommonBox>
                                    <div className="font-Nunito text-primary-lightBlack text-xl font-bold">Extra Information</div>

                                    <div className="pt-4">
                                        {data?.arrival_instructions && (data?.arrival_instructions?.landlord_name || data?.arrival_instructions?.landlord_email || data?.arrival_instructions?.landlord_phone)
                                            ? (
                                                <ul className="text-primary-baseGrey text-sm leading-6">
                                                    {data?.arrival_instructions?.landlord_name && (<li>{data?.arrival_instructions?.landlord_name}</li>)}
                                                    {data?.arrival_instructions?.landlord_email && (<li>{data?.arrival_instructions?.landlord_email}</li>)}
                                                    {data?.arrival_instructions?.landlord_phone && (
                                                        <li>
                                                            {data?.arrival_instructions?.landlord_phonecode && data?.arrival_instructions?.landlord_phonecode?.phone ? `+${data?.arrival_instructions?.landlord_phonecode?.phone}` : ""}{data?.arrival_instructions?.landlord_phone}
                                                        </li>
                                                    )}
                                                </ul>
                                            )
                                            :
                                            "N/A"
                                        }

                                    </div>
                                </CommonBox>
                            </div>
                        </div>
                    </div>

                    {/* Map section */}
                    <div>
                        <CustomGoogleMap data={{ latitude: data?.latitude, longitude: data?.longitude }} isMarker={true} />
                    </div>


                </div>
            ) :
                <Loading />}

        </>
    )
}

const BlurImage = 'data:image/png;base64,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'
export default ViewHostProperty;
