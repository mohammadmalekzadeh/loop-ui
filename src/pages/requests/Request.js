import React from "react";
import { enToFaNum } from "../../utlis/NumConvertor";

export const vendor_requests = [
  {
    id: 1,
    product: "گوشی موبایل A",
    customer: "مهدی رضایی",
    status: "pending", // pending | accepted
    date: "2025-09-08",
    code: 689453,
    count: 1,
  },
  {
    id: 2,
    product: "لپتاپ X",
    customer: "سارا محمدی",
    status: "accepted",
    date: "2025-09-05",
    code: 689453,
    count: 1,
  },  {
    id: 3,
    product: "لپتاپ X",
    customer: "سارا محمدی",
    status: "accepted",
    date: "2025-09-05",
    code: 689453,
    count: 1,
  },
];

const customer_requests = [
  {
    id: 1,
    product: "کتاب Y",
    vendor: "فروشگاه کتابچی",
    address: "ایران، اصفهان، نجف آباد",
    status: "pending",
    date: "2025-09-06",
    code: 689453,
    count: 1,
  },
  {
    id: 2,
    product: "کتاب Y",
    vendor: "فروشگاه کتابچی",
    address: "ایران، اصفهان، نجف آباد",
    status: "accepted",
    date: "2025-09-06",
    code: 689453,
    count: 1,
  },
  {
    id: 2,
    product: "کتاب Y",
    vendor: "فروشگاه کتابچی",
    address: "ایران، اصفهان، نجف آباد",
    status: "pending",
    date: "2025-09-06",
    code: 689453,
    count: 1,
  },
];

export default function Request() {
  // const userRole = "vendors";
  const userRole = "customer";

  return (
    <div className="font-myfont min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">درخواست های شما</h2>

        {userRole === "vendors" ? (
          <>
            {vendor_requests.length > 0 ? (
              <div className="space-y-4">
                {vendor_requests.map((req) => (
                  <div
                    key={req.id}
                    className="p-4 border rounded-lg flex justify-between items-center right-farsi"
                  >
                    <div>
                      <p className="font-semibold">محصول: {req.product} به تعداد: {req.count}</p>
                      <p className="text-sm text-gray-600">
                        مشتری: {req.customer}
                      </p>
                      <p className="text-sm text-gray-600 font-semibold">کد: {enToFaNum(req.code)}</p>
                      <p className="text-xs text-gray-500">
                        {enToFaNum(req.date)}
                      </p>
                      {/* پیام برای فروشنده */}
                      {req.status === "pending" && (
                        <p className="text-sm text-blue-600 mt-2 font-semibold">
                          همین امروز تحویل داده شود! - حوالی ساعت ۱۸ تا ۲۲
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {req.status === "pending" ? (
                        <span className="flex items-center gap-2">
                          <span className="text-yellow-600 font-semibold">در انتظار تحویل</span>
                          <button className="px-3 py-1 bg-yellow-500 text-white rounded">
                            تحویل دادی؟
                          </button>
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded text-white bg-green-600">
                          تحویل داده شده
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center right-farsi">
                هیچ درخواستی ندارید.
              </p>
            )}
          </>
        ) : (
          <>
            {customer_requests.length > 0 ? (
              <div className="space-y-4">
                {customer_requests.map((req) => (
                  <div
                    key={req.id}
                    className="p-4 border rounded-lg flex justify-between items-center right-farsi"
                  >
                    <div>
                      <p className="font-semibold">محصول: {req.product} به تعداد: {req.count}</p>
                      <p className="text-sm text-gray-600">
                        فروشنده: {req.vendor}
                      </p>
                      <p className="text-sm text-gray-600">آدرس: {req.address}</p>
                      <p className="text-sm text-gray-600 font-semibold">کد: {enToFaNum(req.code)}</p>
                      <p className="text-xs text-gray-500">
                        {enToFaNum(req.date)}
                      </p>
                      {/* پیام برای مشتری */}
                      {req.status === "pending" && (
                        <p className="text-sm text-green-600 mt-2 font-semibold">
                          همین امروز تحویل بگیرید! - حوالی ساعت ۱۸ تا ۲۲
                        </p>
                      )}
                    </div>
                    {req.status === "pending" ? (
                      <span className="flex items-center gap-2">
                        <span className="text-yellow-600 font-semibold">در انتظار تحویل</span>
                        <button className="px-3 py-1 bg-yellow-500 text-white rounded">
                          تحویل گرفتی؟
                        </button>
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded text-white bg-green-600">
                        تحویل گرفته شده
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center right-farsi">
                هیچ درخواستی ثبت نکرده‌اید.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
