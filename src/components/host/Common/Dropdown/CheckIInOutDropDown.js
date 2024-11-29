import React, { useState, useRef, useEffect } from "react";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

const CheckIInOutDropDown = ({

}) => {

    const [adultCount, setAdultCount] = useState(0);
    const [childCount, setChildCount] = useState(0);

    return (
        <Menu as="div" className="relative inline-block text-left w-full">
            <div>
                <Menu.Button className="inline-flex w-full justify-between items-center gap-x-1.5 rounded-md bg-white py-4 px-3 text-sm shadow-sm ring-1 ring-inset ring-red hover:bg-gray-50 font-Nunito text-[#8A8A8A] font-medium border-1 border-solid border-[#F3F3F3]">
                    Guests
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <g clipPath="url(#clip0_405_8896)">
                            <path d="M9.5176 2.26019H0.482354C0.0547936 2.26019 -0.16302 2.7765 0.143533 3.08305L4.66116 7.60071C4.8467 7.78626 5.15325 7.78626 5.33888 7.60071L9.8565 3.08305C10.163 2.7765 9.94516 2.26019 9.5176 2.26019Z" fill="#8A8A8A" />
                        </g>
                        <defs>
                            <clipPath id="clip0_405_8896">
                                <rect width="10" height="10" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="p-4 flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <div className={`text-primary-baseRed block py-2 text-lg font-bold`}>
                                Adult
                            </div>
                            <div className="flex items-center justify-between text-primary-baseGray text-sm">
                                <div className="flex items-center justify-center border-1 border-solid border-[#E4E4E4] rounded-l-lg w-12 h-12 text-center"
                                    onClick={() => adultCount && setAdultCount((prev) => prev - 1)}>-</div>
                                <div className="flex items-center justify-center border-1 border-solid border-[#E4E4E4] w-16 h-12 text-center">{adultCount}</div>
                                <div className="flex items-center justify-center border-1 border-solid border-[#E4E4E4] rounded-r-lg w-12 h-12 text-center"
                                    onClick={() => setAdultCount((prev) => prev + 1)}>+</div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className={`text-primary-baseRed block py-2 text-lg font-bold`}>
                                Children
                            </div>
                            <div className="flex items-center justify-between text-primary-baseGray text-sm">
                                <div className="flex items-center justify-center border-1 border-solid border-[#E4E4E4] rounded-l-lg w-12 h-12 text-center" onClick={() => childCount && setChildCount((prev) => prev - 1)}>-</div>
                                <div className="flex items-center justify-center border-1 border-solid border-[#E4E4E4] w-16 h-12 text-center">{childCount}</div>
                                <div className="flex items-center justify-center border-1 border-solid border-[#E4E4E4] rounded-r-lg w-12 h-12 text-center" onClick={() => setChildCount((prev) => prev + 1)}>+</div>
                            </div>
                        </div>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};
export default CheckIInOutDropDown;