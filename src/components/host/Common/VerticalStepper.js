// components/VerticalStepper.js
import React from "react";
import Step1SVG from "../utils/Images/Step1SVG";
import Step2SVG from "../utils/Images/Step2SVG";
import StepCompletedSVG from "../utils/Images/StepCompletedSVG";
import Step3SVG from "../utils/Images/Step3SVG";
import Step4SVG from "../utils/Images/Step4SVG";
import Step5SVG from "../utils/Images/Step5SVG";
import Step6SVG from "../utils/Images/Step6SVG";
import Step7SVG from "../utils/Images/Step7SVG";

const VerticalStepper = ({ currentStep, steps, goToStep }) => {
  return (
    <>
      {/* <!-- TW Elements is free under AGPL, with commercial license required for specific uses. See more details: https://tw-elements.com/license/ and contact us for queries at tailwind@mdbootstrap.com -->  */}

      <ul className="relative m-0 w-full list-none overflow-hidden p-0 transition-[height] duration-200 ease-in-out"
      >
        <li className="relative h-fit after:absolute after:left-[2.90rem] after:top-[6rem] after:mt-px after:h-[calc(100%-5rem)] after:w-1 after:bg-[#e0e0e0] after:content-[''] text-base font-semibold text-primary-baseGray"
        >
          <div
            className="flex cursor-pointer items-center p-6 leading-[1.3rem] no-underline after:bg-[#e0e0e0] after:content-[''] hover:bg-[#f9f9f9] focus:outline-none "
            onClick={() => {
              steps[0].is_completed && goToStep(1)
            }}
          >
            <span className={`mr-3 flex h-12 w-12 items-center justify-center rounded-full ${currentStep === 1 ? "bg-primary-baseRed" : steps[0].is_completed ? "bg-primary-baseGreen" : ""}`}
            >
              {steps[0].is_completed ? <StepCompletedSVG />
                :

                <Step1SVG
                  width={30}
                  height={30}
                  className={`flex items-center justify-center ${currentStep === 1 ? "stroke-white" : steps[0].is_completed ? "" : "stroke-primary-baseGray"}`}
                  stroke={currentStep === 1 ? "fill-white" : steps[0].is_completed ? "" : "fill-primary-baseGray"}
                  fill={currentStep === 1 ? "fill-white" : steps[0].is_completed ? "" : "fill-primary-baseGray"}
                />
              }
            </span>
            <span className="after:absolute after:flex after:text-[0.8rem] after:content-[data-content] flex flex-col gap-3"
            >
              <div>Step 1</div>
              <div className={`${currentStep === 1 || steps[0].is_completed ? "text-black font-bold" : ""}`}>Basic Info</div>
            </span>
          </div>
          <div className="left-0 overflow-hidden pb-6 pl-[3.75rem] pr-6 duration-300 ease-in-out"
          ></div>
        </li>
        <li className="relative h-fit after:absolute after:left-[2.90rem] after:top-[6rem] after:mt-px after:h-[calc(100%-5rem)] after:w-1 after:bg-[#e0e0e0] after:content-[''] text-base font-semibold text-primary-baseGray "
        >
          <div
            className="flex cursor-pointer items-center p-6 leading-[1.3rem] no-underline after:bg-[#e0e0e0] after:content-[''] hover:bg-[#f9f9f9] focus:outline-none "
            onClick={() => {
              steps[1].is_completed && goToStep(2)
            }}
          >
            <span className={`mr-3 flex h-12 w-12 items-center justify-center rounded-full ${currentStep === 2 ? "bg-primary-baseRed" : steps[1].is_completed ? "bg-primary-baseGreen" : ""}`}
            >
              {steps[1].is_completed ?
                <StepCompletedSVG />
                :
                <Step2SVG
                  width={30}
                  height={30}
                  className={`flex items-center justify-center`}
                  fill={currentStep === 2 ? "fill-white" : steps[1].is_completed ? "" : "fill-primary-baseGray"} />}

            </span>
            <span className="after:absolute after:flex after:text-[0.8rem] after:content-[data-content] flex flex-col gap-3"
            >
              <div>Step 2</div>
              <div className={`${currentStep === 2 || steps[1].is_completed ? "text-black font-bold" : ""}`}>Amenities</div>
            </span>
          </div>
          <div className="transition-[height,margin-bottom,padding-top,padding-bottom] left-0 overflow-hidden pb-6 pl-[3.75rem] pr-6 duration-300 ease-in-out"
          ></div>
        </li>

        <li className="relative h-fit after:absolute after:left-[2.90rem] after:top-[6rem] after:mt-px after:h-[calc(100%-5rem)] after:w-1 after:bg-[#e0e0e0] after:content-[''] text-base font-semibold text-primary-baseGray "
        >
          <div
            className="flex cursor-pointer items-center p-6 leading-[1.3rem] no-underline after:bg-[#e0e0e0] after:content-[''] hover:bg-[#f9f9f9] focus:outline-none "
            onClick={() => {
              steps[2].is_completed && goToStep(3)
            }}
          >
            <span className={`mr-3 flex h-12 w-12 items-center justify-center rounded-full ${currentStep === 3 ? "bg-primary-baseRed" : steps[2].is_completed ? "bg-primary-baseGreen" : ""}`}
            >
              {steps[2].is_completed ?
                <StepCompletedSVG />
                :
                <Step3SVG
                  width={30}
                  height={30}
                  className={`flex items-center justify-center`}
                  fill={currentStep === 3 ? "fill-white" : steps[2].is_completed ? "" : "fill-primary-baseGray"} />}

            </span>
            <span className="after:absolute after:flex after:text-[0.8rem] after:content-[data-content] flex flex-col gap-3"
            >
              <div>Step 3</div>
              <div className={`${currentStep === 3 || steps[2].is_completed ? "text-black font-bold" : ""}`}>Description</div>
            </span>
          </div>
          <div className="transition-[height,margin-bottom,padding-top,padding-bottom] left-0 overflow-hidden pb-6 pl-[3.75rem] pr-6 duration-300 ease-in-out"
          ></div>
        </li>

        <li className="relative h-fit after:absolute after:left-[2.90rem] after:top-[6rem] after:mt-px after:h-[calc(100%-5rem)] after:w-1 after:bg-[#e0e0e0] after:content-[''] text-base font-semibold text-primary-baseGray "
        >
          <div
            className="flex cursor-pointer items-center p-6 leading-[1.3rem] no-underline after:bg-[#e0e0e0] after:content-[''] hover:bg-[#f9f9f9] focus:outline-none "
            onClick={() => {
              steps[3].is_completed && goToStep(4)
            }}
          >
            <span className={`mr-3 flex h-12 w-12 items-center justify-center rounded-full ${currentStep === 4 ? "bg-primary-baseRed" : steps[3].is_completed ? "bg-primary-baseGreen" : ""}`}
            >
              {steps[3].is_completed ?
                <StepCompletedSVG />
                :
                <Step4SVG
                  width={30}
                  height={30}
                  className={`flex items-center justify-center`}
                  fill={currentStep === 4 ? "fill-white" : steps[3].is_completed ? "" : "fill-primary-baseGray"} />}

            </span>
            <span className="after:absolute after:flex after:text-[0.8rem] after:content-[data-content] flex flex-col gap-3"
            >
              <div>Step 4</div>
              <div className={`${currentStep === 4 || steps[3].is_completed ? "text-black font-bold" : ""}`}>Photos</div>
            </span>
          </div>
          <div className="transition-[height,margin-bottom,padding-top,padding-bottom] left-0 overflow-hidden pb-6 pl-[3.75rem] pr-6 duration-300 ease-in-out"
          ></div>
        </li>

        <li className="relative h-fit after:absolute after:left-[2.90rem] after:top-[6rem] after:mt-px after:h-[calc(100%-5rem)] after:w-1 after:bg-[#e0e0e0] after:content-[''] text-base font-semibold text-primary-baseGray "
        >
          <div
            className="flex cursor-pointer items-center p-6 leading-[1.3rem] no-underline after:bg-[#e0e0e0] after:content-[''] hover:bg-[#f9f9f9] focus:outline-none "
            onClick={() => {
              steps[4].is_completed && goToStep(5)
            }}
          >
            <span className={`mr-3 flex h-12 w-12 items-center justify-center rounded-full ${currentStep === 5 ? "bg-primary-baseRed" : steps[4].is_completed ? "bg-primary-baseGreen" : ""}`}
            >
              {steps[4].is_completed ?
                <StepCompletedSVG />
                :
                <Step5SVG
                  width={30}
                  height={30}
                  className={`flex items-center justify-center`}
                  fill={currentStep === 5 ? "fill-white" : steps[4].is_completed ? "" : "fill-primary-baseGray"} />}

            </span>
            <span className="after:absolute after:flex after:text-[0.8rem] after:content-[data-content] flex flex-col gap-3"
            >
              <div>Step 5</div>
              <div className={`${currentStep === 5 || steps[4].is_completed ? "text-black font-bold" : ""}`}>Price & Availability</div>
            </span>
          </div>
          <div className="transition-[height,margin-bottom,padding-top,padding-bottom] left-0 overflow-hidden pb-6 pl-[3.75rem] pr-6 duration-300 ease-in-out"
          ></div>
        </li>

        <li className="relative h-fit after:absolute after:left-[2.90rem] after:top-[6rem] after:mt-px after:h-[calc(100%-5rem)] after:w-1 after:bg-[#e0e0e0] after:content-[''] text-base font-semibold text-primary-baseGray "
        >
          <div
            className="flex cursor-pointer items-center p-6 leading-[1.3rem] no-underline after:bg-[#e0e0e0] after:content-[''] hover:bg-[#f9f9f9] focus:outline-none "
            onClick={() => {
              steps[5].is_completed && goToStep(6)
            }}
          >
            <span className={`mr-3 flex h-12 w-12 items-center justify-center rounded-full ${currentStep === 6 ? "bg-primary-baseRed" : steps[5].is_completed ? "bg-primary-baseGreen" : ""}`}
            >
              {steps[5].is_completed ?
                <StepCompletedSVG />
                :
                <Step6SVG
                  width={30}
                  height={30}
                  className={`flex items-center justify-center`}
                  fill={currentStep === 6 ? "fill-white" : steps[5].is_completed ? "" : "fill-primary-baseGray"} />}

            </span>
            <span className="after:absolute after:flex after:text-[0.8rem] after:content-[data-content] flex flex-col gap-3"
            >
              <div>Step 6</div>
              <div className={`${currentStep === 6 || steps[5].is_completed ? "text-black font-bold" : ""}`}>Check-In/Check-Out</div>
            </span>
          </div>
          <div className="transition-[height,margin-bottom,padding-top,padding-bottom] left-0 overflow-hidden pb-6 pl-[3.75rem] pr-6 duration-300 ease-in-out"
          ></div>
        </li>

        <li className="relative h-fit after:absolute after:left-[2.90rem] after:top-[6rem] after:mt-px after:h-[calc(100%-5rem)] after:w-1 after:bg-[#e0e0e0] after:content-[''] text-base font-semibold text-primary-baseGray "
        >
          <div
            className="flex cursor-pointer items-center p-6 leading-[1.3rem] no-underline after:bg-[#e0e0e0] after:content-[''] hover:bg-[#f9f9f9] focus:outline-none "
            onClick={() => {
              steps[6].is_completed && goToStep(7)
            }}
          >
            <span className={`mr-3 flex h-12 w-12 items-center justify-center rounded-full ${currentStep === 7 ? "bg-primary-baseRed" : steps[6].is_completed ? "bg-primary-baseGreen" : ""}`}
            >
              {steps[6].is_completed ?
                <StepCompletedSVG />
                :
                <Step7SVG
                  width={30}
                  height={30}
                  className={`flex items-center justify-center`}
                  fill={currentStep === 7 ? "fill-white" : steps[6].is_completed ? "" : "fill-primary-baseGray"} />}

            </span>
            <span className="after:absolute after:flex after:text-[0.8rem] after:content-[data-content] flex flex-col gap-3"
            >
              <div>Step 7</div>
              <div className={`${currentStep === 7 || steps[6].is_completed ? "text-black font-bold" : ""}`}>Payments</div>
            </span>
          </div>
        </li>
      </ul>


    </>
  );
};

export default VerticalStepper;




