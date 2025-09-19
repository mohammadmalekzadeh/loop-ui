import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaTrash, FaSignOutAlt } from "react-icons/fa";
import { enToFaNum, faToEnNum } from "../../utlis/NumConvertor";

// Mock data برای تست
const mockUserVendor = {
  role: "vendors",
  fullName: "علی کاظمی",
  phone: "9123456789",
  nationCode: "0123456789",
  shopName: "علی شاپ",
  shopAddress: "اصفهان، نجف آباد، میدان باغملی",
  start_day: "شنبه",
  end_day: "پنج‌شنبه",
  start_time: "08:00",
  end_time: "22:00",
};

const mockUserCustomer = {
  role: "customer",
  fullName: "علی کاظمی",
  phone: "9123456789",
};

export default function Settings({ user = mockUserVendor }) {
  const [formData, setFormData] = useState(user);

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 right-farsi">⚙️ تنظیمات</h2>

      <form className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 right-farsi">
          نام و نام خانوادگی
          </label>
          <input
            type="text"
            name="fullName"
            defaultValue={formData.fullName}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 right-farsi"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 right-farsi">
          شماره تلفن
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 bg-gray-200 rounded-l-lg">
              +۹۸
            </span>
            <input
              type="tel"
              name="phone"
              defaultValue={formData.phone}
              pattern="\d{10}"
              title="شماره تلفن جدید خود را بدون صفر وارد کنید"
              className="w-full px-4 py-2 border rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Nation Code → فقط vendor */}
        {user.role === "vendors" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 right-farsi">
            کد ملی
            </label>
            <input
              type="text"
              name="nationCode"
              defaultValue={enToFaNum(formData.nationCode)}
              disabled
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed"
            />
          </div>
        )}

        {/* Shop Info → فقط vendor */}
        {user.role === "vendors" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 right-farsi">
              نام فروشگاه
              </label>
              <input
                type="text"
                name="shopName"
                defaultValue={formData.shopName}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 right-farsi"
              />
            </div>

            {/* Shop Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 right-farsi">
              آدرس فروشگاه
              </label>
              <textarea
                name="shopAddress"
                defaultValue={formData.shopAddress}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 right-farsi"
              />
            </div>
          </>
        )}
        {/* زمان کاری فروشنده */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 right-farsi">
              <div>
                <label className="block text-gray-700 right-farsi">روز شروع</label>
                <select
                  defaultValue={formData.start_day}
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 right-farsi"
                >
                  <option>شنبه</option>
                  <option>یکشنبه</option>
                  <option>دوشنبه</option>
                  <option>سه‌شنبه</option>
                  <option>چهارشنبه</option>
                  <option>پنج‌شنبه</option>
                  <option>جمعه</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 right-farsi">روز پایان</label>
                <select
                  defaultValue={formData.end_day}
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 right-farsi"
                >
                  <option>شنبه</option>
                  <option>یکشنبه</option>
                  <option>دوشنبه</option>
                  <option>سه‌شنبه</option>
                  <option>چهارشنبه</option>
                  <option>پنج‌شنبه</option>
                  <option>جمعه</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 right-farsi">
              <div>
                <label className="block text-gray-700 right-farsi">ساعت باز شدن</label>
                <input
                  type="time"
                  defaultValue={formData.start_time}
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 right-farsi">ساعت بسته شدن</label>
                <input
                  type="time"
                  defaultValue={formData.end_time}
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

        {/* Save & Back Buttons */}
        <div className="pt-4 flex gap-3">
          <button
            type="button"
            className="flex-1 bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition right-farsi"
          >
            ذخیره تغییرات!
          </button>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="flex-1 bg-gray-500 text-white font-semibold py-2 rounded-lg hover:bg-gray-600 transition right-farsi"
          >
            کنسله، برگرد!
          </button>
        </div>
      </form>
      {/* Logout Account Button */}
        <div className="mt-10 flex justify-center right-farsi" id="logout">
          <button className="flex items-center justify-center w-screen gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            <FaSignOutAlt />
            خروج از حساب کاربری
          </button>
        </div>
    </div>
  );
}
