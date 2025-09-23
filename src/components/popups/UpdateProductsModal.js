// src/components/popups/UpdateProductModal.js
import React, { useState, useEffect } from "react";
import { updateProducts } from "../../routes/product/product";

export default function UpdateProductModal({ isOpen, onClose, product, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    type: "",
    price: "",
    inventory: "",
  });

  const token = localStorage.getItem("token");

  // وقتی modal باز شد، فرم رو با اطلاعات محصول پر می‌کنیم
  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || "",
        type: product.type || "",
        price: product.price || "",
        inventory: product.inventory || "",
      });
    }
  }, [product]);

  if (!isOpen) return null;

  const handleSave = async () => {
    if (!form.name.trim() || !form.type.trim() || !form.price || !form.inventory) {
      alert("لطفاً همه فیلدها را پر کنید.");
      return;
    }

    const parsedPrice = parseInt(form.price, 10);
    const parsedInventory = parseInt(form.inventory, 10);

    if (Number.isNaN(parsedPrice) || parsedPrice <= 0) {
      alert("لطفاً قیمت معتبر وارد کنید.");
      return;
    }

    if (Number.isNaN(parsedInventory) || parsedInventory <= 0) {
      alert("لطفاً موجودی معتبر وارد کنید.");
      return;
    }

    setLoading(true);
    try {
      await updateProducts(product.id, {
        name: form.name.trim(),
        type: form.type.trim(),
        price: parsedPrice,
        inventory: parsedInventory,
      }, token);

      alert("محصول با موفقیت بروزرسانی شد ✅");

      if (typeof onSuccess === "function") onSuccess();
      if (typeof onClose === "function") onClose();
    } catch (err) {
      console.error("خطا در بروزرسانی محصول:", err);
      alert("مشکلی در بروزرسانی محصول پیش آمد ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <h2 className="text-xl font-bold mb-4 right-farsi">ویرایش محصول</h2>

        <form className="space-y-4 right-farsi">
          <label className="block mb-1 font-medium">نام محصول</label>
          <input
            type="text"
            placeholder="نام محصول"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border rounded p-2"
          />
          <label className="block mb-1 font-medium">نوع محصول</label>
          <input
            type="text"
            placeholder="نوع محصول"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="w-full border rounded p-2"
          />
          <label className="block mb-1 font-medium">قیمت (تومان)</label>
          <input
            type="number"
            placeholder="قیمت"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="w-full border rounded p-2"
          />
          <label className="block mb-1 font-medium">موجودی</label>
          <input
            type="number"
            placeholder="موجودی"
            value={form.inventory || "0"}
            onChange={(e) => setForm({ ...form, inventory: e.target.value })}
            className="w-full border rounded p-2"
          />
        </form>

        <div className="flex justify-between mt-6 gap-3">
          <button
            onClick={handleSave}
            disabled={loading}
            className={`flex-1 ${loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"} text-white py-2 rounded-lg`}
          >
            ذخیره
          </button>
          <button
            onClick={() => { if (!loading && typeof onClose === "function") onClose(); }}
            disabled={loading}
            className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600"
          >
            لغو
          </button>
        </div>
      </div>
    </div>
  );
}
