import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import { enToFaNum } from "../../utlis/NumConvertor";
import { getProducts } from "../../routes/product/product";

export default function Home() {
  const [newestProducts, setNewestProducts] = useState([]);

  useEffect(() => {
    async function fetchNewest() {
      try {
        const data = await getProducts({ newest: true });
        setNewestProducts(data.slice(0, 6));
      } catch (error) {
        console.error("خطا در دریافت محصولات جدید:", error);
      }
    }
    fetchNewest();
  }, []);

  return (
    <div className="font-myfont">
      {/* Landing Section */}
      <section
        className="relative min-h-screen bg-isabelline bg-center flex flex-col items-center justify-center text-pine_green">

        <div className="relative z-10 text-center px-4 flex flex-col items-center justify-center">
          {/* Logo */}
          <img
            src="/icon/favicon.png"
            alt="LOOP Logo"
            className="w-48 md:w-56 lg:w-64 mx-auto mb-6"
          />

          {/* Newest Products */}
          {newestProducts.length > 0 && (
            <div className="mt-12 w-full max-w-6xl px-2">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 sm:mb-6">
                جدیدترین محصولات
              </h2>

              <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6">
                {newestProducts.map((p) => (
                  <div
                    key={p.id}
                    className="bg-eggshell text-black rounded-lg shadow-2xl p-4 flex flex-col items-center"
                  >
                    <h3 className="font-semibold text-center">{p.name}</h3>
                    <p className="text-gray-800 mt-1 text-sm sm:text-base right-farsi">
                      فروشگاه: {p.shop}
                    </p>
                    <p className="text-sm sm:text-base text-azul mt-1">
                      {enToFaNum(p.price.toLocaleString())} تومان
                    </p>
                  </div>
                ))}
              </div>

              {/* Horizontal scroll برای موبایل */}
              <div className="md:hidden flex overflow-x-auto gap-3 sm:gap-4 py-2 px-2">
                {newestProducts.slice(0, 4).map((p) => (
                  <div
                    key={p.id}
                    className="min-w-[120px] sm:min-w-[140px] bg-eggshell text-black rounded-lg shadow-2xl p-2 flex flex-col items-center flex-shrink-0"
                  >
                    <h3 className="font-semibold text-center text-sm">{p.name}</h3>
                    <p className="text-gray-800 mt-1 text-xs right-farsi">{p.shop}</p>
                    <p className="text-xs text-azul mt-1">{enToFaNum(p.price.toLocaleString())} تومان</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-center mt-8 mb-6">
                <Link to="/products">
                  <button className="px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-lg rounded-lg bg-pigment_green hover:bg-sea_green text-eggshell font-bold transition right-farsi">
                    نمایش بیشتر ...
                  </button>
                </Link>
              </div>
            </div>
          )}

            <Link to="/signup">
              <button className="inline-flex items-center px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-lg rounded-lg bg-pigment_green hover:bg-sea_green text-eggshell font-bold transition">
                ثبت نام
                <FaSignInAlt className="ml-2" />
              </button>
            </Link>

        </div>
      </section>
    </div>
  );
}
