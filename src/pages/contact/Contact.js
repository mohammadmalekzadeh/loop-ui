import React from "react";
import { enToFaNum } from "../../utlis/NumConvertor";

export default function Contact() {
  return (
    <div
      className="relative h-screen bg-cover bg-center flex items-center justify-center px-6 font-myfont"
      style={{
        backgroundImage: "url('/background/contact.jpg')",
      }}
    >
      {/* Blur layer over the whole background */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-md-xl"></div>

      {/* White transparent card */}
      <div className="relative max-w-2xl w-full text-center bg-white bg-opacity-70 p-10 rounded-2xl shadow-2xl">
        <h1 className="text-4xl font-bold mb-6 text-gray-800 right-farsi">
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
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 right-farsi"
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
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="پیشنهادات خود را بنویسید..."
            ></textarea>
          </div>

          {/* Submit */}
          <button
            type="button"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            ارسال
          </button>
        </form>
      </div>
    </div>
  );
}
