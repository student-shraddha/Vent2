import Breadcrumb from "@/components/host/Common/Breadcrumb";
import Pagination from "@/components/host/Common/Pagination";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import axiosInstance from "@/utils/axiosInstance";
import CustomDropdown from "@/components/host/Common/Dropdown/CustomDropdown";
import Loading from "@/components/host/Common/Loader/loading";
import SearchSvg from "@/components/host/utils/Images/SearchSvg";
import CommonButton from "@/components/host/Common/Buttons/CommonButton";
import debounce from 'lodash/debounce';

const HostProperties = () => {

    const { data: session, status } = useSession();

    const router = useRouter();
    const pageSize = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [properties, setProperties] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    // Fetch host properties
    const getAllHostProperties = async () => {
        setIsDataLoaded(false)
        try {

            const queryParams = {
                page: currentPage,
                limit: pageSize,
                ...(searchTerm && { searchQuery: searchTerm })
            }
            const urlSearchParams = new URLSearchParams(queryParams);
            const queryParamsString = urlSearchParams.toString();
            const response = await axiosInstance.get(`/v1/host/property?${queryParamsString}`, {
                headers: { Authorization: `Bearer ${session?.user?.token}` }
            });

            setIsDataLoaded(true)
            if (response.status === 200) {
                setProperties(response.data.data);
                setTotalCount(response.data.count);
            }

        } catch (e) {
            setIsDataLoaded(true)
            console.log(e)
        }
    }

    // Fetch properties on mount
    useEffect(() => {
        getAllHostProperties();
    }, [currentPage, searchTerm]);

    // Throttle the handleSearchChange function
    const throttledHandleSearchChange = debounce((value) => {
        setSearchTerm(value);
        setCurrentPage(1); // Reset page number when search query changes
    }, 500);


    const handleSearchChange = (event) => {
        const { value } = event.target;
        throttledHandleSearchChange(value);
    };

    return (
        <>
            <Breadcrumb title={"My Properties"} subtitle={"Search, view and edit all your properties"} />

            <div className="w-full pt-4 grid grid-cols-1 items-center px-3">

                <div className="flex items-center gap-4 justify-end">
                    <div className='flex items-center bg-white w-[40%] max-w-[400px] px-2 py-3.5 font-Nunito border-2 rounded border-solid border-[#D7D7D7]'>
                        <input
                            className='appearance-none rounded-md focus-visible:none focus:outline-none pl-1 w-full bg-white  placeholder:text-primary-grayPlaceholder text-black border-0 text-base placeholder:text-[13px] not-italic font-normal ml-2'
                            placeholder={"Search Property"}
                            onChange={handleSearchChange} />
                        <SearchSvg />
                    </div>
                    <CommonButton className={`bg-primary-baseRed font-Nunito border-2 border-solid border-primary-baseRed text-white text-sm font-bold px-4 py-3.5 cursor-pointer rounded-lg  transition`}
                        onClick={() => router.push("/host/properties/add-new-property")}>
                        <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
                                <g clipPath="url(#clip0_405_20477)">
                                    <path d="M7 0.302734C6.69058 0.302734 6.39383 0.425651 6.17504 0.644443C5.95625 0.863236 5.83333 1.15998 5.83333 1.4694V6.13607H1.16667C0.857247 6.13607 0.560501 6.25898 0.341709 6.47778C0.122917 6.69657 0 6.99331 0 7.30273C0 7.61215 0.122917 7.9089 0.341709 8.12769C0.560501 8.34648 0.857247 8.4694 1.16667 8.4694H5.83333V13.1361C5.83333 13.4455 5.95625 13.7422 6.17504 13.961C6.39383 14.1798 6.69058 14.3027 7 14.3027C7.30942 14.3027 7.60616 14.1798 7.82496 13.961C8.04375 13.7422 8.16667 13.4455 8.16667 13.1361V8.4694H12.8333C13.1428 8.4694 13.4395 8.34648 13.6583 8.12769C13.8771 7.9089 14 7.61215 14 7.30273C14 6.99331 13.8771 6.69657 13.6583 6.47778C13.4395 6.25898 13.1428 6.13607 12.8333 6.13607H8.16667V1.4694C8.16667 1.15998 8.04375 0.863236 7.82496 0.644443C7.60616 0.425651 7.30942 0.302734 7 0.302734Z" fill="white" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_405_20477">
                                        <rect width="14" height="14" fill="white" transform="translate(0 0.302734)" />
                                    </clipPath>
                                </defs>
                            </svg>
                            <div>New Property</div>
                        </div>
                    </CommonButton>
                </div>
            </div>
            <div className='w-full mt-4 mb-5'>

                <table className="table-auto w-full  rounded  border-separate border-spacing-y-2">
                    <thead>
                        <tr className="border-[#e8e8e8]">
                            <th className={`p-3 border-y-2 text-black text-sm font-bold`}>ID</th>
                            <th className={`p-3 border-y-2 text-black text-sm font-bold`}>Property Name</th>
                            <th className={`p-3 border-y-2 text-black text-sm font-bold`}>Property Image</th>
                            <th className={`p-3 border-y-2 text-black text-sm font-bold`}>Location</th>
                            <th className={`p-3 border-y-2 text-black text-sm font-bold`}>Status</th>
                            <th className={`p-3 border-y-2 text-black text-sm font-bold`}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        {!isDataLoaded ? (
                            <tr key={0} className="border-[#e8e8e8]">
                                <td colSpan={6}><Loading /></td>
                            </tr>
                        ) : (
                            properties.length ? properties.map((i, inx) =>
                                <tr key={inx} className="border-[#e8e8e8]">
                                    <td className={`p-2 ${inx === 0 ? "border-b" : "border-y"} text-sm not-italic font-medium text-black`}>{i.id}</td>
                                    <td className={`p-2 ${inx === 0 ? "border-b" : "border-y"} text-sm not-italic font-medium text-black`}>{i.name}</td>
                                    <td className={`p-2 ${inx === 0 ? "border-b" : "border-y"} text-sm not-italic font-medium text-black  `}>
                                        <div className="w-16">
                                            <Image
                                                src={i.imageUrl}
                                                alt="selected"
                                                width={0}
                                                height={0}
                                                sizes="100vw"
                                                className="w-full h-auto rounded-2"
                                            />
                                        </div>

                                    </td>
                                    <td className={`p-2 ${inx === 0 ? "border-b" : "border-y"} text-sm not-italic font-medium text-black`}>{i.address}</td>
                                    <td className={`p-2 ${inx === 0 ? "border-b" : "border-y"} text-sm not-italic font-medium text-black`}>
                                        <div
                                            className={`
                                                    rounded-2xl text-sm font-medium py-0.5 px-2.5 text-center w-max
                                                    ${i.status === "Active" ? "border-1 border-solid border-primary-baseGreen bg-primary-baseGreen/50 text-white" : (i.status === "Draft" ? "border-1 border-solid border-primary-baseGray bg-primary-baseGray/50 text-white" : "border-1 border-solid border-primary-baseRed bg-[#9E7B743B] text-primary-baseRed")} `
                                            }
                                        >{i.status}</div>
                                    </td>
                                    <td className={`p-2 ${inx === 0 ? "border-b" : "border-y"} text-sm not-italic font-medium text-black`}>
                                        <CustomDropdown
                                            options={["View", "Edit"]}
                                            initial_value={""}
                                            onOptionSelected={(e) => {
                                                if (e.value === "View") {
                                                    router.push(`/host/properties/all-properties/${i.slug}`)
                                                } else if (e.value === "Edit") {
                                                    router.push(`/host/properties/update-property/${i.slug}`)
                                                }
                                            }}
                                            drop_down_width={48}
                                            className={'border-0'}
                                        />

                                    </td>

                                </tr>
                            ) : (<tr key={0} className="border-[#e8e8e8]">
                                <td colSpan={6} className={`p-3 border-b text-sm not-italic font-semibold text-black text-center`}>No property found</td>
                            </tr>)
                        )}

                    </tbody>
                </table>
                <Pagination
                    items={totalCount} // 100
                    currentPage={currentPage} // 1
                    pageSize={pageSize} // 10
                    onPageChange={onPageChange}
                />
            </div>
        </>
    );
};

export default HostProperties;
