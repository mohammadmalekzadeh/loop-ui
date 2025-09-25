import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaTrash, FaSignOutAlt, FaFileUpload, FaUpload } from "react-icons/fa";
import { enToFaNum, faToEnNum } from "../../utlis/NumConvertor";
import { updateUserInfo, updateVendorsInfo, getUserDashboard } from "../../routes/dashboard/dashboard";
import { uploadAvatar } from "../../routes/upload-avatar/upload";
import { getCurrentUser } from "../../utlis/currentUser";

export default function Settings() {
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({});
  const [user, setUser] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [loadingAvatar, setLoadingAvatar] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!token) return navigate("/login");
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
    console.log(formData)
    try {
      if (formData.role === "vendors") {
        await updateVendorsInfo(
          {
            name: formData.name,
            phone: formData.phone,
            nation_code: formData.nation_code,
            shop_name: formData.shop_name,
            shop_address: formData.shop_address,
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
      const updatedUser = await getUserDashboard(token);
      setUser(updatedUser);
      setFormData(updatedUser);
    } catch (err) {
      if (err.message.includes("422")) {
        alert("کد ملی نامعتبر است!")
      } else {
        alert("مشکلی پیش اومد ❌");
      }
      console.error("خطا در ذخیره تغییرات:", err);
    }
  };

  const handleAvatarChange = (e) => {
    setAvatarFile(e.target.files[0]);
  };

  const handleAvatarUpload = async () => {
    if (!avatarFile) return;
    setLoadingAvatar(true);
    try {
      const data = new FormData();
      data.append("file", avatarFile);

      const res = await uploadAvatar(data, token);
      setFormData((prev) => ({ ...prev, avatar: res.url }));
      alert("تصویر پروفایل آپلود شد ✅");
    } catch (err) {
      console.error("خطا در آپلود تصویر:", err);
      alert("آپلود تصویر ناموفق ❌");
    }
    setLoadingAvatar(false);
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      alert("با موفقیت از حساب خارج شدید");
      navigate("/login");
    } catch (err) {
      console.log(err);
      alert("خطا در خروج از حساب! لطفا دوباره تلاش کنید.");
    }
  };


  return (
    <div className="max-w-2xl mx-auto bg-isabelline shadow-md rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 right-farsi">⚙️ تنظیمات</h2>

      {user.role === "vendors" && (
        <div className="items-center justify-center gap-2">
        <img
          src={formData.avatar || "/vendors/default.jpg"}
          alt={formData.shop_name}
          className="w-32 h-32 mx-auto mb-4 rounded-lg"
          />
        <input type="file" accept="image/*" onChange={handleAvatarChange} className="mb-2" />
        <button
            type="button"
            onClick={handleAvatarUpload}
            disabled={loadingAvatar}
            className="bg-pigment_green hover:bg-sea_green text-eggshell px-4 py-2 rounded-lg inline-flex items-center justify-center gap-2 transition"
          >
          {loadingAvatar ? "در حال آپلود..." : "آپلود تصویر"}
          <FaUpload />
        </button>
        </div>
        )}
      <form className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 right-farsi">
          نام و نام خانوادگی
          </label>
          <input
            type="text"
            name="name"
            value={formData.name || ""}
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
              value={formData.phone || ""}
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
              value={formData.nation_code || ""}
              onChange={handleChange}
              pattern="\d{10}"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                value={formData.shop_name || ""}
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
                value={formData.shop_address || ""}
                placeholder="اصفهان، نجف آباد، ..."
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
                  name="start_day"
                  value={formData.start_day || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 right-farsi"
                >
                  <option>---</option>
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
                  name="end_day"
                  value={formData.end_day || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 right-farsi"
                >
                  <option>---</option>
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
                  name="start_time"
                  type="time"
                  value={formData.start_time || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 right-farsi">ساعت بسته شدن</label>
                <input
                  name="end_time"
                  type="time"
                  value={formData.end_time || ""}
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
            className="flex-1 text-eggshell font-semibold py-2 rounded-lg bg-pigment_green hover:bg-sea_green transition right-farsi"
          >
            ذخیره تغییرات!
          </button>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="flex-1 text-eggshell font-semibold py-2 rounded-lg bg-dim_gray hover:bg-jet transition right-farsi"
          >
            کنسله، برگرد!
          </button>
        </div>
      </form>
      {/* Logout Account Button */}
        <div className="mt-10 flex justify-center right-farsi" id="logout">
          <button
            // disabled
            onClick={handleLogout}
            className="flex items-center justify-center w-screen gap-2 px-6 py-3 bg-fire_brick text-eggshell rounded-lg"
          >
            <FaSignOutAlt />
            خروج از حساب کاربری
          </button>
        </div>
    </div>
  );
}
