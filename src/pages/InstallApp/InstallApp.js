import React, { useEffect, useState } from "react";

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
        {/* آیکون */}
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

        {/* عنوان */}
        <h1 className="text-2xl font-bold mb-4 text-mantis right-farsi">
          اپلیکیشن آماده نصب است!
        </h1>

        <p className="text-green-700 mb-6 right-farsi">
          برای دسترسی سریع‌تر، می‌توانید اپ را به صفحه اصلی دستگاه خود اضافه کنید.
        </p>

        {/* دکمه یا راهنما */}
        {isIOS ? (
          <p className="text-sm text-gray-600">
            در iOS روی <span className="font-semibold">Share</span> بزنید و سپس{" "}
            <span className="font-semibold">Add to Home Screen</span> را انتخاب کنید.
          </p>
        ) : deferredPrompt ? (
          <button
            onClick={handleInstall}
            className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-600 transition right-farsi"
          >
            نصب اپلیکیشن
          </button>
        ) : (
          <p className="text-gray-500 right-farsi">
            این مرورگر از نصب پشتیبانی نمی‌کند یا اپلیکیشن قبلاً نصب شده است.
          </p>
        )}
      </div>
    </div>
  );
}
