import { Link } from "react-router-dom";

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
