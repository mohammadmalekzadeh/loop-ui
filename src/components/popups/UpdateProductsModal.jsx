import React, { useState, useEffect } from "react";
import { updateProducts } from "../../services/product/product";
import { toast } from "react-toastify";

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
      toast.warn("لطفاً همه فیلدها را پر کنید!");
      return;
    }

    const parsedPrice = parseInt(form.price, 10);
    const parsedInventory = parseInt(form.inventory, 10);

    if (Number.isNaN(parsedPrice) || parsedPrice <= 0) {
      toast.warn("لطفاً قیمت معتبر وارد کنید!");
      return;
    }

    if (Number.isNaN(parsedInventory) || parsedInventory <= 0) {
      toast.warn("لطفاً موجودی معتبر وارد کنید!");
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

      toast.success("محصول با موفقیت بروزرسانی شد!");

      if (typeof onSuccess === "function") onSuccess();
      if (typeof onClose === "function") onClose();
    } catch (err) {
      console.error("خطا در بروزرسانی محصول:", err);
      toast.error("مشکلی در بروزرسانی محصول پیش آمد!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[90%] sm:w-full max-w-md p-4 sm:p-6 relative">
        <h2 className="text-lg sm:text-xl font-bold mb-4 right-farsi">ویرایش محصول</h2>

        <form className="space-y-4 right-farsi">
          <label className="block mb-1 font-medium">نام محصول</label>
          <input
            type="text"
            placeholder="نام محصول"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="mt-1 block w-full border rounded p-2 text-sm sm:text-base right-farsi"
          />
          <label className="block mb-1 font-medium">نوع محصول</label>
          <input
            type="text"
            placeholder="نوع محصول"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="mt-1 block w-full border rounded p-2 text-sm sm:text-base right-farsi"
          />
          <label className="block mb-1 font-medium">قیمت (تومان)</label>
          <input
            type="number"
            placeholder="قیمت"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="mt-1 block w-full border rounded p-2 text-sm sm:text-base right-farsi"
          />
          <label className="block mb-1 font-medium">موجودی</label>
          <input
            type="number"
            placeholder="موجودی"
            value={form.inventory || "0"}
            onChange={(e) => setForm({ ...form, inventory: e.target.value })}
            className="mt-1 block w-full border rounded p-2 text-sm sm:text-base right-farsi"
          />
        </form>

        <div className="flex flex-col sm:flex-row justify-between mt-6 gap-3">
          <button
            onClick={handleSave}
            disabled={loading}
            className={`flex-1 ${loading ? "bg-blue-400" : "bg-pigment_green hover:bg-sea_green"} text-eggshell py-2 rounded-lg`}
          >
            ذخیره
          </button>
          <button
            onClick={() => { if (!loading && typeof onClose === "function") onClose(); }}
            disabled={loading}
            className="flex-1 bg-dim_gray text-eggshell py-2 rounded-lg hover:bg-jet right-farsi"
          >
            کنسله!
          </button>
        </div>
      </div>
    </div>
  );
}
