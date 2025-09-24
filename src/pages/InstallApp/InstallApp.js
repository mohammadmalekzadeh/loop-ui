import React, { useEffect, useState } from "react";
import { FaApple, FaCloudDownloadAlt, FaDownload } from "react-icons/fa";

export default function InstallApp () {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    if (/iPhone|iPad|iPod/.test(userAgent)) setIsIOS(true);

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log("نتیجه نصب:", outcome);
    setDeferredPrompt(null);
  };

  return (
    <div className="min-h-screen bg-isabelline flex items-center justify-center px-4 text-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
        <img
          src="/icon/favicon (crop).png"
          alt="App Icon"
          className="w-24 h-24 mx-auto mb-4 rounded-lg"
        />
        <img
          src="/icon/favicon.png"
          alt="App Icon"
          className="w-36 md:w-32 lg:w-48 mx-auto mb-6"
        />

        <h1 className="text-2xl font-bold mb-4 text-mantis right-farsi">
          اپلیکیشن آماده نصب است!
        </h1>

        <p className="text-green-700 mb-6 right-farsi">
          برای دسترسی سریع‌تر، می‌توانید اپ را به صفحه اصلی دستگاه خود اضافه کنید.
        </p>

        {/* دکمه یا راهنما */}
        {isIOS ? (
            <p className="text-sm text-gray-600 right-farsi">
              در <span className="inline-flex gap-1 font-semibold">iOS <FaApple /></span> روی <span className="font-semibold">Share</span> بزنید و سپس{" "}
              <span className="font-semibold">Add to Home Screen</span> را انتخاب کنید.
            </p>

        ) : deferredPrompt ? (
          <button
            onClick={handleInstall}
            className="bg-green-500 text-eggshell px-6 py-3 rounded-lg text-lg hover:bg-green-600 transition right-farsi inline-flex gap-2 items-center"
          >
            <FaDownload /> نصب اپلیکیشن
          </button>
        ) : (
          <p className="text-fire_brick right-farsi">
            این مرورگر از نصب پشتیبانی نمی‌کند <br /> یا اپلیکیشن قبلاً نصب شده است.
          </p>
        )}
      </div>
    </div>
  );
}
