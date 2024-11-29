import { useState, React, useEffect, useRef, useContext } from "react";
import Head from "next/head";
import { Container, Col, Row, Dropdown } from "react-bootstrap";
import ViewPropertyCss from "../../../styles/ViewProperty.module.css";
import SimilarPropertiesCss from "../../../styles/SimilarProperties.module.css";
import GirlGroupBannerImage from "../../../../public/images/group_girls_banner.png";
import GolfHomMobileMenuLogo from "../../../../public/VENTIFY-Logo.png";
// import { NextSeo } from 'next-seo'
import {
    Modal,
    Space,
    Tabs,
    message,
    Image,
    Button,
    DatePicker,
    Form,
    Input,
    Checkbox,
} from "antd";
import NextImage from "next/image";
import TabContentOverview from "../tab_content_overview";
import Map from "../../../../common components/map";
import axios from "axios";
import { useRouter } from "next/router";
const { RangePicker } = DatePicker;
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import ThingsToKnow from "./components/ThingsToKnow";
import FeatureSection from "./components/FeatureSection";
import Link from "next/link";
import { AuthContext } from "@/context/auth_context";
import {
    UserOutlined,
    MailOutlined,
    LockOutlined,
    PhoneOutlined
} from "@ant-design/icons";


const BottomSection = dynamic(
    () => import("../../../../common components/bottomGroup"),
    {
        suspense: true,
    }
);
const PaymentPopUp = dynamic(() => import("./components/PaymentPopUp"), {
    suspense: true,
});

const PriceBreakDown = dynamic(() => import("./components/PriceBreakDown"), {
    suspense: true,
});
const ContactToHost = dynamic(() => import("./components/ContactToHost"), {
    suspense: true,
});

const ForgotPassword = dynamic(
    () => import("../../../../common components/ForgotPassword"),
    {
        suspense: true,
    }
);

const SimilarProperties = dynamic(() => import("../../../../common components/SimilarProperties"), {
    suspense: true,
});


message.config({
    duration: 3,
    maxCount: 1,
});
const customMessage = (content, type = "error") => {
    const messageKey = Math.random();
    const obj = {
        content: content,
        key: messageKey,
        duration: 3,
        onClick: () => message.destroy(messageKey)
    }
    if (type === "success") {
        message.success(obj);
    } else if (type === "warning") {
        message.warning(obj);
    } else {
        message.error(obj);
    }
}

const ViewProperty = (props) => {
    const router = useRouter();
    const Params = router.query;
    const ElementRef = useRef();
    const [propertyID, setPropertyID] = useState(null);
    const [SpecificPropAPIData, SetSpecificPropAPIData] = useState({});
    const [BookingDate, SetBookingDate] = useState([]);
    const [NotAvailable, setNotAvailable] = useState(false);
    const [Available, setAvailable] = useState(false);
    const [ShowOtherDetailsStatic, setShowOtherDetailsStatic] = useState(false);
    const [ShowTotalPaymentTextStatic, setShowTotalPaymentTextStatic] =
        useState(false);
    const [DisableCalendar, setDisableCalendar] = useState(false);
    const [ShowGuestDropDown, setShowGuestDropDown] = useState(false);
    const [IsClickedSaveBtn, setIsClickedSaveBtn] = useState(false);
    const [CalendarFooterMinStay, setCalendarFooterMinStay] = useState({});
    const [AvailDateNextpaxForMinStay, setAvailDateNextpaxForMinStay] =
        useState(null);
    const [AvailDateRentalForMinStay, setAvailDateRentalForMinStay] =
        useState(null);
    const [LoginFormRef] = Form.useForm();
    const [RegisterFormRef] = Form.useForm();

    const ContextUserDetails = useContext(AuthContext);
    const [UserName, SetUserName] = useState("");

    //* GUEST SECTION
    const [adult, setAdult] = useState(0);
    const [child, setChild] = useState(0);
    const [infant, setInfant] = useState(0);
    const [pet, setPet] = useState(0);
    //! GUEST SECTION END

    const [form] = Form.useForm();
    const [SaveDateInState, setSaveDateInState] = useState([]);
    const [PropertyType, setPropertyType] = useState("");
    const [
        ShowNextpaxPropertyPaymentPortal,
        setShowNextpaxPropertyPaymentPortal,
    ] = useState(false);
    const [AvailDateNextpax, setAvailDateNextpax] = useState([]);
    const [AvailDateRental, setAvailDateRental] = useState([]);
    const [NextPaxFinalAvailPriceBreakDown, setNextPaxFinalAvailPriceBreakDown] =
        useState({});
    const [RentalFinalAvailPriceBreakDown, setRentalFinalAvailPriceBreakDown] =
        useState({});
    const [NightsCounter, setNightsCounter] = useState(0);
    const [StartingFromPrice, setStartingFromPrice] = useState(0);
    const [IsReserveVisible, setIsReserveVisible] = useState(true);
    const [PaymentIntentObjNextpax, setPaymentIntentObjNextpax] = useState({});
    const [PaymentIntentObjRental, setPaymentIntentObjRental] = useState({});
    const [TotalChargesNextpax, setTotalChargesNextpax] = useState(0);
    const [TotalChargesRental, setTotalChargesRental] = useState(0);
    const [SaveGuestBtnLoading, setSaveGuestBtnLoading] = useState(false);
    const [LoginModalOpen, setLoginModalOpen] = useState(false);
    const [loadings, setLoadings] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [metaName, setMetaName] = useState('');
    const [metaDesc, setMetaDesc] = useState('');
    const [maxAllowAdults, setMaxAllowAdults] = useState(0);
    const [SumAmountCharges, setSumAmountCharges] = useState(0);

    const [isAvailDateNextpax, setIsAvailDateNextpax] = useState(false);

    const [defaultDateValue, setDefaultDateValue] = useState(((props.Params?.from && props.Params.to) ? [dayjs(new Date(props.Params?.from)), dayjs(new Date(props.Params.to))] : []))

    // New Payment modal
    const [newPayment, setNewPayment] = useState(false);
    const [totalCharges, setTotalCharges] = useState(0);

    const [isReserveStarted, setIsReserveStarted] = useState(false);

    const [displayImages, setDisplayImages] = useState(5);
    const [allImages, setAllImages] = useState([]);

    const [gcMarkers, setGcMarkers] = useState([]);


    const loadMore = () => {
        setDisplayImages(allImages.length)
    }
    useEffect(() => {
        SpecificPropAPIData?.images?.length && setAllImages(SpecificPropAPIData?.images)
    }, [SpecificPropAPIData?.images])

    // useEffect(() => {
    //   setDefaultDateValue((prev) => {
    //     let old = [...prev]
    //     let n = [...old, ...[dayjs(new Date()), dayjs(new Date())]]
    //     return
    //   })
    //   return () => {
    //     setDefaultDateValue([]);
    //   };
    // }, []);



    useEffect(() => {
        if (AvailDateNextpax.length) {
            setIsAvailDateNextpax(true)
        }
    }, [AvailDateNextpax])
    let CommisionPercentage = 9;
    const CommissionCalc = (TotalAmount) => {
        return (TotalAmount * CommisionPercentage) / 100;
    };

    useEffect(() => {


        if (PropertyType === "Nextpax") {
            setTotalCharges((NextPaxFinalAvailPriceBreakDown?.breakdown?.total
                ? NextPaxFinalAvailPriceBreakDown?.breakdown?.total >= 0.5
                    ? Math.ceil(
                        CommissionCalc(
                            NextPaxFinalAvailPriceBreakDown?.breakdown
                                ?.rentOnly
                        ) + NextPaxFinalAvailPriceBreakDown?.breakdown?.total
                    )
                    : Math.floor(
                        CommissionCalc(
                            NextPaxFinalAvailPriceBreakDown?.breakdown
                                ?.rentOnly
                        ) + NextPaxFinalAvailPriceBreakDown?.breakdown?.total
                    )
                : 0));
        } else if (PropertyType === "Rental") {

            if (RentalFinalAvailPriceBreakDown?.TotalFeesTaxes) {
                const amountsArray =
                    RentalFinalAvailPriceBreakDown?.TotalFeesTaxes?.map((item) =>
                        Math.round(Number(item.Amount))
                    );


                //  Use reduce to calculate the sum of all amounts in the array

                const sum = amountsArray.reduce(
                    (accumulator, currentAmount) => accumulator + currentAmount,
                    0
                );

                // Update the state with the calculated total amount
                setSumAmountCharges(sum);
            }


            setTotalCharges((Math.round(
                Number(RentalFinalAvailPriceBreakDown?.Rent)
            ) +
                SumAmountCharges +
                Math.round(
                    CommissionCalc(
                        Math.round(
                            Number(RentalFinalAvailPriceBreakDown?.Rent)
                        )
                    )
                )));
        }

    }, [NextPaxFinalAvailPriceBreakDown, RentalFinalAvailPriceBreakDown, PropertyType, SumAmountCharges])

    useEffect(() => {
        if (AvailDateRental.length) {
            setIsAvailDateNextpax(true)
        }
    }, [AvailDateRental])

    useEffect(() => {
        if (isAvailDateNextpax) {
            OnChangeDateInput(null, ((props.Params?.from && props.Params?.to) ? [props.Params?.from, props.Params?.to] : []));
            OnCalendarDateSelect(null, ((props.Params?.from && props.Params?.to) ? [props.Params?.from, props.Params?.to] : []))
        }
    }, [isAvailDateNextpax])
    useEffect(() => {

        if ((props.Params?.from && props.Params?.to) && PropertyType && SpecificPropAPIData) {
            const date1 = props.Params?.from;
            const date2 = props.Params?.to;
            FetchAvailableDate(date1, date2);
        }

    }, [PropertyType]);

    useEffect(() => {
        if (BookingDate.length && BookingDate[0] && BookingDate[1] && (adult > 0 || child > 0))
            SaveTotalGuests()
    }, [BookingDate, adult, child])


    useEffect(() => {
        const UrlParamId = window.location.pathname.split("/")[2];

        if (Params.adults || Params.childs) {
            setAdult(Number(Params.adults));
            setChild(Number(Params.childs));
        }

        const GetPropertyById = async () => {
            try {
                const SpecificPropData = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/v1/property/getBySlug/${Params.view_property_name || UrlParamId
                    }`
                );

                if (SpecificPropData.status === 200) {


                    // SetSpecificPropAPIData(SpecificPropData.data.response);


                    if (SpecificPropData.data.response.externalPropertyType === "Nextpax") {

                        const desc = SpecificPropData.data?.response.descriptions.find((item) => item.typeCode == 'short-introduction');
                        setMetaName(SpecificPropData.data?.response?.general?.name);
                        setMetaDesc((desc ? desc.text : ""));

                        setMaxAllowAdults(SpecificPropData.data?.response?.general?.maxOccupancy);


                        setPropertyID(SpecificPropData.data?.response.id)

                        const { country, city, address, state } = SpecificPropData.data.response;
                        const { postalCode } = SpecificPropData.data.response.general;

                        const full_address = `${address}, ${city}, ${state} ${postalCode}, ${country}`;

                        SetSpecificPropAPIData({
                            id: SpecificPropData.data?.response.id,
                            name: SpecificPropData.data?.response?.general?.name,
                            description: (desc ? desc.text : ""),
                            accomodation: SpecificPropData.data?.response?.general?.maxOccupancy,
                            beds: SpecificPropData.data?.response?.beds,
                            bedrooms: SpecificPropData.data?.response?.bedrooms,
                            bathrooms: SpecificPropData.data?.response?.bathrooms,
                            price: SpecificPropData.data.response?.price,
                            additionalGuest: SpecificPropData.data.response?.additionalGuest,
                            minNightsOfBooking: SpecificPropData.data.response?.minNightsOfBooking,
                            maxNightsOfBooking: SpecificPropData.data.response?.maxNightsOfBooking,
                            cancellationPolicy: null,
                            additionalRulesInformation: SpecificPropData.data.response?.additionalRulesInformation,
                            checkIn: SpecificPropData.data.response?.ownerDetail?.checkInOutTimes?.checkInFrom,
                            checkOut: SpecificPropData.data.response?.ownerDetail?.checkInOutTimes?.checkOutUntil,
                            latitude: SpecificPropData.data.response?.general?.latitude,
                            longitude: SpecificPropData.data.response?.general?.longitude,
                            externalPropertyType: SpecificPropData.data.response?.externalPropertyType,
                            images: SpecificPropData.data.response?.images,
                            amenities: SpecificPropData.data.response?.amenities,
                            ownerDetail: SpecificPropData.data.response?.ownerDetail,
                            videoUrl: SpecificPropData.data.response?.videoUrl,
                            full_address: full_address
                        });

                        setStartingFromPrice(
                            SpecificPropData.data.response?.price >= 0.5
                                ? Math.ceil(SpecificPropData.data.response?.price)
                                : Math.floor(SpecificPropData.data.response?.price)
                        );

                        setPropertyType("Nextpax");
                    } else {
                        setMetaName(SpecificPropData.data?.response?.Name);
                        setMetaDesc(SpecificPropData.data?.response?.Descriptions);

                        setMaxAllowAdults(SpecificPropData.data?.response?.StandardGuests);

                        setPropertyID(SpecificPropData.data?.response?.id)



                        const { country, state, city, address, ZipCode } = SpecificPropData.data.response;

                        const full_address = `${address} ${city}, ${state} ${ZipCode}, ${country}`;

                        SetSpecificPropAPIData({
                            id: SpecificPropData.data?.response?.id,
                            name: SpecificPropData.data?.response?.Name,
                            description: SpecificPropData.data?.response?.Descriptions,
                            accomodation: SpecificPropData.data?.response?.StandardGuests,
                            beds: null,
                            bedrooms: SpecificPropData.data?.response?.AmenitiesCount?.bedroom,
                            bathrooms: SpecificPropData.data?.response?.AmenitiesCount?.bathroom,
                            price: SpecificPropData.data.response?.price,
                            additionalGuest: null,
                            minNightsOfBooking: SpecificPropData.data.response?.minNightsOfBooking,
                            maxNightsOfBooking: null,
                            cancellationPolicy: null,
                            additionalRulesInformation: null,
                            checkIn: SpecificPropData.data.response?.CheckInOut?.CheckInFrom,
                            checkOut: SpecificPropData.data.response?.CheckInOut?.CheckOutUntil,
                            latitude: SpecificPropData.data.response?.Latitude,
                            longitude: SpecificPropData.data.response?.Longitude,
                            externalPropertyType: SpecificPropData.data.response?.externalPropertyType,
                            images: SpecificPropData.data.response?.Images,
                            amenities: SpecificPropData.data.response?.Amenities, //Features
                            ownerDetail: SpecificPropData.data.response?.ownerDetail,
                            videoUrl: SpecificPropData.data.response?.videoUrl,
                            full_address: full_address
                        });

                        // http://localhost:3000/search/oba23000-watersong-6-bedrooms-45-baths-refurnitur?from=01-07-2024&to=01-11-2024&guests=&adults=4&childs=&golfcourse_name=

                        setStartingFromPrice(
                            SpecificPropData.data.response?.price >= 0.5
                                ? Math.ceil(SpecificPropData.data.response?.price)
                                : Math.floor(SpecificPropData.data.response?.price)
                        );
                        setPropertyType("Rental");
                    }
                }
            } catch (error) { }
        };

        GetPropertyById();
        return () => {
            SetSpecificPropAPIData([])
        };
    }, [Params.view_property_name]);

    const DateFormater = (date) => {
        return dayjs(date).format("YYYY-MM-DD");
    };

    const items = [
        {
            key: "1",
            label: `Overview`,
            children: <TabContentOverview data={SpecificPropAPIData} />,
        },
    ];


    const incAdult = () => {
        if (maxAllowAdults <= (adult + child)) {
            customMessage(`Sorry number of guests can not be greater than ${maxAllowAdults}`);
        } else {
            setAdult(adult + 1);
        }

    };

    const decAdult = () => {
        if (adult > 0) {
            setAdult(adult - 1);
        } else {
            customMessage("Sorry number of adults can not be less than 0");
            setAdult(0);
        }
    };

    const incChild = () => {
        if (maxAllowAdults <= (adult + child)) {
            customMessage(`Sorry number of guests can not be greater than ${maxAllowAdults}`);
        } else {
            setChild(child + 1);
        }
    };

    const decChild = () => {
        if (child > 0) {
            setChild(child - 1);
        } else {
            customMessage("Sorry number of children can not be less than 0");
            setChild(0);
        }
    };

    const incInfant = () => {
        setInfant(infant + 1);
    };

    const decInfant = () => {
        if (infant > 0) {
            setInfant(infant - 1);
        } else {
            customMessage("Sorry number of infant can not be less than 0");
            setInfant(0);
        }
    };

    const incPet = () => {
        setPet(pet + 1);
    };

    const decPet = () => {
        if (pet > 0) {
            setPet(pet - 1);
        } else {
            decInfant
            customMessage("Sorry number of pet can not be less than 0");
            setPet(0);
        }
    };

    {
        /* -----------      CONTACT THE HOST SECTION        -----------------*/
    }

    const [isModalOpen, setIsModalOpen] = useState(false);

    const OnclickShowContactToHost = () => {
        setIsModalOpen(true);
    };

    const OnclickHideContactToHost = () => {
        setIsModalOpen(false);
    };
    const handleCancelContact = () => {
        setIsModalOpen(false);
    };

    const test = () => {
        const CheckAvailNextPax = async () => {
            try {
                const Token =
                    localStorage.getItem("token") || sessionStorage.getItem("token");
                const CheckAvailRes = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/v1/nextpax/finalAvailability`,
                    {
                        id: propertyID,
                        from: BookingDate[0],
                        to: BookingDate[1],
                        guest: Params.guests ? Params.guests : adult + child + infant + pet,
                        adult: adult,
                        children: child,
                        babies: infant,
                        pets: pet,
                    },
                    { headers: { Authorization: `Bearer ${Token}` } }
                );
                if (CheckAvailRes.status === 201) {
                    setShowGuestDropDown(false);
                    setSaveGuestBtnLoading(false);

                    if (CheckAvailRes.data.data.available) {
                        setPaymentIntentObjNextpax(CheckAvailRes.data.paymentIntent);
                        setShowNextpaxPropertyPaymentPortal(true);
                        setNewPayment(true);
                    } else {
                    }
                }
            } catch (error) {
                setSaveGuestBtnLoading(false);
                setShowGuestDropDown(false);

                if (error.response?.status === 401) {
                    setSaveGuestBtnLoading(false);
                    setShowGuestDropDown(false);

                    // message.error(
                    //   `${error.response.data.message}, Please login to book rentals!`
                    // );

                    setIsReserveStarted(true);
                    setLoginModalOpen(true);
                }
            }
        };
        CheckAvailNextPax();
    };

    const CreatePatymentIntent = async () => {
        const CheckPriceRental = async () => {
            const Token =
                sessionStorage.getItem("token") || localStorage.getItem("token");

            try {
                const CheckAvailRes = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/v1/rentalunited/price?id=${propertyID
                    }&from=${BookingDate[0]}&to=${BookingDate[1]}&guest=${adult + child + infant + pet
                    }`,
                    { headers: { Authorization: `Bearer ${Token}` } }
                );
                if (CheckAvailRes.status === 201) {
                    setNewPayment(true);
                    setPaymentIntentObjRental(CheckAvailRes.data?.paymentIntent);
                }
            } catch (error) {
                // setShowGuestDropDown(false);
                // setSaveGuestBtnLoading(false);
                // setAvailable(false);
                // setNotAvailable(true);
                // setShowTotalPaymentTextStatic(false);
                // setShowOtherDetailsStatic(false);

                if (error.response.status === 401) {
                    setLoginModalOpen(true);
                    setIsReserveStarted(true);
                    // message.error(
                    //   error?.response?.data?.message + ", Please login to book rentals!"
                    // );
                }

                // if (
                //   error?.response?.data?.message ===
                //     "Property is not available for a given dates - Minimum stay criteria not met!" ||
                //   "Property is not available for a given dates - Error occured!"
                // ) {
                //   // message.error(error?.response?.data?.message);
                //   // setShowTotalPaymentTextStatic(false);
                //   // setShowOtherDetailsStatic(false);
                // }
            }
        };
        CheckPriceRental();
    };


    const OnChangeDateInput = (date, DateValue) => {
        if (DateValue[0] || DateValue[1]) {
            const StartDate = dayjs(DateValue[0]); // Replace with your start date
            const EndDate = dayjs(DateValue[1]); // Replace with your end date
            const DifferenceOfDate = EndDate.diff(StartDate, "day");

            if (PropertyType === "Nextpax") {
                if (DifferenceOfDate < CalendarFooterMinStay?.restrictions?.minStay) {
                    customMessage("Stay period doesn't match with minimum stay");
                }
            }

            setNightsCounter(EndDate.diff(StartDate, "days") || 0);
            SetBookingDate([DateValue[0], DateValue[1]]);

            if (SpecificPropAPIData?.externalPropertyType === "Nextpax") {
                const initialdate = DateFormater(DateValue[0]);
                const finaldate = DateFormater(DateValue[1]);

                let newdatesarray = [];
                let i = initialdate;
                while (i !== finaldate) {
                    newdatesarray.push(i);
                    const newdate = dayjs(i).add(1, "days").format("YYYY-MM-DD");
                    i = newdate;
                }
                newdatesarray.push(finaldate);
                let iserror = false;
                newdatesarray.map((i) => {
                    if (!AvailDateNextpax.includes(i)) iserror = true;
                });

                if (iserror) {

                    customMessage("Invalid Date Range Selected");
                    return;
                }

                if (IsClickedSaveBtn) {
                    const CheckAvailNextPax = async () => {
                        try {
                            const Token =
                                localStorage.getItem("token") ||
                                sessionStorage.getItem("token");
                            const CheckAvailRes = await axios.post(
                                `${process.env.NEXT_PUBLIC_API_URL}/v1/nextpax/priceBreakdown`,
                                {
                                    id: propertyID,
                                    from: DateValue[0],
                                    to: DateValue[1],
                                    guest: Params.guests
                                        ? Params.guests
                                        : adult + child + infant + pet,
                                    guest: (adult + child + infant + pet),
                                    adult: adult,
                                    children: child,
                                    babies: infant,
                                    pets: pet,
                                },
                                { headers: { Authorization: `Bearer ${Token}` } }
                            );
                            if (CheckAvailRes.status === 201) {
                                setShowGuestDropDown(false);
                                setSaveGuestBtnLoading(false);

                                if (CheckAvailRes.data.data.available) {
                                    setNextPaxFinalAvailPriceBreakDown(CheckAvailRes.data.data);
                                    setTotalChargesNextpax(
                                        CheckAvailRes.data?.data?.breakdown?.total
                                    );
                                    setStartingFromPrice(
                                        CheckAvailRes?.data?.data?.breakdown?.adr
                                    );
                                    setAvailable(true);
                                    setNotAvailable(false);
                                    setShowTotalPaymentTextStatic(true);
                                    setPaymentIntentObjNextpax(CheckAvailRes.data.paymentIntent);
                                } else {
                                    setSaveGuestBtnLoading(false);
                                    setAvailable(false);
                                    setNotAvailable(true);
                                    setShowTotalPaymentTextStatic(false);
                                    setShowOtherDetailsStatic(false);
                                    setShowNextpaxPropertyPaymentPortal(false);
                                }
                            }
                        } catch (error) {
                            setSaveGuestBtnLoading(false);
                            setShowGuestDropDown(false);

                            if (error.response?.status === 401) {
                                setSaveGuestBtnLoading(false);
                                setShowGuestDropDown(false);

                                // message.error(
                                //   `${error.response.data.message}, Please login to book rentals!`
                                // );
                            }
                        }
                    };
                    CheckAvailNextPax();
                }
            } else if (SpecificPropAPIData?.externalPropertyType === "Rental") {
                if (IsClickedSaveBtn) {
                    const CheckPriceRental = async () => {
                        const Token =
                            sessionStorage.getItem("token") || localStorage.getItem("token");

                        try {
                            const CheckAvailRes = await axios.get(
                                `${process.env.NEXT_PUBLIC_API_URL
                                }/v1/rentalunited/priceBreakdown?id=${propertyID
                                }&from=${DateValue[0]}&to=${DateValue[1]}&guest=${adult + child + infant + pet
                                }`,
                                { headers: { Authorization: `Bearer ${Token}` } }
                            );
                            if (CheckAvailRes.status === 201) {
                                setShowGuestDropDown(false);
                                setSaveGuestBtnLoading(false);
                                setAvailable(true);
                                setNotAvailable(false);

                                // CALCULATING AVG OF DAYS
                                const TotalRent = CheckAvailRes?.data?.data?.Breakdowns?.reduce(
                                    (Sum, Object) => Sum + Number(Object.rent),
                                    0
                                );
                                const AvgRent =
                                    TotalRent / CheckAvailRes?.data?.data?.Breakdowns?.length;

                                setStartingFromPrice(AvgRent);
                                setTotalChargesRental(CheckAvailRes?.data?.data?.Total);

                                setRentalFinalAvailPriceBreakDown(CheckAvailRes?.data?.data);
                                setShowTotalPaymentTextStatic(true);
                            } else {
                                setSaveGuestBtnLoading(false);
                                setShowGuestDropDown(false);

                                setAvailable(false);
                                setNotAvailable(true);
                                setShowTotalPaymentTextStatic(false);
                                setShowOtherDetailsStatic(false);
                            }
                        } catch (error) {
                            setShowGuestDropDown(false);

                            setSaveGuestBtnLoading(false);
                            setAvailable(false);
                            setNotAvailable(true);
                            setShowTotalPaymentTextStatic(false);
                            setShowOtherDetailsStatic(false);

                            if (
                                error?.response?.data?.message ===
                                "Property is not available for a given dates - Minimum stay criteria not met!" ||
                                "Property is not available for a given dates - Error occured!"
                            ) {
                                customMessage(toSentenceCase(error?.response?.data?.message));
                                setShowTotalPaymentTextStatic(false);
                                setShowOtherDetailsStatic(false);
                            } else {
                                customMessage("Internal error, Something went wrong!");

                                setShowTotalPaymentTextStatic(false);
                                setShowOtherDetailsStatic(false);
                            }
                        }
                    };
                    CheckPriceRental();
                }
            }
        }
    };

    const toSentenceCase = camelCase => {
        if (camelCase) {
            const result = camelCase.replace(/([A-Z])/g, ' $1').trim();
            return result[0].toUpperCase() + result.substring(1).toLowerCase();
        }
        return '';
    };

    //! API CALL AVAILABILITY CHECK
    const FetchAvailableDate = async (
        date1 = dayjs().startOf("month").format("MM-DD-YYYY"),
        date2 = dayjs().endOf("month").add(1, "month").format("MM-DD-YYYY")
    ) => {
        if (PropertyType === "Nextpax") {
            const data = await axios({
                method: "GET",
                url: `${process.env.NEXT_PUBLIC_API_URL}/v1/nextpax/availability?id=${propertyID
                    }&from=${dayjs(date1).format("MM-DD-YYYY")}&to=${dayjs(date2).format(
                        "MM-DD-YYYY"
                    )}`,
            }).then((res) => {
                if (res.status === 200) {
                    const AvailDataNextpax = res.data?.data?.data?.[0]?.availability
                        ? res.data?.data?.data?.[0]?.availability
                            ?.filter((dateObj) => dateObj.restrictions.arrivalAllowed && dateObj.quantity)
                            .map((i) => i.date)
                        : [];


                    setAvailDateNextpaxForMinStay(
                        res.data?.data?.data?.[0]
                            ? res.data?.data?.data?.[0]?.availability?.filter(
                                (dateObj) => dateObj.restrictions.arrivalAllowed
                            )
                            : []
                    );

                    setAvailDateNextpax(AvailDataNextpax);
                }
            });
        } else if (PropertyType === "Rental") {
            const Token =
                localStorage.getItem("token") || sessionStorage.getItem("token");
            const data = await axios({
                method: "GET",
                headers: { Authorization: `Bearer ${Token}` },
                url: `${process.env.NEXT_PUBLIC_API_URL
                    }/v1/rentalunited/availability?id=${propertyID}&from=${dayjs(
                        date1
                    ).format("MM-DD-YYYY")}&to=${dayjs(date2).format("MM-DD-YYYY")}`,
            })
                .then((res) => {
                    if (res.status === 201) {
                        const data = res.data.data;

                        const AvailDateRental = data
                            .filter((Object) => Object.IsBlocked === "false")
                            .map((Object) => Object.Date);
                        //! FINAL WORKING
                        // let finaldata = data.filter((data, ind) => {
                        //   return data.IsBlocked === "false";
                        // });

                        // finaldata = finaldata.map((data, ind) => {
                        //   return data.Date;
                        // });

                        setAvailDateRentalForMinStay(
                            data.filter((Object) => Object.IsBlocked === "false")
                        );

                        setAvailDateRental(AvailDateRental);
                    }
                })
                .catch((err) => {
                    if (err?.response?.status === 401) {
                        customMessage(
                            `${err?.response?.statusText}, Please login to book hotels!`
                        );
                    }
                });
        }
    };

    const SaveTotalGuests = (stayOpenDropDown = true) => {
        setSaveGuestBtnLoading(true);
        setIsClickedSaveBtn(true);

        if ((BookingDate[0], BookingDate[1])) {
            if (PropertyType === "Nextpax") {
                const CheckAvailNextPax = async () => {
                    try {
                        const Token =
                            localStorage.getItem("token") || sessionStorage.getItem("token");
                        const CheckAvailRes = await axios.post(
                            `${process.env.NEXT_PUBLIC_API_URL}/v1/nextpax/priceBreakdown`,
                            {
                                id: propertyID,
                                from: BookingDate[0],
                                to: BookingDate[1],
                                // guest: Params.guests
                                //   ? Params.guests
                                //   : adult + child + infant + pet,
                                guest: (adult + child + infant + pet),
                                adult: adult,
                                children: child,
                                babies: infant,
                                pets: pet,
                            },
                            { headers: { Authorization: `Bearer ${Token}` } }
                        );
                        if (CheckAvailRes.status === 201) {
                            setShowGuestDropDown(stayOpenDropDown);
                            setSaveGuestBtnLoading(false);

                            if (CheckAvailRes.data.data.available) {
                                setNextPaxFinalAvailPriceBreakDown(CheckAvailRes.data.data);
                                setTotalChargesNextpax(
                                    CheckAvailRes.data?.data?.breakdown?.total
                                );
                                setStartingFromPrice(CheckAvailRes?.data?.data?.breakdown?.adr);
                                setAvailable(true);
                                setNotAvailable(false);
                                setShowTotalPaymentTextStatic(true);
                                setPaymentIntentObjNextpax(CheckAvailRes.data.paymentIntent);
                            } else {
                                setSaveGuestBtnLoading(false);
                                setAvailable(false);
                                setNotAvailable(true);
                                setShowTotalPaymentTextStatic(false);
                                setShowOtherDetailsStatic(false);
                                setShowNextpaxPropertyPaymentPortal(false);
                            }
                        }
                    } catch (error) {
                        setSaveGuestBtnLoading(false);
                        setShowGuestDropDown(stayOpenDropDown);

                        if (error.response?.status === 401) {
                            setSaveGuestBtnLoading(false);
                            setShowGuestDropDown(stayOpenDropDown);

                            customMessage(
                                `${error.response.data.message}, Please login to book rentals!`
                            );
                        }
                    }
                };
                CheckAvailNextPax();
            } else if (PropertyType === "Rental") {
                const CheckPriceRental = async () => {
                    const Token =
                        sessionStorage.getItem("token") || localStorage.getItem("token");

                    try {
                        const CheckAvailRes = await axios.get(
                            `${process.env.NEXT_PUBLIC_API_URL
                            }/v1/rentalunited/priceBreakdown?id=${propertyID}&from=${BookingDate[0]
                            }&to=${BookingDate[1]}&guest=${adult + child + infant + pet}`,
                            { headers: { Authorization: `Bearer ${Token}` } }
                        );
                        if (CheckAvailRes.status === 201) {
                            setShowGuestDropDown(stayOpenDropDown);
                            setSaveGuestBtnLoading(false);
                            setAvailable(true);
                            setNotAvailable(false);
                            // CALCULATING AVG OF DAYS
                            const TotalRent = CheckAvailRes?.data?.data?.Breakdowns?.reduce(
                                (Sum, Object) => Sum + Number(Object.rent),
                                0
                            );
                            const AvgRent =
                                TotalRent / CheckAvailRes?.data?.data?.Breakdowns?.length;

                            setStartingFromPrice(AvgRent);
                            setTotalChargesRental(CheckAvailRes?.data?.data?.Total);

                            setRentalFinalAvailPriceBreakDown(CheckAvailRes?.data?.data);
                            setShowTotalPaymentTextStatic(true);
                        } else {
                            setSaveGuestBtnLoading(false);
                            setShowGuestDropDown(stayOpenDropDown);

                            setAvailable(false);
                            setNotAvailable(true);
                            setShowTotalPaymentTextStatic(false);
                            setShowOtherDetailsStatic(false);
                        }
                    } catch (error) {
                        setShowGuestDropDown(stayOpenDropDown);

                        setSaveGuestBtnLoading(false);
                        setAvailable(false);
                        setNotAvailable(true);
                        setShowTotalPaymentTextStatic(false);
                        setShowOtherDetailsStatic(false);

                        if (
                            error?.response?.data?.message ===
                            "Property is not available for a given dates - Minimum stay criteria not met!" ||
                            "Property is not available for a given dates - Error occured!"
                        ) {
                            customMessage(toSentenceCase(error?.response?.data?.message));
                            setShowTotalPaymentTextStatic(false);
                            setShowOtherDetailsStatic(false);
                        } else {
                            customMessage("Internal error, Something went wrong!");

                            setShowTotalPaymentTextStatic(false);
                            setShowOtherDetailsStatic(false);
                        }
                    }
                };
                CheckPriceRental();
            }
        } else {
            setShowGuestDropDown(false);
            setSaveGuestBtnLoading(false);
            // customMessage("Please select Check-In and Check-Out date.");
            customMessage("Please select Check-In and Check-Out date.")
        }
    };

    const handleCancel = () => {
        setNewPayment(false);
    };
    const OnCalendarDateSelect = (event, SelectedDate) => {
        setStartDate(dayjs(SelectedDate?.[0]).format("YYYY-MM-DD"));
        if (PropertyType === "Nextpax") {
            AvailDateNextpaxForMinStay && setCalendarFooterMinStay(
                AvailDateNextpaxForMinStay.find(
                    (Obj) => Obj.date === dayjs(SelectedDate[0]).format("YYYY-MM-DD")
                )
            );
        } else if (PropertyType === "Rental") {
            AvailDateRentalForMinStay && setCalendarFooterMinStay(
                AvailDateRentalForMinStay.find(
                    (Obj) => Obj.Date === dayjs(SelectedDate[0]).format("YYYY-MM-DD")
                )
            );
        }
    };

    // LOGIN MODAL LOGIC HERE

    //! LOGIN API FUNCTION
    const onSubmitLogin = async () => {
        setLoadings(true);
        try {
            // LOGIN FIELDS VALUES
            const LoginEmail = LoginFormRef.getFieldValue("email_login");
            const LoginPassword = LoginFormRef.getFieldValue("password");
            const RememberMe = LoginFormRef.getFieldValue("remember_me");

            //! LOGIN API CALL
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/user/login`,
                {
                    email: LoginEmail,
                    password: LoginPassword,
                }
            );

            //* IF LOGIN SUCCESSFUL
            if (response.status === 200) {
                ContextUserDetails.setUserState(response.data.token);
                setLoginModalOpen(false);
                setLoadings(false);

                if (!RememberMe) {
                    sessionStorage.setItem("token", response.data.token);
                } else {
                    localStorage.setItem("token", response.data.token);
                }
                customMessage(response.data.message, "success");

                //! User Get Profile API Call
                const Token = response.data.token;
                const User = axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/profile`,
                    { headers: { Authorization: `Bearer ${Token}` } }
                );
                User.then((response) => {
                    if (response.status === 200) {
                        const LoggedInUserName = response.data.data.user.username;

                        if (!RememberMe) {
                            sessionStorage.setItem("Uname", LoggedInUserName);
                        } else {
                            localStorage.setItem("Uname", LoggedInUserName);
                        }

                        if (
                            localStorage.getItem("Uname") ||
                            sessionStorage.getItem("Uname") != ""
                        ) {
                            SetUserName(LoggedInUserName);
                        }


                        if (isReserveStarted) {
                            PropertyType === "Rental" ? CreatePatymentIntent() : test()
                        }
                    }
                }).catch((error) => {
                    customMessage(error.response.data.message);
                });
            } else {
                customMessage("Invalid login credentials!");
                setLoadings(false);
            }
        } catch (err) {
            //* IF LOGIN FAILED
            console.log(err);
            if (err?.response?.data?.message === "Password is incorrect") {
                customMessage(err?.response?.data?.message);
            } else {
                customMessage(err?.response?.data?.message);
            }
            setLoadings(false);
        }
    };

    {
        /* -----------      FORGET PASSWORD SECTION        -----------------*/
    }

    const [forgotModalLgDevice, setForgotModalLgDevice] = useState(false);
    const forgotLgDevice = () => {
        setForgotModalLgDevice(true);
        handleCancel();
    };
    const handleForgotLgDevice = () => {
        setForgotModalLgDevice(false);
    };
    const handleCancelForgotLgDevice = () => {
        setForgotModalLgDevice(false);
    };

    const OnCloseLoginModal = () => {
        setIsReserveStarted(false);
        setLoginModalOpen(false);
    };

    {
        /* -----------      REGISTER SECTION       -----------------*/
    }

    const [registerModaInLgDevice, setRegisterModaInLgDevice] = useState(false);

    const registerLgDevice = () => {
        setRegisterModaInLgDevice(true);
        handleCancel();
    };
    const handleRegisterLgDevice = () => {
        setRegisterModaInLgDevice(false);
    };
    const handleCancelRegisterLgDevice = () => {
        setRegisterModaInLgDevice(false);
    };

    //! SIGNUP API FUNCTION
    const onSubmitSignup = async (values) => {
        setLoadings(true);
        try {
            //! SIGNUP API
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/user/signup`,
                {
                    username: values.user_name,
                    email: values.email,
                    password: values.password,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    mobile: values.mobile,
                }
            );

            //* Close Register Modal on Success Signup
            if (response.status === 201) {
                setLoadings(true);
                ContextUserDetails.setUserState(response.data.token);
                setLoginModalOpen(false);
                handleCancelRegisterLgDevice();
                setLoadings(false);
                sessionStorage.setItem("token", response.data.token);
                //! User Get Profile API Call
                const Token = response.data.token;
                const User = axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/profile`,
                    { headers: { Authorization: `Bearer ${Token}` } }
                );
                User.then((response) => {
                    if (response.status === 200) {
                        const LoggedInUserName = response.data.data.user.username;
                        sessionStorage.setItem("Uname", LoggedInUserName);
                        SetUserName(LoggedInUserName);

                        if (isReserveStarted) {
                            PropertyType === "Rental" ? CreatePatymentIntent() : test()
                        }
                    }
                }).catch((error) => {
                    customMessage(error.response.data.message);
                });
                customMessage(response.data.message, "success");
            }
        } catch (error) {
            setLoadings(false);
            const errorMessage = error.response
                ? error.response.data.message
                : "An error occurred during signup.";
            customMessage(errorMessage);
        }
    };

    function isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (err) {
            return false;
        }
    }
    return (
        <>
            {/* <NextSeo
        title={SpecificPropAPIData.data?.name}
        description={SpecificPropAPIData.data?.description}
      /> */}
            {/* <Head>

        <title>{`Ventify | ${props.title}`}</title>
        <meta name="description" content={props.description} />
        <meta name="og:title" content={props.title} />
        <meta name="og:description" content={props.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}

            <Head>

                <title>{`Ventify | ${metaName}`}</title>
                <meta name="description" content={metaDesc} />
                <meta name="og:title" content={metaName} />
                <meta name="og:description" content={metaDesc} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* VIEW PROPERTY PAGE STARTED HERE */}
            <div className={ViewPropertyCss.view_prop_bannerimg_section}>
                {/* LOGIN MODAL  */}
                <Modal
                    title="Log In to your account"
                    footer={null}
                    open={LoginModalOpen}
                    onCancel={OnCloseLoginModal}
                    width={372}
                    centered={true} // Enable centering
                >
                    <div className={ViewPropertyCss.textParent}>
                        <Form
                            form={LoginFormRef}
                            layout="vertical"
                            name="login_form"
                            scrollToFirstError
                        >
                            {/* EMAIL */}
                            <Form.Item
                                name="email_login"
                                label="Email or Username"
                                className={ViewPropertyCss.form_items_login}
                                rules={[
                                    {
                                        message: "The input is not valid E-mail!",
                                    },
                                    {
                                        required: true,
                                        message: "Please input your E-mail or Username!",
                                    },
                                ]}
                            >
                                <Input
                                    name="email_login"
                                    placeholder="Enter Email or Username"
                                    className={ViewPropertyCss.password}
                                />
                            </Form.Item>

                            {/* PASSWORD */}
                            <Form.Item
                                name="password"
                                label="Password"
                                className={ViewPropertyCss.form_items_login}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your password!",
                                    },
                                    { min: 5 },
                                ]}
                                hasFeedback
                            >
                                <Input.Password
                                    name="password_login"
                                    placeholder="Enter Password"
                                    className={ViewPropertyCss.password}
                                />
                            </Form.Item>

                            <div className={ViewPropertyCss.remember}>
                                <Form.Item
                                    className={ViewPropertyCss.form_items_checkbox}
                                    name="remember_me"
                                    valuePropName="checked"
                                >
                                    <Checkbox
                                        className={ViewPropertyCss.meBox}
                                        name="remember_me"
                                    >
                                        Remember Me
                                    </Checkbox>
                                </Form.Item>

                                <Button
                                    onClick={onSubmitLogin}
                                    htmlType="submit_login"
                                    className={ViewPropertyCss.signIn}
                                    loading={loadings}
                                >
                                    Log In
                                </Button>
                            </div>
                        </Form>
                    </div>

                    <div className={ViewPropertyCss.forgotActive}>
                        <Link
                            href="/"
                            className={ViewPropertyCss.forgot}
                            onClick={(e) => e.preventDefault()}
                        >
                            <Space>
                                <Button
                                    className={ViewPropertyCss.signUpBtn}
                                    onClick={forgotLgDevice}
                                    onCancel={handleCancel}
                                >
                                    Forgot Password ?
                                </Button>
                            </Space>
                        </Link>

                        <div className={ViewPropertyCss.dont_link_parent}>
                            <p className={ViewPropertyCss.donthaveAcc}>
                                Dont you have an account?
                            </p>
                            {/* <Link
                href="/"
                className={ViewPropertyCss.registerLink}
                onClick={(e) => e.preventDefault()}
              >
                <Space>
                  <span
                    className={ViewPropertyCss.register}
                    onClick={registerLgDevice}
                  >
                    Register
                  </span>
                </Space>

              </Link> */}
                            <div className={ViewPropertyCss.guestCheckoutBtnParent}>
                                <Button
                                    disabled={!Available}
                                    className={ViewPropertyCss.guestCheckoutBtn}
                                    onClick={registerLgDevice}
                                >
                                    Guest Checkout
                                </Button>
                            </div>
                        </div>
                    </div>
                </Modal>

                {/* -----------      REGISTER SECTION IN LARGE DEVICE       -----------------*/}
                <Modal
                    title="Register"
                    footer={null}
                    open={registerModaInLgDevice}
                    onSignup={handleRegisterLgDevice}
                    onCancel={handleCancelRegisterLgDevice}
                    width={440}
                    centered={true} // Enable centering
                    className={ViewPropertyCss.headerReg}
                >
                    <Form
                        onFinish={onSubmitSignup}
                        form={RegisterFormRef}
                        name="register_form"
                        scrollToFirstError
                    >
                        <Col className={ViewPropertyCss.inputParent}>
                            {/*  FORM VALIDATION SIGNUP */}

                            {/* firstName */}
                            <Form.Item
                                className={ViewPropertyCss.form_items}
                                name="firstName"
                                tooltip="First Name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your first name!",
                                        whitespace: true,
                                    },
                                ]}
                            >
                                <Input
                                    name="firstName"
                                    prefix={<UserOutlined />}
                                    placeholder="Enter First Name"
                                    className={ViewPropertyCss.inputA}
                                />
                            </Form.Item>

                            {/* lastName */}
                            <Form.Item
                                className={ViewPropertyCss.form_items}
                                name="lastName"
                                tooltip="Last Name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your last name!",
                                        whitespace: true,
                                    },
                                ]}
                            >
                                <Input
                                    name="lastName"
                                    prefix={<UserOutlined />}
                                    placeholder="Enter Last Name"
                                    className={ViewPropertyCss.inputB}
                                />
                            </Form.Item>

                            {/* Username */}
                            <Form.Item
                                className={ViewPropertyCss.form_items}
                                name="user_name"
                                tooltip="What do you want others to call you?"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your User Name!",
                                        whitespace: true,
                                    },
                                ]}
                            >
                                <Input
                                    name="user_name"
                                    prefix={<UserOutlined />}
                                    placeholder="Enter User Name"
                                    className={ViewPropertyCss.inputB}
                                />
                            </Form.Item>

                            {/* EMAIL */}
                            <Form.Item
                                className={ViewPropertyCss.form_items}
                                name="email"
                                rules={[
                                    {
                                        type: "email",
                                        message: "The input is not valid E-mail!",
                                    },
                                    {
                                        required: true,
                                        message: "Please input your E-mail!",
                                    },
                                ]}
                            >
                                <Input
                                    name="email"
                                    prefix={<MailOutlined />}
                                    placeholder="Email"
                                    className={ViewPropertyCss.inputB}
                                />
                            </Form.Item>

                            {/* PASSWORD */}

                            <Form.Item
                                className={ViewPropertyCss.form_items}
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your password!",
                                    },
                                    {
                                        min: 5,
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input.Password
                                    name="password"
                                    prefix={<LockOutlined />}
                                    placeholder="Password"
                                    className={ViewPropertyCss.inputC}
                                />
                            </Form.Item>

                            {/* CONFIRM PASSWORD */}

                            <Form.Item
                                className={ViewPropertyCss.form_items}
                                name="confirm"
                                dependencies={["password"]}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: "Please confirm your password!",
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue("password") === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(
                                                new Error(
                                                    "The two passwords that you entered do not match!"
                                                )
                                            );
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined />}
                                    placeholder="Confirm Password"
                                    className={ViewPropertyCss.inputC}
                                />
                            </Form.Item>

                            {/* Mobile */}
                            <Form.Item
                                className={ViewPropertyCss.form_items}
                                name="mobile"
                                tooltip="Mobile Number"
                                rules={[
                                    {
                                        pattern: /[1-9]{1}[0-9]{7,11}$/,
                                        message: "The input is not valid mobile number!",
                                    },
                                    {
                                        required: true,
                                        message: "Please input your mobile number!",
                                    },
                                ]}
                            >
                                <Input
                                    name="mobile"
                                    prefix={<PhoneOutlined />}
                                    placeholder="Enter Mobile Number"
                                    className={ViewPropertyCss.inputD}
                                />
                            </Form.Item>
                        </Col>

                        <Row className={ViewPropertyCss.twoAgree}>
                            <Form.Item
                                className={ViewPropertyCss.form_items_checkbox}
                                name="conditions"
                                valuePropName="checked"
                                rules={[
                                    {
                                        validator: (_, value) =>
                                            value
                                                ? Promise.resolve()
                                                : Promise.reject(
                                                    new Error("Should accept Terms & Conditions")
                                                ),
                                    },
                                ]}
                            >
                                <Checkbox
                                    name="conditions"
                                    className={ViewPropertyCss.agreeOptionA}
                                >
                                    I agree with your Terms & Conditions
                                </Checkbox>
                            </Form.Item>
                            <Form.Item
                                className={ViewPropertyCss.form_items_checkbox}
                                name="privacy"
                                valuePropName="checked"
                                rules={[
                                    {
                                        validator: (_, value) =>
                                            value
                                                ? Promise.resolve()
                                                : Promise.reject(
                                                    new Error("Should accept Privacy & Policy")
                                                ),
                                    },
                                ]}
                            >
                                <Checkbox
                                    name="privacy"
                                    className={ViewPropertyCss.agreeOptionB}
                                >
                                    I agree with your Privacy Policy
                                </Checkbox>
                            </Form.Item>
                        </Row>
                        <Form.Item>
                            <div className={ViewPropertyCss.registBtnParent}>
                                <Button
                                    htmlType="submit_signup"
                                    loading={loadings}
                                    className={ViewPropertyCss.registerBtn}
                                >
                                    Register
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </Modal>

                {/* -----------       FORGET PASSWORD SECTION IN LARGE DEVICE     -----------------*/}

                <Modal
                    title="Forgot Password"
                    footer={null}
                    open={forgotModalLgDevice}
                    onSignup={handleForgotLgDevice}
                    onCancel={handleCancelForgotLgDevice}
                    width={600}
                    centered={true} // Enable centering
                    className={ViewPropertyCss.headerForgot}
                >
                    <ForgotPassword />
                </Modal>

                <Container>
                    <div className={ViewPropertyCss.view_prop_bannerimg_main_container}>
                        <div className={ViewPropertyCss.view_prop_bannerimg_container}>
                            <Image.PreviewGroup>
                                <div className={ViewPropertyCss.view_prop_image_div_1}>

                                    <Image
                                        alt="Golf group"
                                        loading="lazy"
                                        className={ViewPropertyCss.view_prop_bannerimg}
                                        src={
                                            SpecificPropAPIData?.images && SpecificPropAPIData?.images[0] || GirlGroupBannerImage
                                        }
                                        fill="true"
                                        fallback="data:image/png;base64,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"
                                    ></Image>
                                </div>
                                <div className={ViewPropertyCss.view_prop_image_div_2}>
                                    <Image
                                        alt="Golf group"
                                        loading="lazy"
                                        className={ViewPropertyCss.view_prop_bannerimg}
                                        src={
                                            SpecificPropAPIData?.images && SpecificPropAPIData?.images[1] ||
                                            GirlGroupBannerImage
                                        }
                                        fill="true"
                                        fallback="data:image/png;base64,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"
                                    ></Image>
                                </div>
                                <div className={ViewPropertyCss.view_prop_image_div_3}>
                                    <Image
                                        alt="Golf group"
                                        loading="lazy"
                                        className={ViewPropertyCss.view_prop_bannerimg}
                                        src={
                                            SpecificPropAPIData?.images && SpecificPropAPIData?.images[2] ||
                                            GirlGroupBannerImage
                                        }
                                        fill="true"
                                        fallback="data:image/png;base64,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"
                                    ></Image>
                                </div>
                                <div className={ViewPropertyCss.view_prop_image_div_4}>
                                    <Image
                                        alt="Golf group"
                                        loading="lazy"
                                        className={ViewPropertyCss.view_prop_bannerimg}
                                        src={
                                            SpecificPropAPIData?.images && SpecificPropAPIData?.images[3] ||
                                            GirlGroupBannerImage
                                        }
                                        fill="true"
                                        fallback="data:image/png;base64,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"
                                    ></Image>
                                    <div className={ViewPropertyCss.viewGallery}>
                                        <NextImage
                                            src="/images/vector/menu.png"
                                            alt="menu"
                                            width={14}
                                            height={14}
                                            className={ViewPropertyCss.iconEye}
                                        />
                                        <a href="#gallery" className={ViewPropertyCss.showAllPhoto} onClick={loadMore} >
                                            Show all photos
                                        </a>
                                    </div>
                                </div>
                                <div className={ViewPropertyCss.view_prop_image_div_5}>
                                    <Image
                                        alt="Golf group"
                                        loading="lazy"
                                        className={ViewPropertyCss.view_prop_bannerimg}
                                        src={
                                            SpecificPropAPIData?.images && SpecificPropAPIData?.images[4] ||
                                            GirlGroupBannerImage
                                        }
                                        fill="true"
                                        fallback="data:image/png;base64,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"
                                    ></Image>
                                </div>
                            </Image.PreviewGroup>
                        </div>
                    </div>
                </Container>

                {/* PROP AMENITITES SECTION START HERE */}
                <Container>
                    <Row className={ViewPropertyCss.parentRow}>
                        <Col md={8}>
                            <Tabs defaultActiveKey="1" items={items} />
                        </Col>

                        {/*  ------------    Total price box    ----------   */}
                        <Col md={4} className={ViewPropertyCss.backgroundWhite}>
                            <div className={ViewPropertyCss.totalParent}>
                                <div className={ViewPropertyCss.totalPrice}>
                                    <div className={ViewPropertyCss.amount}>
                                        <p className={ViewPropertyCss.starting_from_text}>
                                            Starting From
                                        </p>
                                        <h4 className={ViewPropertyCss.totalTitle_h5}>
                                            $
                                            {StartingFromPrice
                                                ? StartingFromPrice >= 0.5
                                                    ? Math.ceil(StartingFromPrice)
                                                    : Math.floor(StartingFromPrice)
                                                : 0}
                                            <span className={ViewPropertyCss.night_price}>night</span>
                                        </h4>
                                    </div>
                                </div>
                            </div>
                            <hr className={ViewPropertyCss.horizonaline} />
                            {Available ? (
                                <p className={ViewPropertyCss.date_avail_text}>
                                    Your Dates are available!
                                </p>
                            ) : (
                                ""
                            )}
                            {NotAvailable ? (
                                <p className={ViewPropertyCss.date_not_avail_text}>
                                    Your Dates are not available!
                                </p>
                            ) : (
                                ""
                            )}
                            <div className={ViewPropertyCss.inner_input_date_picker}>
                                <div style={{ width: "100%" }}>
                                    <Form name="control-hooks" layout="horizontal" form={form}>
                                        <Form.Item
                                            name="date_picker"
                                            className={
                                                ViewPropertyCss.inner_input_date_picker_form_item
                                            }
                                        >
                                            <RangePicker
                                                disabled={DisableCalendar}
                                                placeholder={["Check-In", "Check-Out"]}
                                                className={ViewPropertyCss.inner_input_date_picker}
                                                onChange={OnChangeDateInput}
                                                format={"MM-DD-YYYY"}
                                                defaultValue={defaultDateValue}
                                                disabledDate={(current) => {
                                                    const formattedDate = current.format("YYYY-MM-DD");
                                                    if (formattedDate === startDate) {
                                                        return true;
                                                    }
                                                    if (PropertyType === "Nextpax") {
                                                        return !AvailDateNextpax?.includes(formattedDate);
                                                    } else if (PropertyType === "Rental") {
                                                        return !AvailDateRental?.includes(formattedDate);
                                                    }
                                                }}
                                                onCalendarChange={OnCalendarDateSelect}
                                                renderExtraFooter={() =>
                                                    // Show the minStay in the footer of the RangePicker

                                                    CalendarFooterMinStay?.restrictions?.minStay ||
                                                        CalendarFooterMinStay?.MinStay ? (
                                                        <div
                                                            className={
                                                                ViewPropertyCss.inner_input_date_picker_footer_p
                                                            }
                                                        >
                                                            {" "}
                                                            Minimum stay for{" "}
                                                            <span
                                                                className={
                                                                    ViewPropertyCss.inner_input_date_picker_footer_span
                                                                }
                                                            >
                                                                {dayjs(
                                                                    CalendarFooterMinStay?.date ||
                                                                    CalendarFooterMinStay?.Date
                                                                ).format("MM-DD-YYYY")}
                                                            </span>{" "}
                                                            is{" "}
                                                            <span
                                                                className={
                                                                    ViewPropertyCss.inner_input_date_picker_footer_span
                                                                }
                                                            >
                                                                {CalendarFooterMinStay?.restrictions?.minStay ||
                                                                    CalendarFooterMinStay?.MinStay}{" "}
                                                                nights
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )
                                                }
                                                onOpenChange={(res) => {
                                                    if (res) {
                                                        const date1 =
                                                            SaveDateInState[0] ||
                                                            dayjs().startOf("month").subtract(2, "M");
                                                        const date2 =
                                                            SaveDateInState[1] ||
                                                            dayjs().endOf("month").add(2, "M");
                                                        FetchAvailableDate(date1, date2);
                                                    }
                                                }}
                                                onPanelChange={(current) => {
                                                    const currentdata = current[0] || current[1];

                                                    const date1 = dayjs(
                                                        new Date(currentdata.year(), currentdata.month(), 1)
                                                    )
                                                        .subtract(2, "M")
                                                        .format("MM-DD-YYYY");
                                                    const date2 = dayjs(
                                                        new Date(currentdata.year(), currentdata.month(), 1)
                                                    )
                                                        .add(2, "M")
                                                        .format("MM-DD-YYYY");
                                                    setSaveDateInState([date1, date2]);
                                                    FetchAvailableDate(date1, date2);
                                                }}
                                            />
                                            {DisableCalendar ? (
                                                <p className={ViewPropertyCss.please_select_guest_text}>
                                                    Please select guests!
                                                </p>
                                            ) : (
                                                ""
                                            )}
                                        </Form.Item>
                                    </Form>
                                </div>
                            </div>

                            <hr />

                            <Dropdown
                                onClick={() => setShowGuestDropDown(true)}
                                className={ViewPropertyCss.dropdown_parent}
                            >
                                <Dropdown.Toggle
                                    className={ViewPropertyCss.guest}
                                    id="dropdown-basic"
                                >
                                    {adult + child + infant + pet} Guests
                                </Dropdown.Toggle>

                                {ShowGuestDropDown ? (
                                    <Dropdown.Menu
                                        ref={ElementRef}
                                        className={ViewPropertyCss.adultChild}
                                    >
                                        <div className={ViewPropertyCss.increase}>
                                            <div>
                                                <Dropdown.Item href="#/action-1">
                                                    {" "}
                                                    <span className={ViewPropertyCss.ageName}>
                                                        {adult} Adults
                                                    </span>
                                                </Dropdown.Item>
                                            </div>

                                            <div className={ViewPropertyCss.geust_incri_btns_div}>
                                                <Button className={ViewPropertyCss.increaseAdult}>
                                                    <div
                                                        className={ViewPropertyCss.decreasebtn}
                                                        onClick={decAdult}
                                                    >
                                                        -
                                                    </div>
                                                    <div className={ViewPropertyCss.guest_count_div}>
                                                        {adult}
                                                    </div>
                                                    <div
                                                        className={ViewPropertyCss.increasebtn}
                                                        onClick={incAdult}
                                                    >
                                                        +
                                                    </div>
                                                </Button>
                                            </div>
                                        </div>

                                        <div className={ViewPropertyCss.increase}>
                                            <div>
                                                <Dropdown.Item href="#/action-2">
                                                    {" "}
                                                    <span className={ViewPropertyCss.ageName}>
                                                        {child} Children
                                                    </span>
                                                </Dropdown.Item>
                                            </div>

                                            <div className={ViewPropertyCss.geust_incri_btns_div}>
                                                <Button className={ViewPropertyCss.increaseAdult}>
                                                    <div
                                                        className={ViewPropertyCss.decreasebtn}
                                                        onClick={decChild}
                                                    >
                                                        -
                                                    </div>
                                                    <div className={ViewPropertyCss.guest_count_div}>
                                                        {child}
                                                    </div>
                                                    <div
                                                        className={ViewPropertyCss.increasebtn}
                                                        onClick={incChild}
                                                    >
                                                        +
                                                    </div>
                                                </Button>
                                            </div>
                                        </div>

                                        {/* <div className={ViewPropertyCss.increase}>
                      <div>
                        <Dropdown.Item href="#/action-3">
                          {" "}
                          <span className={ViewPropertyCss.ageName}>
                            {infant} Infants
                          </span>
                        </Dropdown.Item>
                      </div>

                      <div className={ViewPropertyCss.geust_incri_btns_div}>
                        <Button className={ViewPropertyCss.increaseAdult}>
                          <div
                            className={ViewPropertyCss.decreasebtn}
                            onClick={decInfant}
                          >
                            -
                          </div>
                          <div className={ViewPropertyCss.guest_count_div}>
                            {infant}
                          </div>
                          <div
                            className={ViewPropertyCss.increasebtn}
                            onClick={incInfant}
                          >
                            +
                          </div>
                        </Button>
                      </div>
                    </div> */}

                                        <div className={ViewPropertyCss.increase}>
                                            <div>
                                                <Dropdown.Item href="#/action-4">
                                                    {" "}
                                                    <span className={ViewPropertyCss.ageName}>
                                                        {pet} Pets
                                                    </span>
                                                </Dropdown.Item>
                                            </div>

                                            <div className={ViewPropertyCss.geust_incri_btns_div}>
                                                <Button className={ViewPropertyCss.increaseAdult}>
                                                    <div
                                                        className={ViewPropertyCss.decreasebtn}
                                                        onClick={decPet}
                                                    >
                                                        -
                                                    </div>
                                                    <div className={ViewPropertyCss.guest_count_div}>
                                                        {pet}
                                                    </div>
                                                    <div
                                                        className={ViewPropertyCss.increasebtn}
                                                        onClick={incPet}
                                                    >
                                                        +
                                                    </div>
                                                </Button>
                                            </div>
                                        </div>
                                        {/* <div className={ViewPropertyCss.geust_save_btn_div}>
                      <Button
                        loading={SaveGuestBtnLoading}
                        onClick={() => SaveTotalGuests(false)}
                        className={ViewPropertyCss.geust_save_btn}
                      >
                        Save
                      </Button>
                    </div> */}
                                    </Dropdown.Menu>
                                ) : (
                                    ""
                                )}
                            </Dropdown>
                            <hr />

                            {/* STATIC TOTAL DIV */}
                            {ShowTotalPaymentTextStatic ? (
                                <>
                                    <div className={ViewPropertyCss.total_price_main_div}>
                                        <div className={ViewPropertyCss.total_price_text_div}>
                                            {/* <h5 className={ViewPropertyCss.total_price_text}>
                        $
                        {`${StartingFromPrice
                          ? StartingFromPrice >= 0.5
                            ? Math.ceil(StartingFromPrice)
                            : Math.floor(StartingFromPrice)
                          : 0
                          }
                         x ${NightsCounter} night`}
                      </h5> */}
                                            <h5 className={ViewPropertyCss.total_price_text}>
                                                Total Charges
                                            </h5>
                                            <p className={ViewPropertyCss.total_price_inc_tax_text}>
                                                Includes taxes and fees
                                            </p>
                                        </div>
                                        <div className={ViewPropertyCss.total_price_text_div}>
                                            {/* <p className={ViewPropertyCss.total_price}>
                        {" "}
                        <strong>
                          $
                          {StartingFromPrice * NightsCounter
                            ? Math.round(StartingFromPrice * NightsCounter)
                            : 0}
                        </strong>{" "}
                      </p> */}
                                            <p className={ViewPropertyCss.total_price}>
                                                {" "}
                                                <strong>
                                                    $
                                                    {totalCharges}
                                                </strong>{" "}
                                            </p>

                                            <p
                                                onClick={() => {
                                                    ShowOtherDetailsStatic
                                                        ? setShowOtherDetailsStatic(false)
                                                        : setShowOtherDetailsStatic(true);
                                                }}
                                                className={ViewPropertyCss.total_price_view_details}
                                            >
                                                {ShowOtherDetailsStatic ? "Hide" : "View"} details
                                            </p>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                ""
                            )}

                            {/* STATIC TOTAL CHARGES DIV */}
                            {ShowOtherDetailsStatic ? (
                                <>
                                    <PriceBreakDown
                                        data={{
                                            NextpaxPriceBreakDown: NextPaxFinalAvailPriceBreakDown,
                                            RentalpaxPriceBreakDown: RentalFinalAvailPriceBreakDown,
                                            property_type: PropertyType,
                                            StartingFromPrice: StartingFromPrice,
                                            NightsCounter: NightsCounter
                                        }}
                                    />
                                </>
                            ) : (
                                ""
                            )}

                            {IsReserveVisible ? (
                                <div>
                                    <div className={ViewPropertyCss.bookParent}>
                                        <Button
                                            disabled={!Available}
                                            className={ViewPropertyCss.bookNow}
                                            onClick={
                                                PropertyType === "Rental" ? CreatePatymentIntent : test
                                            }
                                        >
                                            Reserve
                                        </Button>
                                    </div>

                                    <Modal
                                        title="Reservation Payment"
                                        open={newPayment}
                                        onCancel={handleCancel}
                                        footer={null}
                                        centered={true}
                                        maskClosable={false} // Set maskClosable to false to disable closing on outside click
                                    >

                                        <div className={ViewPropertyCss.paymentMainBlock}>
                                            <div className={ViewPropertyCss.paymentLogoPrice}>
                                                <div>
                                                    <NextImage src={GolfHomMobileMenuLogo} alt="Ventify logo"></NextImage>
                                                </div>
                                                <div>
                                                    <div>
                                                        <strong>{`Amount: `}<span className={ViewPropertyCss.paymentPrice}>{`$${totalCharges}`}</span></strong>
                                                    </div>
                                                    <div className={ViewPropertyCss.StartingFromPrice}>
                                                        {`Avg/nt: `}<span >$
                                                            {StartingFromPrice
                                                                ? StartingFromPrice >= 0.5
                                                                    ? Math.ceil(StartingFromPrice)
                                                                    : Math.floor(StartingFromPrice)
                                                                : 0}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <strong>{SpecificPropAPIData?.name}</strong>
                                            </div>
                                            <div>
                                                <strong>Reservation Date:</strong> {BookingDate[0]} to {BookingDate[1]}
                                            </div>
                                            <div>
                                                <strong>Address:</strong> {SpecificPropAPIData.full_address}
                                            </div>
                                        </div>

                                        <PaymentPopUp
                                            data={{
                                                propertyId: SpecificPropAPIData?.id,
                                                poperty_name: SpecificPropAPIData?.name,
                                                from: BookingDate[0],
                                                to: BookingDate[1],
                                                total_guests:
                                                    Params.guests || adult + child + infant + pet,
                                                children: child,
                                                adult: adult,
                                                babies: infant,
                                                pets: pet,
                                                total_charges_nextpax: TotalChargesNextpax,
                                                total_charges_rental: TotalChargesRental,
                                                property_type: PropertyType,
                                                paymentIntent:
                                                    PropertyType === "Nextpax"
                                                        ? PaymentIntentObjNextpax
                                                        : PaymentIntentObjRental,
                                            }}
                                        />
                                    </Modal>

                                    <div className={ViewPropertyCss.contactParent}>
                                        {/* -----------      CONTACT TO HOST SECTION        -----------------*/}
                                        <Modal
                                            title="Contact Ventify"
                                            footer={null}
                                            open={isModalOpen}
                                            onSignup={OnclickHideContactToHost}
                                            onCancel={handleCancelContact}
                                            width={440}
                                            centered={true}
                                        >
                                            <ContactToHost
                                                HideContactHostPopUp={OnclickHideContactToHost} propertyID={propertyID}
                                            />
                                        </Modal>
                                        <Space>
                                            <Button
                                                className={ViewPropertyCss.contact}
                                                onClick={OnclickShowContactToHost}
                                            >
                                                Contact Ventify
                                            </Button>
                                        </Space>
                                    </div>
                                </div>
                            ) : (
                                ""
                            )}
                        </Col>
                    </Row>
                </Container>

                {/* GALLERY SECTION STARTS HERE */}
                <Container className={ViewPropertyCss.carasoul_section} id="gallery">
                    <div>
                        <div className={ViewPropertyCss.carasoul_section_inner_div}>
                            <Image.PreviewGroup>
                                {allImages.slice(0, displayImages).map(
                                    (OtherImage, OtherImageUrlIndex) => {
                                        return (
                                            <Image
                                                key={OtherImageUrlIndex}
                                                className={ViewPropertyCss.carasoul_images}
                                                fill="true"
                                                loading="lazy"
                                                src={OtherImage}
                                                alt={`image ${OtherImageUrlIndex}`}
                                                fallback="data:image/png;base64,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"
                                            ></Image>
                                        );
                                    }
                                )}
                            </Image.PreviewGroup>
                        </div>
                        {displayImages < allImages.length ? (
                            <Button onClick={loadMore} className={ViewPropertyCss.showAllImages}>
                                <NextImage
                                    src="/images/vector/menu.png"
                                    alt="menu"
                                    width={14}
                                    height={14}
                                    className={ViewPropertyCss.iconEye}
                                />{" "} <span className={ViewPropertyCss.showAllImagesSpan}></span>Show all photos</Button>
                        ) : null}
                    </div>
                </Container>

                {/* FEATURE SECTION STARTS HERE */}
                {SpecificPropAPIData?.amenities?.length === 0 ? (
                    ""
                ) : (
                    <div className={ViewPropertyCss.feature_section}>
                        <Container>
                            <h5 className={ViewPropertyCss.feature_section_heading}>
                                Features
                            </h5>
                            <FeatureSection data={SpecificPropAPIData} />
                        </Container>
                    </div>
                )}

                {/* THINGS TO KNOW SECTION  */}
                <div className={ViewPropertyCss.things_to_know_section}>
                    <Container>
                        <ThingsToKnow data={SpecificPropAPIData} />
                    </Container>
                </div>
                {/* MAP SECTION STARTS HERE */}
                <div className={ViewPropertyCss.map_section}>
                    <Container>
                        <div className={ViewPropertyCss.map_section_main_container}>
                            <Map data={[SpecificPropAPIData]} />
                        </div>
                    </Container>
                </div>

                {/* VIDEO SECTION STARTS HERE */}
                {SpecificPropAPIData?.videoUrl && isValidUrl(SpecificPropAPIData?.videoUrl) ? (
                    <div className={ViewPropertyCss.video_section}>
                        <Container>
                            <h5 className={ViewPropertyCss.feature_section_heading}>Video</h5>
                            <div className={ViewPropertyCss.video_section_container}>
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={
                                        SpecificPropAPIData?.videoUrl
                                            ? SpecificPropAPIData?.videoUrl
                                            : "https://www.youtube.com/embed/aWKFpMRiMX4"
                                    }
                                    title="YouTube video player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </Container>
                    </div>
                ) : (
                    ""
                )}

                {/* SIMILAR PROPERTIES SECTION  */}
                <div className={SimilarPropertiesCss.similar_props_section}>
                    <Container>
                        <SimilarProperties data={SpecificPropAPIData} />
                    </Container>
                </div>

                {/*  -----------------------------           BOTTOM IMAGE SECTION         ----------------------------  */}
                <BottomSection />
            </div>
        </>
    );
};


export async function getServerSideProps(context) {
    const Params = context.query;

    let props = {
        Params
    };

    return {
        props: props
    }
}
export default ViewProperty;