import React from "react";

function Dropdown() {
  return (
    <>
      <div>
        <div className="relative w-full mt-2  ">
          <select className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none  border-solid border-[#E7E7E7]  focus:border-[#828282]">
            <option>Please Select</option>
            <option>Laravel </option>
            <option>React with Tailwind CSS</option>
            <option>React With Headless UI</option>
          </select>
        </div>
      </div>
    </>
  );
}

export default Dropdown;
