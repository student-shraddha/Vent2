import React, { useState, useRef, useEffect } from "react";
const CommonDropDown = ({
    disable,
    options,
    drop_down_width,
    initial_value,
    onChangeDate,
    loading,
    // New prop to handle loading state
}) => {
    const InputRefDropDownPanel = useRef(null);
    const DropdownRef = useRef(null);
    const [IsOpenDropDown, setIsOpenDropDown] = useState(false);
    const [SelectedOption, setSelectedOption] = useState(initial_value);
    // Update the selected value if it's provided by the parent
    useEffect(() => {
        if (initial_value !== undefined && initial_value !== SelectedOption) {
            setSelectedOption(initial_value);
        }
    }, [initial_value]);
    const ToggleDropdown = () => {
        setIsOpenDropDown(!IsOpenDropDown);
    };
    const OnOptionSelect = (option) => {
        // console.log(option,"commondropdown check")
        setSelectedOption(option.value);
        onChangeDate(option);
        setIsOpenDropDown(false);
    };
    const OnElementClick = (e) => {
        if (
            InputRefDropDownPanel.current &&
            !InputRefDropDownPanel.current.contains(e.target)
        ) {
            setIsOpenDropDown(false);
        }
    };
    useEffect(() => {
        document.addEventListener("click", OnElementClick);
        return () => {
            document.removeEventListener("click", OnElementClick);
        };
    }, []);
    useEffect(() => {
        const DropdownElement = DropdownRef.current;
        const PositionDropdown = () => {
            if (DropdownElement && IsOpenDropDown) {
                const ButtonElement = document.getElementById("common-dropdown");
                const ButtonRect = ButtonElement.getBoundingClientRect();
                const SpaceBelowButton = window.innerHeight - 200 - ButtonRect.bottom;
                const DropdownHeight = DropdownElement.clientHeight;
                if (SpaceBelowButton < DropdownHeight) {
                    DropdownElement.style.top = `-${DropdownHeight + 14}px`;
                } else {
                    DropdownElement.style.top = "100%";
                }
            }
        };
        window.addEventListener("scroll", PositionDropdown);
        return () => {
            window.removeEventListener("scroll", PositionDropdown);
        };
    }, [IsOpenDropDown]);
    return (
        <div className={`relative inline-block text-left  w-${drop_down_width}`}>
            <div
                id="common-dropdown"
                ref={InputRefDropDownPanel}
                className={`w-${drop_down_width}`}
            >
                <button
                    disabled={disable}
                    type="button"
                    onClick={ToggleDropdown}
                    className={`border disabled:bg-gray-50 disabled:text-gray-400 rounded bg-white px-4 py-2  w-${drop_down_width} flex items-center justify-between hover:text-primary transition-all duration-[0.3s]`}
                >
                    <span className="truncate text-xs md:text-base">
                        {/* {doctorDetailsPropsSendFromProfessional?.doctor_detail?.practice_size ?? SelectedOption} */}
                        {SelectedOption}
                    </span>
                    <svg
                        className={`ml-2 transition-transform ${IsOpenDropDown ? "transform rotate-180" : ""
                            }`}
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="#1E7BAE"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 15a1 1 0 01-.707-.293l-5-5a1 1 0 111.414-1.414L10 12.586l4.293-4.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-.707.293z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>
            {IsOpenDropDown && (
                <div
                    ref={DropdownRef}
                    className={`origin-top-right absolute z-50 right-31 mt-2 w-${drop_down_width} rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`}
                >
                    <div className="py-1 max-h-52 overflow-auto">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            Object.entries(options)
                                .sort()
                                .map(([key, value]) => (
                                    <button
                                        key={key}
                                        onClick={() => OnOptionSelect({ key, value })}
                                        className={` ${SelectedOption === value
                                            ? "bg-primary text-white"
                                            : "text-gray-900"
                                            } block px-4 py-2 text-sm hover:bg-primary hover:text-white w-full text-left w-${drop_down_width}`}
                                    >
                                        {value}
                                    </button>
                                ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
export default CommonDropDown;