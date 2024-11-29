import React, { useState } from 'react';

const Accordion = ({ title, children, open = false }) => {
  // console.log("open:", open)
  const [isOpen, setIsOpen] = useState(open);

  return (
    <div className={`border border-primary-borderGray rounded-md w-full ${isOpen ? '' : 'max-h-14'} transition-transform transform origin-top`}>
      <div
        className="flex justify-between items-center p-3 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-medium pl-2 font-Nunito text-base">{title}</h3>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className={`${!isOpen ? "rotate-180" : ""}`}>
          <path d="M11.9999 10.8286L7.05006 15.7783L5.63586 14.3641L11.9999 8.0001L18.3638 14.3641L16.9496 15.7783L11.9999 10.8286Z" fill="#828282" />
        </svg>
      </div>
      {isOpen && (
        <div className="transition-height duration-500 ease-in-out  p-4 bg-grey-500 transform origin-top" >
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;
