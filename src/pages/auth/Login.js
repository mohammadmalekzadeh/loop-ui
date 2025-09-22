import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, verify } from "../../routes/auth/auth";
import { getCurrentUser } from "../../utlis/currentUser";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
  
    if (token) return navigate("/dashboard");
  })

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login(phone);
      setOtpSent(true);
      alert(`کد تایید: ${res.otp}`);
    } catch (err) {
      alert("خطا در ارسال شماره");
      console.error(err);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await verify(phone, otp);
      localStorage.setItem("token", res.access_token);
      alert("ورود موفق!");
      console.log("Access Token:", res.access_token);
      navigate("/dashboard");
    } catch (err) {
      if (err.message.includes("404")) {
        console.log(err);
        alert("کاربری با این شماره قبلا ثبت نشده است!");
      } else {
        alert("کد وارد شده اشتباه است");
        console.error(err);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-myfont">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">صفحه ورود</h2>

        {!otpSent ? (
          <form className="space-y-4" onSubmit={handleLogin} method="post" action={"auth/login"}>
            <div>
              <label className="block text-gray-700 right-farsi">شماره تلفن</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 bg-gray-200 rounded-l-lg">+۹۸</span>
                <input
                  autoFocus
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
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              ورود
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

        <p className="text-center text-gray-600 mt-6 right-farsi">
          حساب کاربری ندارید؟{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            ثبت نام کنید
          </Link>
        </p>
      </div>
    </div>
  );
}
