import React from "react";

function CheckBox({ label, id, name, checked = false, onChange }) {
  return (
    <>
      <div className="relative w-full mt-4 flex break-words ">
        <input
          type="checkbox"
          id={id}
          name={name}
          value={id}
          checked={checked}
          onChange={(e) => onChange(!checked)}
          className="w-5 h-5 text-black bg-gray-100 rounded border-gray-300 focus:ring-0 outline-0  "
        />
        <label
          htmlFor={id}
          className="ml-2 text-sm font-sm text-black  pb-2 align-middle break-words w-full"
        >
          {label}
        </label>
      </div>
    </>
  );
}

export default CheckBox;
