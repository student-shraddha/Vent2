import Image from 'next/image';
import React, { useEffect } from 'react';

export function NoDataFound({ title, subtitle }) {


    return (
        <div className="flex flex-col h-screen items-center w-full">
            <div className="">
                {/* <svg className="gx nj rl axo" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path vector-effect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path></svg> */}

                <Image src={"/images/animation_404.gif"} width={320} height={320} alt="404 not found" />
            </div>

            <div className="grid text-center ">
                <div className="text-xl font-bold">{title}</div>
                {subtitle && <div className="text-lg font-normal">{subtitle} </div>}
            </div>
        </div>
    );

};

export default NoDataFound;