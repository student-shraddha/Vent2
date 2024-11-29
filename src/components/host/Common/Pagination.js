import React, { useEffect } from 'react'
import { usePagination, PaginationItemType } from "@nextui-org/react";

export function Pagination({ items, pageSize, currentPage, onPageChange }) {
    const pagesCount = Math.ceil(items / pageSize); // 100/10

    const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

    const { activePage, range, setPage, onNext, onPrevious } = usePagination({
        total: pagesCount,
        showControls: true,
        siblings: 1,
        boundaries: 1,
    });

    useEffect(() => {
        onPageChange(activePage)
    }, [activePage]);

    return (
        <div className="pt-5 pb-3">
            <ul className="flex items-center justify-center gap-4">
                {range.map((page) => {
                    if (page === PaginationItemType.NEXT) {
                        return (
                            <li key={page} aria-label="next page" className={`flex items-center justify-center w-7 h-7 font-Mulish not-italic font-semibold text-base text-[#6D6D6D] rounded-r-xl ${pages.length > currentPage ? "cursor-pointer" : "cursor-not-allowed"}`}>
                                <a className={"styles.pageLink flex"} onClick={onNext}>

                                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="16" viewBox="0 0 8 16" fill="none">
                                        <path d="M0.355291 0.420947C0.242666 0.553514 0.153312 0.710979 0.0923468 0.884328C0.0313812 1.05768 0 1.2435 0 1.43118C0 1.61885 0.0313812 1.80468 0.0923468 1.97802C0.153312 2.15137 0.242666 2.30884 0.355291 2.44141L5.06911 8.00125L0.355291 13.5611C0.128132 13.829 0.000514428 14.1924 0.000514428 14.5713C0.000514428 14.9502 0.128132 15.3136 0.355291 15.5816C0.582451 15.8495 0.890546 16 1.2118 16C1.53305 16 1.84114 15.8495 2.0683 15.5816L7.64471 9.00431C7.75734 8.87175 7.84669 8.71428 7.90765 8.54093C7.96862 8.36758 8 8.18176 8 7.99408C8 7.80641 7.96862 7.62058 7.90765 7.44724C7.84669 7.27389 7.75734 7.11642 7.64471 6.98385L2.0683 0.406617C1.60664 -0.137904 0.829104 -0.137904 0.355291 0.420947Z" fill={activePage === pagesCount ? "#CDCDCD" : "#9E7B74"} />
                                    </svg>
                                </a>

                            </li>
                        );
                    }

                    if (page === PaginationItemType.PREV) {
                        return (
                            <li key={page} aria-label="previous page" className={`flex items-center justify-center  w-7 h-7 font-Mulish not-italic font-semibold text-base text-[#6D6D6D] rounded-l-xl ${currentPage > 1 ? "cursor-pointer" : "cursor-not-allowed"}`}>
                                <a className={"styles.pageLink flex"} onClick={onPrevious}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="16" viewBox="0 0 8 16" fill="none">
                                        <path d="M7.64471 0.420946C7.75733 0.553514 7.84669 0.710979 7.90765 0.884327C7.96862 1.05768 8 1.2435 8 1.43118C8 1.61885 7.96862 1.80468 7.90765 1.97802C7.84669 2.15137 7.75733 2.30884 7.64471 2.4414L2.93089 8.00125L7.64471 13.5611C7.87187 13.829 7.99949 14.1924 7.99949 14.5713C7.99949 14.9502 7.87187 15.3136 7.64471 15.5816C7.41755 15.8495 7.10945 16 6.7882 16C6.46695 16 6.15886 15.8495 5.9317 15.5816L0.35529 9.00431C0.242664 8.87175 0.153311 8.71428 0.0923452 8.54093C0.0313797 8.36758 0 8.18175 0 7.99408C0 7.80641 0.0313797 7.62058 0.0923452 7.44724C0.153311 7.27389 0.242664 7.11642 0.35529 6.98385L5.9317 0.406617C6.39336 -0.137904 7.1709 -0.137904 7.64471 0.420946Z" fill={activePage === 1 ? "#CDCDCD" : "#9E7B74"} />
                                    </svg>

                                </a>
                            </li>
                        );
                    }

                    if (page === PaginationItemType.DOTS) {
                        return (
                            <li key={page} className={`flex items-center justify-center  w-7 h-7 font-Mulish not-italic font-semibold text-base cursor-not-allowed text-[#6D6D6D]`}>
                                ...
                            </li>
                        );
                    }

                    return (
                        <li key={page} aria-label={`page ${page}`} className={`flex items-center justify-center rounded-full w-7 h-7 font-Mulish not-italic font-semibold text-base cursor-pointer ${activePage === page ? "bg-primary-baseRed " : "text-[#6D6D6D]"}`}>

                            <a className={`text-decoration-none ${activePage === page ? "text-white " : "text-primary-textGray"}`} onClick={() => setPage(page)}>
                                {page}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );

};

export default Pagination;