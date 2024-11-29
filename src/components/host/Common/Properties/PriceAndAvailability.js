import React, { useState } from "react";
import Pricing from "./Pricing";
import ChargeProfile from "./ChargeProfile";
import Availability from "./Availability";

const Tab = ({ label, active, onClick }) => {
    return (
        <li className="me-2">
            <div
                className={`inline-block p-3 rounded-t-lg cursor-pointer ${active ? "!border-b-8 border-bottom !border-primary-baseRed" : ""}`}
                onClick={onClick}
            >
                {label}
            </div>
        </li>
    );
};

const tabs = [
    { label: "Availability" },
    { label: "Pricing" },
    { label: "Charge Profile" },
];


function PriceAndAvailability({ onSave, data, setData }) {

    // const [activeTab, setActiveTab] = useState(0);
    const [activeTab, setActiveTab] = useState(0);
    const switchTab = (index, label) => {
        setActiveTab(index);
    };

    const [blockedDates, setBlockedDates] = useState((data?.availability?.blocked_dates || []));

    const handleSubmit = () => {

        setData({ ...data, blocked_dates: blockedDates })
        // After validation done, can submit step
        onSave();
    }

    return (
        <>
            <div className="w-full h-auto flex flex-col items-center justify-start pt-3 px-2.5 ">
                <div className="w-full">

                    <div>
                        <div className="font-Nunito text-black font-semibold text-xl">
                            Price & Availability
                        </div>
                    </div>

                    <div className="flex  flex-wrap rounded-lg mt-4 w-full">
                        <div className="mb-4 border-bottom border-[#E4E4E4] w-full">
                            <ul className="flex flex-wrap -mb-1 text-base font-semibold text-center list-none text-black pl-0" >
                                {tabs.map((tab, index) => (
                                    <Tab
                                        key={index}
                                        label={tab.label}
                                        active={index === activeTab}
                                        onClick={() => switchTab(index, tab.label)}
                                    />
                                ))}
                            </ul>
                        </div>

                        {activeTab === 0 && (
                            <Availability blockedDates={blockedDates} setBlockedDates={setBlockedDates} />
                        )}
                        {activeTab === 1 && (
                            <Pricing data={data} setData={setData} />
                        )}
                        {activeTab === 2 && (
                            <ChargeProfile data={data} setData={setData} />
                        )}
                    </div>
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

export default PriceAndAvailability;