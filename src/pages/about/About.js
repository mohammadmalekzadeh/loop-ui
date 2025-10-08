import React from "react";
import { enToFaNum } from "../../utils/NumConvertor";

export default function About() {
  return (
    <div
      className="relative min-h-screen bg-isabelline bg-center flex items-center justify-center px-4 sm:px-6 py-8">

      {/* White transparent card */}
      <div className="relative w-[90%] max-w-2xl text-center bg-eggshell bg-opacity-70 p-6 sm:p-10 rounded-2xl shadow-2xl">
        <img
          src="/icon/favicon.png"
          alt="LOOP Logo"
          className="w-28 sm:w-32 lg:w-48 mx-auto mb-6"
        />
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-gray-800 right-farsi">درباره ما</h1>

        {/* Welcome line */}
        <h2 className="text-lg sm:text-2xl font-semibold text-azul mb-6 right-farsi">
            به <span className="text-loop">لووپ</span> خوش آمدید!
        </h2>

        <p className="text-sm sm:text-base text-gray-800 leading-relaxed mb-6 right-farsi">
        ما برای حفاظت از محیط زیست و کاهش ضایعات غذایی آمدیم.
        <br />
        ماموریت ما کاهش ضایعات غذایی و ایجاد دسترسی به غذای باکیفیت و مقرون‌به‌صرفه برای همه است.
        <br />
        ایران یکی از کشورهای پیشرو در ضایعات غذایی است. سالانه میلیون‌ها تن غذا در رستوران‌ها، سوپرمارکت‌ها و شیرینی‌فروشی‌ها دور ریخته می‌شود.
        <br/>
        <span className="text-fire_brick text-bold">این یک مشکل بزرگ اقتصادی، اخلاقی و زیست‌محیطی است!</span>
        <br />
        <span className="text-pine_green">با محیط زیست مهربان باشیم :)</span>
        </p>
      </div>
    </div>
  );
}
