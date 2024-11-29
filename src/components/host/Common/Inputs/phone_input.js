import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { COUNTRIES } from "@/components/host/utils/constants/constants";

const PhoneInput = ({ onCountryCodeSelect, elementId, defaultValue = "us" }) => {
  const [SearchValue, setSearchValue] = useState("");
  const DropdownRef = useRef(null);
  const ElementRef = useRef(null);
  const SearchInputRef = useRef(null);
  const [IsOpenDropDown, setIsOpenDropDown] = useState(false);
  const [IsSearchFocused, setIsSearchFocused] = useState(false);
  const [SelectedOption, setSelectedOption] = useState(
    COUNTRIES.find((country) => country.code.toLowerCase() === (defaultValue || "us"))
  );

  useEffect(() => {
    onCountryCodeSelect(SelectedOption);
    return () => { };
  }, []);

  useEffect(() => {
    const DropdownElement = DropdownRef.current;

    const PositionDropdown = () => {
      if (DropdownElement && IsOpenDropDown) {
        const ButtonElement = document.getElementById("dropdown-button");
        const ButtonRect = ButtonElement.getBoundingClientRect();
        const SpaceBelowButton = window.innerHeight - 300 - ButtonRect.bottom;
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

  const ToggleDropdown = () => {
    setIsOpenDropDown(!IsOpenDropDown);
    if (IsOpenDropDown) {
      setSearchValue(""); // Clear search input when closing dropdown
    }
  };

  const OnOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpenDropDown(false);
    onCountryCodeSelect(option);
  };

  const OnElementClick = (e) => {
    if (
      ElementRef.current &&
      !ElementRef.current.contains(e.target) &&
      !SearchInputRef.current?.contains(e.target)
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

  const filteredCountries = COUNTRIES.filter((option) =>
    option.label.toLowerCase().includes(SearchValue.toLowerCase())
  );

  return (
    <div className="relative inline-block text-left h-fit">
      <button
        ref={ElementRef}
        type="button"
        id={elementId}
        onClick={ToggleDropdown}
        className="bg-transparent p-2 h-[40px] text-sm w-max flex items-center justify-between hover:text-primary transition-all duration-[0.3s]  border border-[#E9E9E9] rounded-md"
      >
        <Image
          loading="lazy"
          width={24}
          height={20}
          src={`https://flagcdn.com/36x27/${SelectedOption?.code.toLowerCase()}.png`}
          srcSet={`https://flagcdn.com/72x54/${SelectedOption?.code.toLowerCase()}.png 2x,
https://flagcdn.com/108x81/${SelectedOption?.code.toLowerCase()}.png 3x`}
          alt={"flag"}
          className="mr-1"
        />
        <span className="truncate">
          {SelectedOption.phone ? `+(${SelectedOption.phone})` : "Loading..."}
        </span>

        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className={`ml-1 transition-transform ${IsOpenDropDown ? "transform rotate-180" : ""
          }`}>
          <g clipPath="url(#clip0_405_14993)">
            <path d="M15.2283 3.61621H0.771773C0.0876705 3.61621 -0.260835 4.4423 0.229654 4.93279L7.45791 12.161C7.75478 12.4579 8.24527 12.4579 8.54228 12.161L15.7705 4.93279C16.2609 4.4423 15.9124 3.61621 15.2283 3.61621Z" fill="#828282" />
          </g>
          <defs>
            <clipPath id="clip0_405_14993">
              <rect width="16.0001" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </button>

      {IsOpenDropDown && (
        <div
          ref={DropdownRef}
          className="overflow-auto z-10 h-fit max-h-72  origin-top-right absolute right-31 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
        >
          <input
            ref={SearchInputRef}
            type="text"
            placeholder="Search..."
            value={SearchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className="text-sm sticky top-0 w-full px-4 py-2 mb-2 outline-none border-b  focus:outline-none focus:border-primary  appearance-none mt-[4px] border border-[#E9E9E9] rounded-md  h-[40px] focus-visible:outline-none p-2 font-Mulish placeholder:text-primary-grayPlaceholder text-primary-textGrey placeholder:text-sm disabled:bg-[#D9D9D9] "
          />
          <div className="py-1">
            {filteredCountries.length === 0 ? (
              <p className="px-4 py-2 text-center text-sm text-gray-400">
                No Options
              </p>
            ) : (
              <>
                {filteredCountries.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => OnOptionSelect(option)}
                    className={`${SelectedOption === option.label
                      ? "bg-primary-baseRed text-white"
                      : "text-primary-baseGrey"
                      } block px-4 py-2 text-sm hover:bg-primary-grayPlaceholder hover:text-white w-full text-left border-0`}
                  >
                    {option.label} ({option.code}) +{option.phone}
                  </button>
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PhoneInput;
