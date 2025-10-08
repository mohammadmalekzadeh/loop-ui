import React, { useState, useEffect, useMemo } from "react";
import { FaClipboardCheck } from "react-icons/fa";
import { enToFaNum, faToEnNum } from "../../utils/NumConvertor";
import { createRequest } from "../../services/request/request";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../utils/currentUser"; 
import { getProducts } from "../../services/product/product";
import Loading from "../../components/ui/Loading";
import { toast } from "react-toastify";

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
    newest: true,
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
  
  if (loading) return <Loading />;

  const handleConfirm = async () => {
        try {
          const currentUser = await getCurrentUser();
          setUser(currentUser);

          if (count > selectedProduct.inventory) return toast.warn("نمیشه که!");
  
          const data = {
            product_id: selectedProduct.id,
            count: count,
          };
    
          const res = await createRequest(data, token);
          toast.success("درخواست با موفقیت ثبت شد!");
          setSelectedProduct(null);
        } catch (err) {
          if (err.message.includes("401")) {
            toast.warn("برای ثبت درخواست وارد حساب کاربری خود بشوید!");
            navigate("/login");
          } else if (err.message.includes("400")) {
            toast.info("برای ثبت درخواست باید خریدار باشی :)");
          } else {
           console.error(err);
           toast.error("خطا در ثبت درخواست!");
          }
        }
      };

  return (
    
    <div className="min-h-screen bg-isabelline py-10 px-5 md:px-10">
      <h1 className="text-4xl text-loop font-bold text-center mb-10">محصولات</h1>
        <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col sm:flex-wrap sm:flex-row items-start sm:items-center gap-4 right-farsi">
          {/* نوع محصول */}
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="border rounded p-2 right-farsi"
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
                type: "",
                shop_name: "",
                price: "",
                rate: "",
                is_popular: false,
                newest: false,
              })
            }
            className="px-4 py-2 bg-fire_brick text-eggshell rounded-lg hover:bg-red-600 transition"
          >
            حذف فیلترها
          </button>
        </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white right-farsi rounded-xl shadow-md p-4 sm:p-5 flex flex-col items-center transition transform hover:scale-105 w-full"
          >

            <h2 className="text-lg font-semibold mb-1">
              {product.name} - {product.type}
            </h2>

            <p className="text-gray-700 mb-1">فروشگاه: {product.shop}</p>
            <p className="text-fulvous mb-2">امتیاز: {enToFaNum(product.rate)}</p>

            <p className="text-azul font-bold mb-4 left-num">
              {enToFaNum(product.price.toLocaleString())} تومان
            </p>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-pigment_green hover:bg-sea_green text-eggshell rounded-lg transition"
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
          <div className="bg-white rounded-xl shadow-xl p-4 sm:p-6 w-11/12 sm:w-96 right-farsi">
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
                step={1}
                onChange={(e) => setCount(Number(e.target.value))}
                className="w-full border rounded-lg p-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-between mt-6 gap-3">
              <button
                onClick={() => setSelectedProduct(null)}
                className="flex-1 bg-dim_gray hover:bg-jet text-eggshell py-2 rounded-lg transition"
              >
                لغو
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 bg-pigment_green hover:bg-sea_green text-eggshell py-2 rounded-lg transition"
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
