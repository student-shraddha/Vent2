import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'


export default function CustomDropdown({ options, className, drop_down_width, onOptionSelected, initial_value }) {

    const [SelectedOption, setSelectedOption] = useState(initial_value);
    const OnOptionSelect = (option) => {
        onOptionSelected(option);
        setSelectedOption(option.value);
    };
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className={`border disabled:bg-gray-50 disabled:text-gray-400 rounded bg-white px-4 py-2  w-${drop_down_width} flex items-center justify-between hover:text-primary transition-all duration-[0.3s] ${className}`}>
                    <div className="text-black text-xl font-medium">...</div>
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
                <Menu.Items className="absolute right-0 z-10 mt-2  origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        {Object.entries(options)
                            .sort()
                            .map(([key, value]) => (
                                <Menu.Item key={key}>
                                    {({ active }) => (
                                        <button
                                            key={key}
                                            onClick={() => OnOptionSelect({ key, value })}
                                            className={` ${active
                                                ? "bg-primary-baseRed text-white"
                                                : "text-gray-900"
                                                } border-0 block px-4 py-2 text-sm hover:bg-primary-baseRed hover:text-white w-full text-left w-${drop_down_width}`}
                                        >
                                            {value}
                                        </button>
                                    )}
                                </Menu.Item>
                            )
                            )}

                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}