import { FaInstagram, FaTelegramPlane, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 py-6 px-8 flex flex-col md:flex-row justify-between items-center
                      font-myfont right-farsi">
      
      {/* Left Section */}
      <div className="text-center md:text-left mb-4 md:mb-0 right-farsi">
        {/* <p className="font-bold text-lg">LOOP © 2025</p> */}
        <p className="font-bold text-lg">لووپ © ۲۰۲۵</p>
      </div>

      {/* Middle Section */}
      <div className="text-center mb-4 md:mb-0">
        {/* <p className="text-sm">Powered by <span className="font-semibold">Malek</span></p> */}
        <p className="text-sm">توسعه داده شده توسط <a href="https://instagram.com/er._.math" className="font-semibold text-green-500 hover:text-blue-500">مَلِک</a></p>
        <p className="text-sm">تمامی حقوق محفوظ است</p>
      </div>

      {/* Right Section */}
      <div className="flex space-x-6 left-num">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 hover:text-pink-500 transition"
        >
          <FaInstagram className="text-lg" />
          <span>Instagram</span>
          {/* <span> اینستاگرام </span> */}
        </a>
        <a
          href="https://t.me"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 hover:text-blue-400 transition"
        >
          <FaTelegramPlane className="text-lg" />
          <span>Telegram</span>
          {/* <span> تلگرام </span> */}
        </a>
      </div>
    </footer>
  );
}
