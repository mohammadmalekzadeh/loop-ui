import React from "react";
import { useState } from "react";
import { FaClipboardCheck } from "react-icons/fa";
import { enToFaNum, faToEnNum } from "../../utlis/NumConvertor";
import Alert from "../../components/ui/Alert";

const products = [
  { id: 1, name: "محصول 1", type: "نوع 1", vendor: "فروشنده 1", shop: "فروشگاه 1", address: "آدرس 1", price: 120000 },
  { id: 2, name: "محصول 2", type: "نوع 2", vendor: "فروشنده 2", shop: "فروشگاه 2", address: "آدرس 2", price: 80000 },
  { id: 3, name: "محصول 3", type: "نوع 3", vendor: "فروشنده 3", shop: "فروشگاه 3", address: "آدرس 3", price: 45000 },
  { id: 3, name: "محصول 4", type: "نوع 4", vendor: "فروشنده 4", shop: "فروشگاه 4", address: "آدرس 4", price: 105000 },
];

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);

    const handleConfirm = () => {
    setSelectedProduct(null);
    setAlertMessage("a");

    setTimeout(() => {
      setAlertMessage(null);
    }, 5000);
  };

  return (
    
    <div className="min-h-screen bg-gray-100 py-10 px-5 md:px-10">
      
    {alertMessage && (
      <div className="fixed top-5 right-5 z-50 w-80">
        <Alert
          type="success"
          message={alertMessage}
          onClose={() => setAlertMessage(null)}
        >درخواست شما ثبت شد ✅ همین امروز حوالی ساعت ۱۸ تا ۲۲ تحویل بگیرید</Alert>
      </div>
    )}
      
      <h1 className="text-4xl font-bold text-center mb-10"></h1>
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 right-farsi"> */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
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

            <p className="text-blue-600 font-bold mb-4">
              {enToFaNum(product.price.toLocaleString())} تومان
            </p>
            <button
              onClick={() => setSelectedProduct(product)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
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
            <p><span className="font-semibold">نوع محصول:</span> {selectedProduct.type}</p>
            <p><span className="font-semibold">نام فروشنده:</span> {selectedProduct.vendor}</p>
            <p><span className="font-semibold">فروشگاه:</span> {selectedProduct.shop}</p>
            <p><span className="font-semibold">آدرس:</span> {selectedProduct.address}</p>

            <div className="mt-4">
              <label className="block text-gray-700 font-semibold mb-2">
                چندتا میخوای؟
              </label>
              <input
                type="number"
                min="1"
                defaultValue={1}
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
