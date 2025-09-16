// /components/Alert.js
import React, { useState } from "react";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaTimesCircle,
  FaTimes,
} from "react-icons/fa";

const alertTypes = {
  success: {
    style: "bg-green-100 border border-green-400 text-green-700",
    icon: <FaCheckCircle className="w-5 h-5 mr-2 text-green-600" />,
  },
  error: {
    style: "bg-red-100 border border-red-400 text-red-700",
    icon: <FaTimesCircle className="w-5 h-5 mr-2 text-red-600" />,
  },
  warning: {
    style: "bg-yellow-100 border border-yellow-400 text-yellow-700",
    icon: <FaExclamationTriangle className="w-5 h-5 mr-2 text-yellow-600" />,
  },
  info: {
    style: "bg-blue-100 border border-blue-400 text-blue-700",
    icon: <FaInfoCircle className="w-5 h-5 mr-2 text-blue-600" />,
  },
};

export default function Alert({ type = "info", children }) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      className={`flex items-center justify-between px-4 py-3 rounded relative mb-4 ${alertTypes[type].style}`}
      role="alert"
    >
      <div className="flex items-center">
        {alertTypes[type].icon}
        <span className="block sm:inline font-myfont right-farsi">{children}</span>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="ml-4 text-xl leading-none focus:outline-none"
      >
        <FaTimes />
      </button>
    </div>
  );
}
