import { Fragment, useEffect, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'

function CustomSelect({ defaultValue = '', label, placeholder, optionalFunction = () => { }, listItem = [], disabled = false }) {
    const [selected, setSelected] = useState('')
    const [query, setQuery] = useState('')

    const filteredlistItem =
        query === ''
            ? listItem
            : listItem.filter((item) =>
                item.name
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(query.toLowerCase().replace(/\s+/g, ''))
            )
    useEffect(() => {

        if (defaultValue !== '' && defaultValue !== undefined && defaultValue !== null) {
            listItem.forEach(item => item.id.toString().toLowerCase() === defaultValue.toString().toLowerCase() ? setSelected(item) : null)
        } else {
            setSelected('')
        }
    }, [defaultValue]);

    return (
        <div className="w-full">
            <Combobox value={selected} onChange={(e) => { setSelected(e); /*console.log(e.id.toString().toLowerCase());*/ optionalFunction(e) }} nullable>
                <div className="relative mt-1">
                    <Combobox.Label className="block tracking-[0.7px] mb-1 font-Nunito text-primary-baseGray text-base font-medium">
                        {label}
                    </Combobox.Label>
                    <div className="relative w-full cursor-default flex items-center px-1 overflow-hidden rounded-lg bg-white text-left border border-[#E9E9E9] focus-visible:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                        {/* <SearchSvg /> */}
                        <Combobox.Input
                            className="w-full border-none py-2 pl-3 font-Mulish pr-10 text-sm leading-5 text-primary-baseGray focus:ring-0 focus-visible:outline-none placeholder:text-primary-grayPlaceholder "
                            displayValue={(obj) => obj?.name}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder={placeholder}
                            autoComplete={"off"}
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2 border-0 bg-white" >
                            <div className='p-2 rounded-full bg-white'>

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3 h-3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" className='stroke-primary-baseOrange' />
                                </svg>

                            </div>

                        </Combobox.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery('')}
                    >
                        <Combobox.Options className="absolute mt-1 font-Mulish hidescrollbar max-h-52 z-20 w-full overflow-auto rounded-md bg-white  py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {filteredlistItem.length === 0 && query !== '' ? (
                                <div className="relative cursor-default select-none py-2 px-4 text-gray-700 ">
                                    Nothing found.
                                </div>
                            ) : (
                                filteredlistItem.map((person) => (
                                    <Combobox.Option
                                        key={person.id}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 list-none pr-4 ${active ? 'bg-primary-highlighterOrange text-black ' : 'text-gray-900 '
                                            }`
                                        }
                                        value={person}
                                        disabled={disabled}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                        }`}
                                                >
                                                    {person.name}
                                                </span>
                                                {selected ? (
                                                    <span
                                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white ' : 'text-primary-highlighterOrange'
                                                            }`}
                                                    >
                                                        {/* <CheckIcon className="h-5 w-5" aria-hidden="true" /> */}
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox >
        </div >
    )
}
export default CustomSelect