import React, { useState } from "react";
import { enToFaNum } from "../../utils/NumConvertor";
import { toast } from "react-toastify";

export default function RateModal({ isOpen, onClose, onSubmit }) {
  const [rate, setRate] = useState(0);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (rate <= 0) {
      toast.warn("لطفاً امتیاز بدهید!");
      return;
    }
    onSubmit(rate);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-[90%] sm:w-96">
        <h2 className="text-lg sm:text-xl font-bold mb-4 text-center">امتیاز بدهید</h2>

        <div className="flex justify-center gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              onClick={() => setRate(n)}
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${
                rate >= n ? "bg-golden" : "bg-gray-200"
              }`}
            >
              {enToFaNum(n)}
            </button>
          ))}
        </div>

        <div className="flex justify-between gap-4">
          <button
            onClick={handleSubmit}
            className="flex-1 py-2 bg-pigment_green text-eggshell rounded text-sm sm:text-base"
          >
            ثبت امتیاز
          </button>
        </div>
      </div>
    </div>
  );
}
