import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getVendorsProducts } from "../../services/vendors/vendors";
import { enToFaNum } from "../../utils/NumConvertor";
import { createRequest } from "../../services/request/request";
import { getCurrentUser } from "../../utils/currentUser"; 
import { FaClipboardCheck } from "react-icons/fa";
import Loading from "../../components/ui/Loading";
import { toast } from "react-toastify";

export default function VendorsProducts () {
  const { vendorsId } = useParams();
  const [vendors, setVendors] = useState({});
  const navigate = useNavigate();
  const id = parseInt(vendorsId, 10);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [count, setCount] = useState(1);
  const [user, setUser] = useState(getCurrentUser);
  
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getVendorsProducts(id);
        setVendors(data);
      } catch (err) {
        if (err.message.includes("404")) {
          navigate("/404");
        } else {
          console.error("خطا در گرفتن محصولات:", err);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [id]);
  
  const handleConfirm = async () => {
    try {
        const token = localStorage.getItem("token");
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

  if (loading) return <Loading />;

  return (
    <div className="flex min-h-screen bg-gray-100">
          {/* Main Content */}
          <main className="flex-1 p-6">
            {/* Profile Card */}
            <div className="bg-white shadow rounded-lg p-6 flex flex-col sm:flex-row items-center sm:justify-between mb-8 right-farsi gap-4">
              {/* Left: Avatar + Info */}
              <div className="flex items-center gap-4">
              <img
                  src={vendors.avatar || "/vendors/default.jpg"}
                  alt={vendors.shop_name}
                  className="w-32 h-32 object-cover rounded-lg mb-4"
                />
                <div>
                  <h2 className="text-2xl font-bold">{vendors.shop_name}</h2>
                  <p className="text-gray-600">{vendors.shop_address}</p>
    
                </div>
              </div>
              {/* Right: Edit Info Button */}
              <p className="text-fulvous mb-2">امتیاز: {enToFaNum(vendors.rate)}</p>
            </div>
            <div>
                <div className="bg-white shadow rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between mb-8 right-farsi font-semibold gap-4">
                <p className="text-gray-800 right-farsi">از روز {vendors.start_day} تا روز {vendors.end_day}</p>
                <p className="text-gray-800 left-num">از ساعت {enToFaNum(vendors.start_time)} تا ساعت {enToFaNum(vendors.end_time)}</p>
                </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {vendors.products.map((product) => (
                      <div
                        key={product.id}
                        className="bg-white right-farsi rounded-xl shadow-md p-5 flex flex-col items-center transition transform hover:scale-105"
                      >
            
                        <h2 className="text-lg font-semibold mb-1">
                          {product.name} - {product.type}
                        </h2>
            
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
                        <div className="bg-white rounded-xl shadow-xl p-6 w-11/12 sm:w-96 right-farsi">
                          <h2 className="text-xl font-bold mb-4 text-gray-800">جزئیات محصول: {selectedProduct.name}</h2>
                          <p><span className="font-semibold">نوع محصول: </span> {selectedProduct.type}</p>
                          <p><span className="font-semibold">حداکثر تعداد سفارش: </span> {selectedProduct.inventory}</p>
                    
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

            </main>
        </div>
  )

}