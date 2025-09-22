import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { enToFaNum } from "../../utlis/NumConvertor";
import { getRequests } from "../../routes/request/request";
import { getCurrentUser } from "../../utlis/currentUser";
import { updateRequestStatus } from "../../routes/request/request";

export default function Request() {

  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchData() {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);

        const token = localStorage.getItem("token");
        const requests = await getRequests(token);
        setUserRole(currentUser.role);
        setRequests(requests);
      } catch (err) {
        console.error("Error fetching requests:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await updateRequestStatus(id, newStatus, token);

      setRequests((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, status: newStatus } : r
        )
      );
    } catch (err) {
      alert("خطا در تغییر وضعیت");
      console.error(err);
    }
  };

  if (loading) return <p className="text-center mt-6 right-farsi">در حال بارگذاری...</p>;
  if (!user) return navigate("/login");

  return (
    <div className="font-myfont min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">درخواست های شما</h2>

        {requests.role === "vendors" ? (
          <>
            {requests.length > 0 ? (
              <div className="space-y-4">
                {requests.map((req) => (
                  <div key={req.id} className="p-4 border rounded-lg flex justify-between items-center right-farsi">
                    <div>
                      <p className="font-semibold">
                        محصول: {req.product_name} به تعداد: {req.count}
                      </p>
                      <p className="text-sm text-gray-600">مشتری: {req.customer_name}</p>
                      <p className="text-sm text-gray-600 font-semibold">کد: {enToFaNum(req.code)}</p>
                      <p className="text-xs text-gray-500">{enToFaNum(req.date)}</p>
                      {req.status === "pending" && (
                        <p className="text-sm text-blue-600 mt-2 font-semibold">در اسرع وقت تحویل داده شود!</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {req.status === "pending" ? (
                        <span className="flex items-center gap-2">
                          <span className="text-yellow-600 font-semibold">در انتظار تحویل</span>
                          <button onClick={() => handleUpdateStatus(req.id, "accepted")} className="px-3 py-1 bg-yellow-500 text-white rounded">تحویل دادی؟</button>
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded text-white bg-green-600">تحویل داده شده</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center right-farsi">هیچ درخواستی ندارید.</p>
            )}
          </>
        ) : (
          <>
            {requests.length > 0 ? (
              <div className="space-y-4">
                {requests.map((req) => (
                  <div key={req.id} className="p-4 border rounded-lg flex justify-between items-center right-farsi">
                    <div>
                      <p className="font-semibold">
                        محصول: {req.product_name} به تعداد: {req.count}
                      </p>
                      <p className="text-sm text-gray-600">فروشنده: {req.vendors_name}</p>
                      <p className="text-sm text-gray-600">آدرس: {req.address}</p>
                      <p className="text-sm text-gray-600 font-semibold">کد: {enToFaNum(req.code)}</p>
                      <p className="text-xs text-gray-500">{enToFaNum(req.date)}</p>
                      {req.status === "pending" && (
                        <p className="text-sm text-green-600 mt-2 font-semibold">در اسرع وقت تحویل گرفته شود!</p>
                      )}
                    </div>
                    {req.status === "pending" ? (
                      <span className="flex items-center gap-2">
                        <span className="text-yellow-600 font-semibold">در انتظار تحویل</span>
                        <button onClick={() => handleUpdateStatus(req.id, "accepted")} className="px-3 py-1 bg-yellow-500 text-white rounded">تحویل گرفتی؟</button>
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded text-white bg-green-600">تحویل گرفته شده</span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center right-farsi">هیچ درخواستی ثبت نکرده‌اید.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
