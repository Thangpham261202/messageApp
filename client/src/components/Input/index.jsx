import React from "react";

function Input({
  label = "",
  name = "",
  placeholder = "",
  className = "",
  type = "",
  onChange = "",
  value = "",
}) {
  return (
    <div className="">
      <div className="sm:col-span-3">
        <input
          type={label}
          value={name}
          htmlFor="first-name"
          className="block text-sm font-medium leading-6 text-gray-900"
        />

        <div className="mt-2">
          <input
            type={type}
            name="first-name"
            placeholder={placeholder}
            id="first-name"
            onChange={onChange}
            /* value={value} */
            /* focus:ring-2 focus:ring-inset focus:ring-indigo-600 */
            className={`${className} rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6`}
          />
        </div>
      </div>
    </div>
  );
}

export default Input;
