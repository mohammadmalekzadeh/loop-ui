import React, { useState, useEffect, useMemo } from "react";
import { FaClipboardCheck } from "react-icons/fa";
import { enToFaNum, faToEnNum } from "../../utlis/NumConvertor";
import { createRequest } from "../../routes/request/request";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../utlis/currentUser"; 
import { getProducts } from "../../routes/product/product";

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [count, setCount] = useState(1);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [user, setUser] = useState();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    type: "",
    shop_name: "",
    price: "",
    rate: "",
    is_popular: false,
  });
  const [types, setTypes] = useState([]);
  const [shops, setShops] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
            const base_data = await getProducts();
            const uniqueTypes = [...new Set(base_data.map((p) => p.type))];
            setTypes(uniqueTypes);
            const uniqueShops = [...new Set(base_data.map((p) => p.shop))];
            setShops(uniqueShops);

            const data = await getProducts(filters);
            setProducts(data);
          } catch (err) {
            console.error("خطا در گرفتن محصولات:", err);
          } finally {
          setLoading(false);
          }
        };
        fetchData();
      }, [filters]);
  
  if (loading) return <p className="text-center mt-6 right-farsi">در حال بارگذاری...</p>;

  const handleConfirm = async () => {
        try {
          const currentUser = await getCurrentUser();
          setUser(currentUser);

          if (count > selectedProduct.inventory) return alert("نمیشه که!");
  
          const data = {
            product_id: selectedProduct.id,
            count: count,
          };
    
          const res = await createRequest(data, token);
          alert(`درخواست با موفقیت ثبت شد ✅ | کد درخواست: ${res.code}`);
          setSelectedProduct(null);
        } catch (err) {
          if (err.message.includes("401")) {
            alert("برای ثبت درخواست وارد حساب کاربری خود بشوید!");
          } else if (err.message.includes("400")) {
            alert("برای ثبت درخواست باید خریدار باشی :)");
          } else {
           console.error(err);
           alert("خطا در ثبت درخواست ❌");
          }
        }
      };

  return (
    
    <div className="min-h-screen bg-gray-100 py-10 px-5 md:px-10">
      <h1 className="text-4xl font-bold text-center mb-10"></h1>
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 right-farsi"> */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6 grid grid-cols-1 md:grid-cols-5 gap-4 right-farsi">
          {/* نوع محصول */}
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="border rounded p-2"
          >
            <option value="">همه نوع‌ها</option>
            {types.map((t, i) => (
            <option key={i} value={t}>
              {t}
            </option>
            ))}
          </select>

          {/* فروشگاه */}
          <select
            value={filters.shop_name}
            onChange={(e) => setFilters({ ...filters, shop_name: e.target.value })}
            className="border rounded p-2 right-farsi"
          >
            <option value="">همه فروشگاه‌ها</option>
            {shops.map((s, i) => (
              <option key={i} value={s}>
                {s}
              </option>
            ))}
          </select>

          {/* قیمت */}
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 cursor-pointer"><input className="w-5 h-5 border-2 border-gray-400 rounded-full checked:bg-blue-500 checked:border-blue-500 transition-all duration-200" type="radio" name="price" onChange={() => setFilters({ ...filters, price: "min" })}/><span className="select-none text-gray-700">ارزان‌ترین</span></label>
            <label className="flex items-center gap-2 cursor-pointer"><input className="w-5 h-5 border-2 border-gray-400 rounded-full checked:bg-blue-500 checked:border-blue-500 transition-all duration-200" type="radio" name="price" onChange={() => setFilters({ ...filters, price: "max" })}/><span className="select-none text-gray-700">گران‌ترین</span></label>
          </div>

          {/* امتیاز */}
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 cursor-pointer"><input className="w-5 h-5 border-2 border-gray-400 rounded-full checked:bg-blue-500 checked:border-blue-500 transition-all duration-200" type="radio" name="rate" onChange={() => setFilters({ ...filters, rate: "min" })}/><span className="select-none text-gray-700">کمترین امتیاز</span></label>
            <label className="flex items-center gap-2 cursor-pointer"><input className="w-5 h-5 border-2 border-gray-400 rounded-full checked:bg-blue-500 checked:border-blue-500 transition-all duration-200" type="radio" name="rate" onChange={() => setFilters({ ...filters, rate: "max" })}/><span className="select-none text-gray-700">بیشترین امتیاز</span></label>
          </div>

          {/* محبوب */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.is_popular}
              onChange={(e) => setFilters({ ...filters, is_popular: e.target.checked })}
              className="w-5 h-5 border-2 border-gray-400 rounded-lg checked:bg-pink-500 checked:border-pink-500 transition-all duration-200"
            />
            <span className="select-none text-gray-700">محبوب‌ترین</span>
          </label>
        </div>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-8 right-farsi">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-md p-5 flex flex-col items-center transition transform hover:scale-105"
          >
            <img
              src={"/products/default.jpg"}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />

            <h2 className="text-lg font-semibold mb-1">
              {product.name} - {product.type}
            </h2>

            <p className="text-gray-700 mb-1">فروشگاه: {product.shop}</p>
            <p className="text-yellow-800 mb-2">امتیاز: {enToFaNum(product.rate)}</p>

            <p className="text-blue-600 font-bold mb-4">
              {enToFaNum(product.price.toLocaleString())} تومان
            </p>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              onClick={ () => {
                setSelectedProduct(product);
                setCount(1);
              }}
            >
              <FaClipboardCheck />
              ثبت درخواست
            </button>
          </div>
        ))}
      </div>
      {/* Popup Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-96 right-farsi">
            <h2 className="text-xl font-bold mb-4 text-gray-800">جزئیات محصول: {selectedProduct.name}</h2>
            <p><span className="font-semibold">نوع محصول: </span> {selectedProduct.type}</p>
            <p><span className="font-semibold">نام فروشنده: </span> {selectedProduct.vendor}</p>
            <p><span className="font-semibold">فروشگاه: </span> {selectedProduct.shop}</p>
            <p><span className="font-semibold">آدرس: </span> {selectedProduct.address}</p>
            <p><span className="font-semibold">حداکثر تعداد سفارش:</span> {enToFaNum(selectedProduct.inventory)}</p>

            <div className="mt-4">
              <label className="block text-gray-700 font-semibold mb-2">
                چندتا میخوای؟
              </label>
              <input
                type="number"
                min={1}
                max={selectedProduct.inventory}
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="w-full border rounded-lg p-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-between mt-6 gap-3">
              <button
                onClick={() => setSelectedProduct(null)}
                className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition"
              >
                لغو
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                تایید
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
