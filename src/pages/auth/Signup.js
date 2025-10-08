import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup, verify } from "../../services/auth/auth";
import { toast } from "react-toastify";
import { FaSync } from "react-icons/fa";
export default function Signup() {
  const [role, setRole] = useState("customer");
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [user, setUser] = useState();
  const [timeLeft, setTimeLeft] = useState(0);
  const [resend, setResend] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
  
    if (token) return navigate("/dashboard");
  }, [])

  useEffect(() => {
    if (otpSent && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [otpSent, timeLeft]);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await signup({ phone, name, role })
      setOtpSent(true);
      setTimeLeft(60);
      toast.success("رمز یکبار مصرف برای شما ارسال گردید!");
      if (resend) {
        toast.info(`رمز یکبار مصرف شما: ${res.otp}`);
      }
    } catch (err) {
      if (err.message.includes("400")) {
        toast.warn("کاربری با این شماره قبلا ثبت شده است!");
      } else {
        toast.warning("خطا در ثبت نام!");
      }
      console.error(err);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await verify(phone, otp);
      localStorage.setItem("token", res.access_token);
      toast.success("ثبت نام موفق!");
      navigate("/dashboard/settings");
    } catch (err) {
      toast.error("کد وارد شده اشتباه است!");
      console.error(err);
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-myfont">
      <div className="w-11/12 sm:w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-loop mb-6">
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
                  pattern="9\d{9}"
                  inputMode="numeric"
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
              className="w-full py-2 text-sm sm:text-base text-eggshell font-semibold rounded-lg bg-pigment_green hover:bg-sea_green transition"
            >
              ثبت نام
            </button>
          </form>
        ) : (
          <>
          <form className="space-y-4" onSubmit={handleVerify}>
            <div>
              <label className="block text-gray-700 right-farsi">کد تایید</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="X X X X X X"
                inputMode="numeric"
                maxLength={6}
                minLength={6}
                pattern="[0-9]*"
                required
                className="w-full px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-myfont text-center tracking-widest"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 text-sm sm:text-base text-eggshell font-semibold rounded-lg bg-pigment_green hover:bg-sea_green transition"
            >
              تایید
            </button>
          </form>
          <p className="text-center text-dim_gray font-myfont mt-4 text-sm sm:text-base">
              {timeLeft > 0 ? (
                <>زمان باقی‌مانده: {formatTime(timeLeft)}</>
              ) : (
                <button
                  type="button"
                  onClick={
                    (e) => {
                    setOtp("");
                    handleSignup(e);
                    setResend(true);
                  }}
                  className="flex inline-flex right-farsi items-center gap-3 justify-center w-full py-2 text-sm sm:text-base text-eggshell font-semibold rounded-lg bg-pigment_green hover:bg-sea_green transition"
                >
                  <FaSync />
                  ارسال مجدد کد
                </button>
              )}
            </p>
          </>
        )}

        <p className="mt-4 text-sm text-loop text-center font-semibold right-farsi">
          اطلاعات شما نزد ما محفوظ نگه داشته می‌شود!
        </p>
        <p className="text-center text-gray-600 mt-6 right-farsi">
          حساب کاربری دارید؟{" "}
          <Link to="/login" className="text-azul hover:underline">
            ورود
          </Link>
        </p>
      </div>
    </div>
  );
}
