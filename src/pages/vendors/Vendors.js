import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getVendors } from "../../routes/vendors/vendors";
import { enToFaNum } from "../../utlis/NumConvertor";

export default function Vendors () {
    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await getVendors();
          setVendors(data);
          console.log(vendors)
        } catch (err) {
          console.error("خطا در گرفتن فروشنده‌ها:", err);
        } finally {
        setLoading(false);
        }
      };
      fetchData();
    }, []);

    if (loading) return <p className="text-center mt-6 right-farsi">در حال بارگذاری...</p>;

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-5 md:px-10">
            <h1 className="text-4xl font-bold text-center mb-10"></h1>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
              {vendors.map((vendor) => (
                <div
                  key={vendor.id}
                  className="bg-white rounded-xl shadow-md p-5 flex flex-col items-center transition transform hover:scale-105"
                >
                    <img
                        src={"/vendors/default.jpg"}
                        alt={vendor.shop_name}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h2 className="text-lg font-semibold right-farsi">فروشگاه {vendor.shop_name}</h2>
                    <p className="text-gray-600 mb-2">{vendor.shop_address}</p>
                    <p className="font-bold mb-2">تعداد محصولات: {enToFaNum(vendor.products.length)}</p>
                    <p className="text-yellow-800 mb-2">امتیاز: {enToFaNum(vendor.rate)}</p>
                    <Link
                      to={`/vendors/${vendor.id}`}
                      className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      مشاهده بیشتر
                    </Link>
                </div>
              ))}
            </div>
        </div>
    )
}