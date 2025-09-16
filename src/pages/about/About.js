import React from "react";
import { enToFaNum } from "../../utlis/NumConvertor";

export default function About() {
  return (
    <div
      className="relative h-screen bg-cover bg-center flex items-center justify-center px-6"
      style={{
        backgroundImage: "url('/background/about.png')",
      }}
    >
      {/* Blur layer over the whole background */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-md-xl"></div>

      {/* White transparent card */}
      <div className="relative max-w-2xl text-center bg-white bg-opacity-70 p-10 rounded-2xl shadow-2xl">
        <h1 className="text-4xl font-bold mb-6 text-gray-800 right-farsi">درباره ما</h1>

        {/* Welcome line */}
        <h2 className="text-2xl font-semibold text-blue-600 mb-6 right-farsi">
            به <span className="text-green-500">لووپ</span> خوش آمدید!
        </h2>

        <p className="text-gray-800 leading-relaxed mb-6 right-farsi">
        ما برای حفاظت از محیط زیست و کاهش ضایعات غذایی آمده ایم.
        <br />
        ماموریت ما کاهش ضایعات غذایی و ایجاد دسترسی به غذای باکیفیت و مقرون‌به‌صرفه برای همه است.
        <br />
        ایران یکی از کشورهای پیشرو در ضایعات غذایی است. سالانه میلیون‌ها تن غذا در رستوران‌ها، سوپرمارکت‌ها و شیرینی‌فروشی‌ها دور ریخته می‌شود.
        <br/>
        <span className="text-red-700 text-bold">این یک مشکل بزرگ اقتصادی، اخلاقی و زیست‌محیطی است!</span>
        <br />
        <span className="text-green-900">با محیط زیست مهربان باشیم :)</span>
        </p>
      </div>
    </div>
  );
}
