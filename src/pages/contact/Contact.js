import React from "react";
import { enToFaNum } from "../../utils/NumConvertor";

export default function Contact() {
  return (
    <div
      className="relative min-h-screen bg-isabelline bg-center flex items-center justify-center px-4 sm:px-6 py-8 font-myfont">

      {/* White transparent card */}
      <div className="relative max-w-lg w-full text-center bg-eggshel bg-opacity-70 p-6 sm:p-10 rounded-2xl shadow-2xl">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-800 right-farsi">
          تماس با ما
        </h1>

        {/* Contact Form */}
        <form className="space-y-4 text-right right-farsi">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              نام
            </label>
            <input
              type="text"
              className="w-full text-sm sm:text-base px-3 py-2 sm:px-4 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="نام خود را وارد کنید"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              شماره تماس
            </label>
            <input
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              className="w-full text-sm sm:text-base px-3 py-2 sm:px-4 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="شماره تماس"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ایمیل
            </label>
            <input
              type="email"
              className="w-full text-sm sm:text-base px-3 py-2 sm:px-4 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ایمیل"
            />
          </div>

          {/* Suggestions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              پیشنهادات
            </label>
            <textarea
              rows="4"
              className="w-full text-sm sm:text-base px-3 py-2 sm:px-4 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="پیشنهادات خود را بنویسید..."
            ></textarea>
          </div>

          {/* Submit */}
          <button
            type="button"
            disabled
            // className="w-full py-3 text-base sm:text-lg bg-pigment_green text-eggshell rounded-lg hover:bg-sea_green transition"
            className="w-full py-3 text-base sm:text-lg bg-dim_gray text-eggshell rounded-lg transition cursor-not-allowed"
          >
            ارسال
          </button>
        </form>
      </div>
    </div>
  );
}
