import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup, verify } from "../../routes/auth/auth";
import { getCurrentUser } from "../../utlis/currentUser";

export default function Signup() {
  const [role, setRole] = useState("customer");
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [user, setUser] = useState();

  useEffect(() => {
    async function fetchUser() {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    }
    fetchUser();
  }, []);

  if (user) return navigate("/dashboard");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await signup({ phone, name, role })
      setOtpSent(true);
      alert(`شماره: ${phone} | کد تایید: ${res.otp}`);
    } catch (err) {
      if (err.message.includes("400")) {
        alert("کاربری با این شماره قبلا ثبت شده است!");
      } else {
        alert("خطا در ثبت نام");
      }
      console.error(err);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await verify(phone, otp);
      localStorage.setItem("token", res.access_token);
      alert("ثبت نام موفق!");
      navigate("/dashboard/settings");
    } catch (err) {
      alert("کد وارد شده اشتباه است");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-myfont">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
        صفحه ثبت نام
        </h2>

        {!otpSent ? (
          <form className="space-y-4" onSubmit={handleSignup}>
            <div>
              <label className="block text-gray-700 right-farsi">نام و نام خانوادگی</label>
              <input
                autoFocus
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="برای مثال: علی کاظمی"
                required
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 right-farsi"
              />
            </div>

            <div>
              <label className="block text-gray-700 right-farsi">شماره تلفن</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 bg-gray-200 rounded-l-lg">+۹۸</span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="۹۱۲۳۴۵۶۷۸۹"
                  required
                  pattern="\d{10}"
                  title="شماره تلفن خود را بدون صفر وارد کنید"
                  className="w-full px-4 py-2 border rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-myfont"
                />
              </div>
            </div>

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
                    value="vendors"
                    checked={role === "vendors"}
                    onChange={() => setRole("vendors")}
                    className="text-blue-600"
                  />
                  فروشنده
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              ثبت نام
            </button>
          </form>
        ) : (
          <form className="space-y-4" onSubmit={handleVerify}>
            <div>
              <label className="block text-gray-700 right-farsi">کد تایید</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="X X X X X X"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-myfont"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
            >
              تایید
            </button>
          </form>
        )}

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
