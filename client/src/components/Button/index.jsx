import React from "react";

function Button({ label = "", className = "", type = "submit" }) {
  return (
    <button
      type={type}
      class={`${className} py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 `}
    >
      {label}
    </button>
  );
}

export default Button;
