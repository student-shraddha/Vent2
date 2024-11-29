import useMenuSelected from '@/components/host/hooks/useMenuSelected'
import { motion, AnimatePresence } from "framer-motion"
import { Disclosure } from '@headlessui/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
// import { NotificationDropdown } from '../Common/notification'
import { useSession } from 'next-auth/react'
import ProfileIcon from "../../../public/images/vector/profile_icon.png";
import LogoutConfirmation from './Common/Modals/LogoutConfirmation'

const CollapeMenu = () => {
    return <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="21" height="21" rx="5" fill="#FF8341" />
        <circle cx="7" cy="14" r="2" fill="white" />
        <circle cx="7" cy="7" r="2" fill="white" />
        <circle cx="14" cy="14" r="2" fill="white" />
        <circle cx="14" cy="7" r="2" fill="white" />
    </svg>
}

const Sidebar = () => {
    return <svg width="46" height="45" viewBox="0 0 46 45" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_3496_142612)">
            <rect x="4" width="38" height="37" rx="4" fill="white" />
            <path d="M30.625 15.25H15.625C15.4592 15.25 15.3003 15.1842 15.1831 15.0669C15.0658 14.9497 15 14.7908 15 14.625C15 14.4592 15.0658 14.3003 15.1831 14.1831C15.3003 14.0658 15.4592 14 15.625 14H30.625C30.7908 14 30.9497 14.0658 31.0669 14.1831C31.1842 14.3003 31.25 14.4592 31.25 14.625C31.25 14.7908 31.1842 14.9497 31.0669 15.0669C30.9497 15.1842 30.7908 15.25 30.625 15.25ZM31.25 19.625C31.25 19.4592 31.1842 19.3003 31.0669 19.1831C30.9497 19.0658 30.7908 19 30.625 19H15.625C15.4592 19 15.3003 19.0658 15.1831 19.1831C15.0658 19.3003 15 19.4592 15 19.625C15 19.7908 15.0658 19.9497 15.1831 20.0669C15.3003 20.1842 15.4592 20.25 15.625 20.25H30.625C30.7908 20.25 30.9497 20.1842 31.0669 20.0669C31.1842 19.9497 31.25 19.7908 31.25 19.625ZM23.75 24.625C23.75 24.4592 23.6842 24.3003 23.5669 24.1831C23.4497 24.0658 23.2908 24 23.125 24H15.625C15.4592 24 15.3003 24.0658 15.1831 24.1831C15.0658 24.3003 15 24.4592 15 24.625C15 24.7908 15.0658 24.9497 15.1831 25.0669C15.3003 25.1842 15.4592 25.25 15.625 25.25H23.125C23.2908 25.25 23.4497 25.1842 23.5669 25.0669C23.6842 24.9497 23.75 24.7908 23.75 24.625Z" fill="black" />
        </g>
        <defs>
            <filter id="filter0_d_3496_142612" x="0" y="0" width="46" height="45" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.5875 0 0 0 0 0.5875 0 0 0 0 0.5875 0 0 0 0.25 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3496_142612" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3496_142612" result="shape" />
            </filter>
        </defs>
    </svg>


}

const SidebarCross = () => {
    return <svg width="24" height="27" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.8496 11.3449L16.5163 6.67822L17.8496 8.01156L13.183 12.6783L17.8496 17.3449L16.5163 18.6782L11.8496 14.0116L7.18294 18.6782L5.84961 17.3449L10.5163 12.6783L5.84961 8.01156L7.18294 6.67822L11.8496 11.3449Z" fill="#BABABA" />
    </svg>

}




const NotificationIcon = () => {
    return <div className='p-2 bg-gray-200  mr-4 h-fit rounded-md'>
        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_90_41016)">
                <path d="M8.6958 19C7.05951 19 5.72705 17.6684 5.72705 16.0312C5.72705 15.7035 5.99305 15.4375 6.3208 15.4375C6.64855 15.4375 6.91455 15.7035 6.91455 16.0312C6.91455 17.0138 7.71414 17.8125 8.6958 17.8125C9.67746 17.8125 10.4771 17.0138 10.4771 16.0312C10.4771 15.7035 10.743 15.4375 11.0708 15.4375C11.3986 15.4375 11.6646 15.7035 11.6646 16.0312C11.6646 17.6684 10.3322 19 8.6958 19Z" className='fill-black' />
                <path d="M15.2272 16.625H2.16467C1.40073 16.625 0.779297 16.0036 0.779297 15.2396C0.779297 14.8342 0.955856 14.4503 1.26375 14.1867C1.28361 14.1693 1.30492 14.1535 1.3271 14.1391C2.48923 13.125 3.1543 11.666 3.1543 10.1254V7.91662C3.1543 4.86089 5.64091 2.375 8.69592 2.375C8.82261 2.375 8.95959 2.37732 9.08629 2.39877C9.40998 2.45255 9.62858 2.759 9.57465 3.08196C9.52087 3.40493 9.20892 3.62353 8.89146 3.5696C8.82812 3.55931 8.75854 3.5625 8.69592 3.5625C6.29569 3.5625 4.3418 5.51553 4.3418 7.91662V10.1254C4.3418 12.0381 3.50336 13.8479 2.04362 15.0899C2.03174 15.0995 2.02145 15.1082 2.00869 15.1169C1.98738 15.1438 1.9668 15.185 1.9668 15.2396C1.9668 15.3472 2.05711 15.4375 2.16467 15.4375H15.2272C15.3349 15.4375 15.4252 15.3472 15.4252 15.2396C15.4252 15.1841 15.4046 15.1438 15.3824 15.1169C15.3705 15.1082 15.3602 15.0995 15.3484 15.0899C13.8877 13.847 13.0502 12.0381 13.0502 10.1254V9.26256C13.0502 8.93481 13.3162 8.66881 13.6439 8.66881C13.9717 8.66881 14.2377 8.93481 14.2377 9.26256V10.1254C14.2377 11.6668 14.9035 13.1266 16.0672 14.1416C16.0885 14.1558 16.1091 14.1709 16.1281 14.1875C16.4361 14.4503 16.6127 14.8342 16.6127 15.2396C16.6127 16.0036 15.9912 16.625 15.2272 16.625Z" className='fill-black' />
                <path d="M14.2377 7.91662C12.055 7.91662 10.2793 6.14102 10.2793 3.95838C10.2793 1.77574 12.055 0 14.2377 0C16.4203 0 18.1959 1.77574 18.1959 3.95838C18.1959 6.14102 16.4203 7.91662 14.2377 7.91662ZM14.2377 1.1875C12.7097 1.1875 11.4668 2.43037 11.4668 3.95838C11.4668 5.48624 12.7097 6.72912 14.2377 6.72912C15.7655 6.72912 17.0084 5.48624 17.0084 3.95838C17.0084 2.43037 15.7655 1.1875 14.2377 1.1875Z" className='fill-black' />
            </g>
            <defs>
                <clipPath id="clip0_90_41016">
                    <rect width="19" height="19" fill="white" />
                </clipPath>
            </defs>
        </svg>
    </div>
}

const Avatar = () => {
    const { data: session, status } = useSession();

    return <Link href={"/host/settings/profile"} className='flex justify-center items-center no-underline text-black'>
        <Image src={session?.user?.profile || ProfileIcon} width={40} height={40} className="rounded-1" alt="my profile" />

        <div className='flex mx-2 '>
            <div> {session?.user?.username}</div>
        </div>

    </Link>
}



function Layout({ children, openSidebar, setopenSidebar, Menuitem }) {

    // const { data: session, status } = useSession();

    // 

    const router = useRouter()
    // const { loading } = useSelector((state) => state.loading)
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push('/');
        }
    }, [status])

    const [mobile, setmobile] = useState(false)
    const [isOpenLogout, setOpenLogout] = useState(false)

    const { mainselected, selected, subSelected } = useMenuSelected(Menuitem)


    return (
        <div className='w-full flex justify-center'>
            <div className={`lg:max-w-[1600px] grid ${openSidebar ? `md:grid-cols-[70px_auto]` : `md:grid-cols-[219px_auto]`}  ease-in-out duration-300 h-screen w-full hidescrollbar 
        `}>
                <div className={` 
                flex 
                flex-col
                items-center
                justify-start
                w-full
                border-r border-[#EDEDED] 
                h-screen
                overflow-y-auto
                hidescrollbar
                bg-primary-lightGrey
              mt-2
                rounded-lg     
                font-Nunito         
            `} >
                    <LogoutConfirmation isOpen={isOpenLogout} setOpen={setOpenLogout} />
                    <div className={`flex p-2 ${!openSidebar ? `justify-center` : `justify-center`}  
                        items-center w-full h-[8vh]`}>

                        {!openSidebar &&
                            <div className='h-[8vh] z-50 relative w-full max-w-[150px] '>
                                <Link href="/">
                                    <Image src="/images/host/logo.svg" alt="logo"
                                        fill
                                        priority={true}
                                        quality={100}
                                        className='w-full h-full flex ' />
                                </Link>
                            </div>
                        }

                    </div>
                    <div className='w-full border mt-2 border-[#E4E4E4]'></div>

                    {Menuitem.map((i, ix) => {
                        return <div key={ix} className={`flex  ${!openSidebar ? `justify-between p-2` : `justify-center`}  
                             flex-col  w-full  text-primary-textGray h-fit`}>
                            <>
                                <div className={`my-2 ${openSidebar ? "text-[0.8rem] text-center justify-center flex w-full" : " flex"}`}>{i.collection}</div>
                                <div className='mb-4s ' >

                                    {i.menuitems.map((item, inx) => {

                                        if (item?.submenu?.length > 0)
                                            return <div key={`${ix}-${inx}`} className='mt-3'>
                                                <Disclosure defaultOpen={selected === inx} >
                                                    {({ open }) => (<>
                                                        <div className='flex items-center mt-3'>
                                                            <Disclosure.Button className={`w-full border-0 bg-transparent`}>

                                                                <div className={`flex  items-center w-full ${openSidebar ? "justify-center" : "pl-2 justify-between"}  ${selected === inx && !openSidebar &&
                                                                    mainselected === ix ? "bg-primary-baseRed" : ""}  rounded-1`}>
                                                                    <div className='grid grid-cols-[2rem_auto] place-items-center no-underline'

                                                                    >
                                                                        <div className={`${selected === inx && openSidebar &&
                                                                            mainselected === ix ? "bg-primary-baseRed" : ""} p-2 rounded-1`}>
                                                                            {item.logo(selected === inx &&
                                                                                mainselected === ix)}
                                                                        </div>
                                                                        <div className={` ${openSidebar ? "hidden" : "ml-4 flex"} ${(selected === inx && !false &&
                                                                            mainselected === ix) ? "text-white" : "text-primary-textGray hover:font-semibold"}`}>
                                                                            {item.value}
                                                                        </div>

                                                                    </div>
                                                                    {item?.submenu?.length > 0 && !openSidebar &&
                                                                        <div className={`${!open ? `rotate-180` : 'rotate-0'} mr-2`}>
                                                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M9.99959 9.02367L14.1244 13.1484L15.3029 11.9699L9.99959 6.66659L4.69629 11.9699L5.87481 13.1484L9.99959 9.02367Z" className={`${selected === inx ? "fill-white" : !open ? 'fill-primary-textGray' : 'fill-primary-baseOrange'}`} />
                                                                            </svg>

                                                                        </div>
                                                                    }
                                                                </div>

                                                            </Disclosure.Button>
                                                            {selected === inx && <div className="ml-2">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="6" height="40" viewBox="0 0 6 40" fill="none">
                                                                    <path d="M0 35L6 40V0L0 4.8L0 35Z" fill="#9E7B74" />
                                                                </svg>
                                                            </div>}
                                                        </div>
                                                        <Disclosure.Panel className={`mt-2`}>
                                                            {!openSidebar ? (
                                                                <div>
                                                                    {item?.submenu?.map((i, inx_sub) => {
                                                                        return <div key={`${inx}-${inx_sub}`} className='grid grid-cols-[3.5rem_auto]   '>
                                                                            <div className={` p-2 rounded-1 relative  h-[1.8rem]`}>
                                                                                <div className='absolute top-[-30%] left-[40%]'>
                                                                                    <svg width="18" height="32" viewBox="0 0 18 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                        <path d="M1 0.999997L1 25.3529C1 28.4717 3.52827 31 6.64706 31V31L17 31" strokeLinecap="round" className='stroke-[#D9D9D9] ' />
                                                                                    </svg>

                                                                                </div>


                                                                            </div>

                                                                            <Link href={i.link} className={`flex items-end cursor-pointer no-underline hover:font-semibold ${selected === inx && subSelected === inx_sub ? 'text-primary-textRed font-semibold' : "text-primary-textGray"}`} >
                                                                                {i.name}
                                                                            </Link>
                                                                        </div>


                                                                    })
                                                                    }
                                                                </div>
                                                            ) : (
                                                                <div></div>
                                                            )}
                                                        </Disclosure.Panel>
                                                    </>
                                                    )}
                                                </Disclosure>
                                            </div>
                                        return <div key={inx} className='flex items-center mt-3'>
                                            <div key={inx} className={`flex items-center w-full 
                                    ${openSidebar ? "justify-center" : "pl-2 justify-between"}  ${selected === inx && !openSidebar &&
                                                    mainselected === ix ? "bg-primary-baseRed" : ""}  rounded-1`}>
                                                <Link href={item.link} className='grid grid-cols-[2rem_auto] place-items-center no-underline'
                                                    onClick={(event) => {
                                                        if (item?.id && item?.id === 'logout') {
                                                            event.preventDefault();
                                                            setOpenLogout(true)
                                                            console.log('item', item)
                                                        }
                                                    }}

                                                >
                                                    <div className={`${selected === inx && openSidebar &&
                                                        mainselected === ix ? "bg-primary-baseRed" : ""} p-2 rounded-1`}>
                                                        {item.logo(selected === inx &&
                                                            mainselected === ix)}
                                                    </div>
                                                    <div className={` ${openSidebar ? "hidden" : "ml-4 flex"}
                                            ${(selected === inx && !false &&
                                                            mainselected === ix) ? "text-white" : "text-primary-textGray hover:font-semibold"}`}>
                                                        {item.value}
                                                    </div>
                                                </Link>

                                            </div>
                                            {selected === inx && <div className="ml-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="6" height="40" viewBox="0 0 6 40" fill="none">
                                                    <path d="M0 35L6 40V0L0 4.8L0 35Z" fill="#9E7B74" />
                                                </svg>
                                            </div>
                                            }
                                        </div>
                                    })}
                                </div>

                            </>
                        </div>
                    })}
                </div>
                <div className='h-full flex-auto flex-col overflow-scroll hidescrollbar 
                 bg-primary-mainBackground mt-2'>
                    <div className='w-full sticky z-10 top-0 flex justify-end items-center  h-[8vh] pr-4  shrink-0 bg-white '>
                        <div className={"md:hidden ml-2 cursor-pointer"} onClick={() => setmobile(!mobile)}>
                            <Sidebar />
                        </div>

                        {/* <HearderSearch placeholder={'Search..'} /> */}
                        <div className='flex justify-center items-center'>
                            {/* <NotificationDropdown /> */}
                            <Avatar />

                        </div>
                    </div>
                    <div className='p-3 h-full '>
                        {status == "loading" ? <div className='w-full h-full flex justify-center items-center'>
                            <div className="animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-gray-400 rounded-full" role="status" aria-label="loading">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div> :
                            <AnimatePresence>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <>{children}</>
                                </motion.div>
                            </AnimatePresence>


                        }

                    </div>
                </div>

            </div>
        </div>


    )
}

export default Layout