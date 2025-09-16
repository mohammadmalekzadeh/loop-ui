// src/components/AddProductModal.js
import React from "react";

export default function AddProductModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <h2 className="text-xl font-bold mb-4 right-farsi">اضافه کردن محصول جدید</h2>

        {/* Form inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium"></label>
            <input
              type="text"
              required
              placeholder="اسم محصول جدیدت چیه؟"
              className="mt-1 block w-full border rounded p-2 right-farsi"
            />
          </div>

          <div>
            <label className="block text-sm font-medium"></label>
            <input
              type="text"
              required
              placeholder="نوعش چیه؟"
              className="mt-1 block w-full border rounded p-2 right-farsi"
            />
          </div>

          <div>
            <label className="block text-sm font-medium"></label>
            <input
              type="number"
              required
              placeholder="چقدر میخوای بفروشیش؟"
              className="mt-1 block w-full border rounded p-2 right-farsi"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6 gap-3">
          <button
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition right-farsi"
          >
            اضافه کن!
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition right-farsi"
          >
            کنسله!
          </button>
        </div>
      </div>
    </div>
  );
}
