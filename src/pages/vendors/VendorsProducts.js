import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getVendorsProducts } from "../../routes/vendors/vendors";
import { enToFaNum } from "../../utlis/NumConvertor";
import { createRequest } from "../../routes/request/request";
import { getCurrentUser } from "../../utlis/currentUser"; 

export default function VendorsProducts () {
  const { vendorsId } = useParams();
  const [vendors, setVendors] = useState({});
  const navigate = useNavigate();
  const id = parseInt(vendorsId, 10);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [count, setCount] = useState(1);
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  

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
  
        setUser(getCurrentUser);
  
        if (!user) {
          alert("لطفا ابتدا وارد شوید");
          navigate("/login");
          return;
        }
  
        const data = {
          product_id: selectedProduct.id,
          count: count,
        };
  
        const res = await createRequest(data, token);
        alert(`درخواست با موفقیت ثبت شد ✅ | کد درخواست: ${res.code}`);
        setSelectedProduct(null);
      } catch (err) {
        console.error(err);
        alert("خطا در ثبت درخواست ❌");
      }
    };

  if (loading) return <p className="text-center mt-6 right-farsi">در حال بارگذاری...</p>;

  return (
    <div className="flex min-h-screen bg-gray-100">
          {/* Main Content */}
          <main className="flex-1 p-6">
            {/* Profile Card */}
            <div className="bg-white shadow rounded-lg p-6 flex items-center justify-between mb-8 right-farsi">
              {/* Left: Avatar + Info */}
              <div className="flex items-center">
                <div>
                  <h2 className="text-2xl font-bold">{vendors.shop_name}</h2>
                  <p className="text-gray-600">{vendors.shop_address}</p>
    
                </div>
              </div>
              {/* Right: Edit Info Button */}
              <p className="text-yellow-800 mb-2">امتیاز: {enToFaNum(vendors.rate)}</p>
            </div>
            <div>
                <div className="bg-white shadow rounded-lg p-6 flex items-center justify-between mb-8 right-farsi font-semibold transition responsive">
                <p className="text-gray-800 right-farsi">از روز {vendors.start_day} تا روز {vendors.end_day}</p>
                <p className="text-gray-800 left-num">از ساعت {enToFaNum(vendors.start_time)} تا ساعت {enToFaNum(vendors.end_time)}</p>
                </div>
            </div>

            {vendors.products.map((product) => (
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

                    {/* Popup Modal */}
                    {selectedProduct && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl shadow-xl p-6 w-96 right-farsi">
                          <h2 className="text-xl font-bold mb-4 text-gray-800">جزئیات محصول: {selectedProduct.name}</h2>
                          <p><span className="font-semibold">نوع محصول: </span> {selectedProduct.type}</p>
                          <p><span className="font-semibold">آدرس: </span> {selectedProduct.address}</p>
                    
                          <div className="mt-4">
                            <label className="block text-gray-700 font-semibold mb-2">
                              چندتا میخوای؟
                            </label>
                            <input
                              type="number"
                              min="1"
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

            </main>
        </div>
  )

}