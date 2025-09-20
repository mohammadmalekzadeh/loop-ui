import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaTrash, FaSignOutAlt } from "react-icons/fa";
import { enToFaNum, faToEnNum } from "../../utlis/NumConvertor";
import { updateUserInfo, updateVendorsInfo, getUserDashboard } from "../../routes/dashboard/dashboard";
import { getCurrentUser } from "../../utlis/currentUser";

export default function Settings() {
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState("");
  const [user, setUser] = useState("");

   useEffect(() => {
    const fetchData = async () => {
      try {
        const u = await getCurrentUser();
        setUser(u);

        const data = await getUserDashboard(token);
        setFormData(data);
      } catch (err) {
        console.error("خطا در گرفتن اطلاعات:", err);
      }
    };

    fetchData();
  }, [token]) 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      if (formData.role === "vendors") {
        await updateVendorsInfo(
          {
            nation_code: formData.nationCode,
            shop_name: formData.shopName,
            shop_address: formData.shopAddress,
            start_day: formData.start_day,
            end_day: formData.end_day,
            start_time: formData.start_time,
            end_time: formData.end_time,
          },
          token
        );
      } else {
        await updateUserInfo(
          {
            name: formData.name,
            phone: formData.phone,
          },
          token
        );
      }
      alert("اطلاعات با موفقیت ذخیره شد ✅");
      const updatedUser = await getCurrentUser();
      setUser(updatedUser);
      setFormData(updatedUser);
    } catch (err) {
      console.error("خطا در ذخیره تغییرات:", err);
      alert("مشکلی پیش اومد ❌");
    }
  };

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
            name="name"
            defaultValue={formData.name}
            onChange={handleChange}
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
              onChange={handleChange}
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
              name="nation_code"
              defaultValue={enToFaNum(formData.nation_code)}
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
                name="shop_name"
                defaultValue={formData.shop_name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 right-farsi"
              />
            </div>

            {/* Shop Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 right-farsi">
              آدرس فروشگاه
              </label>
              <textarea
                name="shop_address"
                defaultValue={formData.shop_address}
                onChange={handleChange}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 right-farsi"
              />
            </div>
          </>
        )}
        {/* زمان کاری فروشنده */}
        {user.role === "vendors" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 right-farsi">
              <div>
                <label className="block text-gray-700 right-farsi">روز شروع</label>
                <select
                  defaultValue={formData.start_day}
                  onChange={handleChange}
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
                  onChange={handleChange}
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
        )}
          {user.role === "vendors" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 right-farsi">
              <div>
                <label className="block text-gray-700 right-farsi">ساعت باز شدن</label>
                <input
                  type="time"
                  defaultValue={formData.start_time}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 right-farsi">ساعت بسته شدن</label>
                <input
                  type="time"
                  defaultValue={formData.end_time}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

        {/* Save & Back Buttons */}
        <div className="pt-4 flex gap-3">
          <button
            type="button"
            onClick={handleSave}
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
