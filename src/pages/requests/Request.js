import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { enToFaNum } from "../../utils/NumConvertor";
import { getRequests } from "../../services/request/request";
import { getCurrentUser } from "../../utils/currentUser";
import { updateRequestStatus } from "../../services/request/request";
import RateModal from "../../components/popups/RateModal";
import { sendRate } from "../../services/request/request";
import Loading from "../../components/ui/Loading";
import { toast } from "react-toastify";

export default function Request() {

  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [filters, setFilters] = useState({
    status: "",
    date: "new",
    code: "",
  });
  const [showRateModal, setShowRateModal] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  
  useEffect(() => {
    if (!token) return navigate("/login");
    async function fetchData() {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);

        const requests = await getRequests(filters, token);
        setUserRole(currentUser.role);
        setRequests(requests);
      } catch (err) {
        console.error("Error fetching requests:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [filters]);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await updateRequestStatus(id, newStatus, token);

      setRequests((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, status: newStatus } : r
        )
      );

      if (userRole === "customer" && newStatus === "accepted") {
        setSelectedRequestId(id);
        setShowRateModal(true);
      }
    } catch (err) {
      toast.error("خطا در تغییر وضعیت!");
      console.error(err);
    }
  };

  const handleRateSubmit = async (rate) => {
    try {
      const token = localStorage.getItem("token");
      await sendRate(selectedRequestId, rate, token);
      toast.success("امتیاز ثبت شد!");
    } catch (err) {
      toast.error("خطا در ثبت امتیاز!");
      console.error(err);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="font-myfont min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl text-loop font-bold mb-6 text-center">درخواست های شما</h2>

        <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 right-farsi">
          {/* status */}
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="border rounded p-2"
          >
            <option value="">همه درخواست ها</option>
            <option value={"accepted"}>تمام شده</option>
            <option value={"pending"}>در انتظار</option>
          </select>

          {/* date */}
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 cursor-pointer"><input className="w-5 h-5 border-2 border-gray-400 rounded-full checked:bg-blue-500 checked:border-blue-500 transition-all duration-200" type="radio" name="date" onChange={() => setFilters({ ...filters, date: "old" })}/><span className="select-none text-gray-700">قدیمی ترین</span></label>
            <label className="flex items-center gap-2 cursor-pointer"><input className="w-5 h-5 border-2 border-gray-400 rounded-full checked:bg-blue-500 checked:border-blue-500 transition-all duration-200" type="radio" name="date" onChange={() => setFilters({ ...filters, date: "new" })} defaultChecked/><span className="select-none text-gray-700">جدیدترین</span></label>
          </div>

          {/* code */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="number"
              value={filters.code}
              placeholder="کد درخواست"
              onChange={(e) => setFilters({ ...filters, code: e.target.value })}
              className="border rounded p-2 transition"
            />
          </label>

          <button
            onClick={() =>
              setFilters({
                status: "",
                date: "",
                code: "",
              })
            }
            className="px-4 py-2 bg-fire_brick text-eggshell rounded-lg hover:bg-red-600 transition"
          >
            حذف فیلترها
          </button>

        </div>
        {userRole === "vendors" ? (
          <>
            {requests.length > 0 ? (
              <div className="space-y-4">
                {requests.map((req) => (
                  <div key={req.id} className="p-4 border rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center right-farsi">
                    <div>
                      <p className="font-semibold">
                        محصول: {req.product_name} به تعداد: {req.count}
                      </p>
                      <p className="text-sm text-gray-600">مشتری: {req.customer_name}</p>
                      <p className="text-sm text-gray-600 font-semibold">کد: {enToFaNum(req.code)}</p>
                      <p className="text-sm text-azul font-bold">قیمت کل: {enToFaNum(req.price.toLocaleString())} تومان</p>
                      <p className="text-xs text-gray-500">{enToFaNum(req.jalali_date)}</p>
                      {req.status === "pending" && (
                        <p className="text-sm text- mt-2 font-semibold">در اسرع وقت تحویل داده شود!</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {req.status === "pending" ? (
                        <span className="flex items-center gap-2">
                          <span className="text-orange_web font-semibold">در انتظار تحویل</span>
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded text-eggshell bg-mantis">تحویل داده شده</span>
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
                  <div key={req.id} className="p-4 border rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center right-farsi">
                    <div>
                      <p className="font-semibold">
                        محصول: {req.product_name} به تعداد: {req.count}
                      </p>
                      <p className="text-sm text-gray-600">فروشنده: {req.shop_name}</p>
                      <p className="text-sm text-gray-600 font-semibold">کد: {enToFaNum(req.code)}</p>
                      <p className="text-sm text-azul font-bold">قیمت کل: {enToFaNum(req.price.toLocaleString())} تومان</p>
                      <p className="text-xs text-gray-500">{enToFaNum(req.jalali_date)}</p>
                      {req.status === "pending" && (
                        <p className="text-sm text-green-600 mt-2 font-semibold">در اسرع وقت تحویل گرفته شود!</p>
                      )}
                    </div>
                    {req.status === "pending" ? (
                      <span className="flex items-center gap-2">
                        <span className="text-orange_web font-semibold">در انتظار تحویل</span>
                        <button onClick={() => handleUpdateStatus(req.id, "accepted")} className="px-3 py-1 bg-yellow-500 text-eggshell rounded">تحویل گرفتی؟</button>
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded text-eggshell bg-mantis">تحویل گرفته شده</span>
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
      <RateModal isOpen={showRateModal} onClose={() => setShowRateModal(false)} onSubmit={handleRateSubmit} />
    </div>
  );
}
