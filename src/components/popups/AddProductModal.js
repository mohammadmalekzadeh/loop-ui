// src/components/AddProductModal.js
import React, { useState, } from "react";
import { postProducts } from "../../services/product/product";
import { toast } from "react-toastify";

export default function AddProductModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  const [loading, setLoading] = useState();
  
  
  const [product, setProduct] = useState({
    name: "",
    type: "",
    price: "",
    inventory: "",
  });
  const token = localStorage.getItem("token");

  const handleSave = async () => {
    if (!product.name.trim() || !product.type.trim() || !product.price || !product.inventory) {
          toast.warn("لطفاً همه فیلدها را پر کنید!");
          return;
        }
        
        const parsedPrice = parseInt(product.price, 10);
        if (Number.isNaN(parsedPrice) || parsedPrice <= 0) {
          toast.warn("لطفاً قیمت معتبر وارد کنید!");
          return;
        }
        const parsedInventory = parseInt(product.inventory, 10);
        if (Number.isNaN(parsedInventory) || parsedInventory <= 0) {
          toast.warn("لطفاً تعداد معتبر وارد کنید!");
          return;
        }
      
        setLoading(true);
        try {
          await postProducts(
            {
              name: product.name.trim(),
              type: product.type.trim(),
              price: parsedPrice,
              inventory: parsedInventory,
            },
            token
          );
        
          toast.success("محصول با موفقیت ذخیره شد!");
          
          if (typeof onSuccess === "function") {
            await onSuccess();
          }
          
          if (typeof onClose === "function") onClose();
          
          setTimeout(() => {
            window.location.reload();
          }, 1000);

          setProduct({ name: "", type: "", price: "", inventory: "" });
        } catch (err) {
          console.error("خطا در ذخیره محصول:", err);
          if (err?.response?.data?.message) {
            console.error(err.response.data.message);
          } else if (err.message && err.message.includes("405")) {
            toast.warn("اطلاعات حقیقی و حقوقی شما کافی نیست!");
          } else {
            toast.error("مشکلی پیش آمد!");
          }
        } finally {
          setLoading(false);
        }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[90%] sm:w-full max-w-md p-4 sm:p-6 relative">
        <h2 className="text-lg sm:text-xl font-bold mb-4 right-farsi">اضافه کردن محصول جدید</h2>

        {/* Form inputs */}
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium"></label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              required
              placeholder="اسم محصول جدیدت چیه؟"
              className="mt-1 block w-full border rounded p-2 text-sm sm:text-base right-farsi"
            />
          </div>

          <div>
            <label className="block text-sm font-medium"></label>
            <input
              type="text"
              value={product.type}
              onChange={(e) => setProduct({ ...product, type: e.target.value })}
              name="type"
              required
              placeholder="نوعش چیه؟ (مثلاً نوشیدنی، تنقلات و غیره ...)"
              className="mt-1 block w-full border rounded p-2 text-sm sm:text-base right-farsi"
            />
          </div>

          <div>
            <label className="block text-sm font-medium"></label>
            <input
              type="number"
              name="price"
              value={product.price.toLocaleString()}
              onChange={(e) => setProduct({ ...product, price: e.target.value })}
              required
              placeholder="چقدر میخوای بفروشیش؟ (به تومان)"
              className="mt-1 block w-full border rounded p-2 text-sm sm:text-base right-farsi"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium"></label>
            <input
              type="number"
              name="inventory"
              min={1}
              value={product.inventory}
              onChange={(e) => setProduct({ ...product, inventory: e.target.value })}
              required
              placeholder="چقدر موجودی داری؟"
              className="mt-1 block w-full border rounded p-2 text-sm sm:text-base right-farsi"
            />
          </div>
        </form>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-between mt-6 gap-3">
          <button
            onClick={handleSave}
            disabled={loading}
            className={`flex-1 ${loading ? "bg-blue-400" : "bg-pigment_green hover:bg-sea_green"} text-eggshell py-2 rounded-lg transition right-farsi`}
          >
            اضافه کن!
          </button>
          <button
            onClick={() => { if (!loading && typeof onClose === "function") onClose(); }}
            disabled={loading}
            className="flex-1 text-eggshell py-2 rounded-lg bg-dim_gray hover:bg-jet transition right-farsi"
          >
            کنسله!
          </button>
        </div>
      </div>
    </div>
  );
}
