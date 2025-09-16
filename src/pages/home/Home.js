import { Link } from "react-router-dom";
import { enToFaNum } from "../../utlis/NumConvertor";

export default function Home() {
  return (
    <div className="font-myfont">
      {/* Landing Section*/}
      <section
        className="relative h-screen bg-cover bg-center flex flex-col items-center justify-center text-white"
        style={{
          backgroundImage: "url('/background/home.jpg')",
        }}
      >
        {/* Dark overlay*/}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 right-farsi">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            به <span className="text-blue-500">لووپ</span> خوش آمدید!
          </h1>

        {/* Quick Login Box */}
          <form
            className="p-6 mb-6 text-gray-800 right-farsi"
          >
            <div className="flex left-num">
              <span className="inline-flex items-center px-3 bg-gray-200 rounded-l-lg">
                +۹۸
              </span>
              <input
                type="tel"
                placeholde={enToFaNum(9123456789)}
                placeholder="۹۱۲۳۴۵۶۷۸۹"
                required
                className="w-full px-4 py-2 border rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-myfont"
              />
            </div>
            <button
              type="submit"
              className="w-full mt-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              ورود
            </button>
            <p className="text-center text-yellow-500 mt-6 right-farsi">
            حساب کاربری ندارید؟{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
                ثبت نام کنید
            </Link>
            </p>
          </form>

          <Link to="/products">
            <button className="px-6 py-3 bg-blue-600 rounded-lg text-lg hover:bg-blue-700 transition">
              مشاهده محصولات
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
