import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaCog, FaTrash, FaPlus, FaDirections } from "react-icons/fa";
import AddProductModal from "../../components/popups/AddProductModal";
import { enToFaNum, faToEnNum } from "../../utlis/NumConvertor";

// Mock data (now with arrays)
const vendors_mockup_data = [
  {
    id: 1,
    name: "علی کاظمی",
    phonenumber: 9123456789,
    role: "vendors",
    sell_items: [
      { id: 1, name: "محصول A", type: "نوع A", price: 120000 },
      { id: 2, name: "محصول X", type: "نوع X", price: 75000 },
    ],
    buy_items: [
      {
        id: 2,
        name: "محصول B",
        type: "نوع B",
        price: 45000,
        shop: "ممد",
        buy_date: "2025-09-08",
      },
      {
        id: 3,
        name: "محصول Y",
        type: "نوع Y",
        price: 56000,
        shop: "علی",
        buy_date: "2025-08-30",
      },
    ],
  },
];

const customer_mockup_data = [
  {
    id: 1,
    name: "علی کاظمی",
    phonenumber: 9123456789,
    role: "customer",
    buy_items: [
      {
        id: 1,
        name: "محصول C",
        type: "نوع C",
        price: 45000,
        shop: "فروشگاه C",
        buy_date: "2025-09-08",
      },
    ],
  },
];

export default function Dashboard() {
  // change this to test roles:
  const user = vendors_mockup_data[0];
  // const user = customer_mockup_data[0];

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Profile Card */}
        <div className="bg-white shadow rounded-lg p-6 flex items-center justify-between mb-8 right-farsi">
          {/* Left: Avatar + Info */}
          <div className="flex items-center">
            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-gray-600 left-num">+۹۸ {enToFaNum(user.phonenumber)}</p>
            </div>
          </div>

          {/* Right: Edit Info Button */}
          <Link
            to="/dashboard/settings"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition right-farsi"
          >
            <FaCog />
            ویرایش اطلاعات
          </Link>
        </div>

        {/* Cards area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left column: Sell items (if vendor) OR Bought items (if customer) */}
          <div className="bg-white shadow rounded-lg p-6">
            {user.role === "vendors" ? (
              <>
                <h3 className="text-lg font-bold mb-4 right-farsi">محصولاتی که داری می فروشی</h3>
                {Array.isArray(user.sell_items) && user.sell_items.length > 0 ? (
                  <div className="space-y-4">
                    {user.sell_items.map((it) => (
                      <div
                        key={it.id}
                        className="flex items-center justify-between p-3 border rounded right-farsi"
                      >
                        <div>
                          <div className="font-semibold">{it.name}</div>
                          <div className="text-sm text-gray-500">{it.type}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-blue-600 font-bold">
                            {enToFaNum(it.price.toLocaleString())} تومان
                          </div>
                          <button className="text-red-600 hover:text-red-800">
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 right-farsi">هنوز کالایی برای فروش وجود ندارد.</p>
                )}

                {/* Add New Product Button */}
                <div className="mt-6">
                  <button
                   onClick={() => setIsModalOpen(true)}
                   className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition right-farsi">
                    <FaPlus />
                    محصول جدیدت رو اضافه کن
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-lg font-bold mb-4 right-farsi">محصولاتی که خریدی</h3>
                {Array.isArray(user.buy_items) && user.buy_items.length > 0 ? (
                  <div className="space-y-4">
                    {user.buy_items.map((it) => (
                      <div
                        key={it.id}
                        className="flex items-center justify-between p-3 border rounded right-farsi"
                      >
                        <div>
                          <div className="font-semibold">{it.name}</div>
                          <div className="text-sm text-gray-500">{it.type}</div>
                          <div className="text-xs text-gray-400">از فروشگاه: {it.shop}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-blue-600 font-bold">
                            {enToFaNum(it.price.toLocaleString())} تومان
                          </div>
                          <div className="text-xs text-gray-400">{enToFaNum(it.buy_date)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 right-farsi">شما هنوز هیچ کالایی نخریده‌اید.</p>
                )}
              </>
            )}
          </div>

          {/* Right column: if vendor show bought items; if customer hide this column */}
          {user.role === "vendors" ? (
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4 right-farsi">محصولاتی که فروختی</h3>
              {Array.isArray(user.buy_items) && user.buy_items.length > 0 ? (
                <div className="space-y-4">
                  {user.buy_items.map((it) => (
                    <div
                      key={it.id}
                      className="flex items-center justify-between p-3 border rounded right-farsi"
                    >
                      <div>
                        <div className="font-semibold">{it.name}</div>
                        <div className="text-sm text-gray-500">{it.type}</div>
                        <div className="text-xs text-gray-400">به: {it.shop}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-blue-600 font-bold">
                          {enToFaNum(it.price.toLocaleString())} تومان
                        </div>
                        <div className="text-xs text-gray-400">{enToFaNum(it.buy_date)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 right-farsi">هنوز هیچی نفروختی .</p>
              )}
            </div>
          ) : null}
        </div>
      </main>
      <AddProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
