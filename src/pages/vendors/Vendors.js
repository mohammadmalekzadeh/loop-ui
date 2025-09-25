import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getVendors } from "../../routes/vendors/vendors";
import { enToFaNum } from "../../utlis/NumConvertor";
import Loading from "../../components/ui/Loading";

export default function Vendors () {
    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
      rate: "",
      is_work: false,
      newest: false,
    });

    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await getVendors(filters);
          setVendors(data);
        } catch (err) {
          console.error("خطا در گرفتن فروشنده‌ها:", err);
        } finally {
        setLoading(false);
        }
      };
      fetchData();
    }, [filters]);

    if (loading) return <Loading />;

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-5 md:px-10">
            <h1 className="text-4xl text-loop font-bold text-center mb-10">فروشندگان</h1>
            <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-wrap items-center gap-4 right-farsi">
          
          {/* امتیاز */}
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 cursor-pointer"><input className="w-5 h-5 border-2 border-gray-400 rounded-full checked:bg-blue-500 checked:border-blue-500 transition-all duration-200" type="radio" name="rate" onChange={() => setFilters({ ...filters, rate: "min" })}/><span className="select-none text-gray-700">کمترین امتیاز</span></label>
            <label className="flex items-center gap-2 cursor-pointer"><input className="w-5 h-5 border-2 border-gray-400 rounded-full checked:bg-blue-500 checked:border-blue-500 transition-all duration-200" type="radio" name="rate" onChange={() => setFilters({ ...filters, rate: "max" })}/><span className="select-none text-gray-700">بیشترین امتیاز</span></label>
          </div>

          {/* پرکار*/}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.is_work}
              onChange={(e) => setFilters({ ...filters, is_work: e.target.checked })}
              className="w-5 h-5 border-2 border-gray-400 rounded-lg checked:bg-pink-500 checked:border-pink-500 transition-all duration-200"
            />
            <span className="select-none text-gray-700">پرکارترین</span>
          </label>
          
          {/* جدید */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.newest}
              defaultChecked
              onChange={(e) => setFilters({ ...filters, newest: e.target.checked })}
              className="w-5 h-5 border-2 border-gray-400 rounded-lg checked:bg-pink-500 checked:border-pink-500 transition-all duration-200"
            />
            <span className="select-none text-gray-700">جدیدترین</span>
          </label>

          <button
            onClick={() =>
              setFilters({
                rate: "",
                is_work: false,
                newest: false,
              })
            }
            className="px-4 py-2 bg-fire_brick text-eggshell rounded-lg hover:bg-red-600 transition"
          >
            حذف فیلترها
          </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 right-farsi">
              {vendors.map((vendor) => (
                <div
                  key={vendor.id}
                  className="bg-white rounded-xl shadow-md p-5 flex flex-col items-center transition transform hover:scale-105"
                >
                    <img
                        src={vendor.avatar || "/vendors/default.jpg"}
                        alt={vendor.shop_name}
                        className="w-32 h-32 object-cover rounded-lg mb-4"
                    />
                    <h2 className="text-lg font-semibold right-farsi">فروشگاه {vendor.shop_name}</h2>
                    <p className="text-gray-600 mb-2">{vendor.shop_address}</p>
                    <p className="font-bold mb-2">تعداد محصولات: {enToFaNum(vendor.products.length)}</p>
                    <p className="text-fulvous mb-2">امتیاز: {enToFaNum(vendor.rate)}</p>
                    <Link
                      to={`/vendors/${vendor.id}`}
                      className="mt-3 bg-pigment_green hover:bg-sea_green text-eggshell px-4 py-2 rounded-lg transition"
                    >
                      مشاهده بیشتر
                    </Link>
                </div>
              ))}
            </div>
        </div>
    )
}