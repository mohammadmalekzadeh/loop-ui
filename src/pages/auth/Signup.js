import { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [role, setRole] = useState("customer");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-myfont">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
        صفحه ثبت نام
        </h2>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 right-farsi">نام و نام خانوادگی</label>
            <input autoFocus
              type="text"
              placeholder="برای مثال: علی کاظمی"
              required
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 right-farsi"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-gray-700 right-farsi">شماره تلفن</label>
            <div className="flex">
              <span className="inline-flex items-center px-3 bg-gray-200 rounded-l-lg">
              +۹۸
              </span>
              <input
                type="tel"
                placeholder="۹۱۲۳۴۵۶۷۸۹"
                required
                pattern="\d{10}"
                title="شماره تلفن خود را بدون صفر وارد کنید"
                className="w-full px-4 py-2 border rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Role Toggle */}
          <div>
            <label className="block text-gray-700 right-farsi mb-1">ثبت نام به عنوان:</label>
            <div className="flex gap-4 right-farsi">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="customer"
                  checked={role === "customer"}
                  onChange={() => setRole("customer")}
                  className="text-blue-600"
                />
                خریدار
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="vendor"
                  checked={role === "vendor"}
                  onChange={() => setRole("vendor")}
                  className="text-blue-600"
                />
                فروشنده
              </label>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            ثبت نام
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-500 text-center font-semibold right-farsi">
          اطلاعات شما نزد ما محفوظ نگه داشته می‌شود!
        </p>
        <p className="text-center text-gray-600 mt-6 right-farsi">
        حساب کاربری دارید؟{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
          ورود
          </Link>
        </p>
      </div>
    </div>
  );
}
