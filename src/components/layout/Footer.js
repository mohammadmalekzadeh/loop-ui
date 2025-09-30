import { FaInstagram, FaTelegramPlane, FaGithub, FaInfoCircle, FaPhoneAlt, FaEnvelope, FaTrademark } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 py-6 px-8 flex flex-col md:flex-row justify-between items-center
                      font-myfont right-farsi bg-jet gap-4 w-full">
      
      {/* Left Section */}
      <div className="text-center md:text-left mb-4 md:mb-0 right-farsi items-center justify-center text-eggshell">
        <p className="font-bold text-lg items-center justify-center justify-between flex">لووپ <FaTrademark />  ۲۰۲۵</p>
        <div className="flex items-center gap-4 justify-center md:justify-start mt-2">
          <Link to="/contact-us" className="hover:text-mantis flex items-center gap-2 right-farsi">
            <FaPhoneAlt /> تماس با ما
          </Link>
          <Link to="/about-us" className="hover:text-mantis flex items-center gap-2 right-farsi">
            <FaInfoCircle /> درباره ما
          </Link>
        </div>
      </div>

      {/* Middle Section */}
      <div className="text-center mb-4 md:mb-0 text-eggshell">
        {/* <p className="text-sm">Powered by <span className="font-semibold">Malek</span></p> */}
        <p className="text-sm">توسعه داده شده توسط <a href="https://instagram.com/er._.math" className="font-semibold text-loop hover:text-mantis">مَلِک</a></p>
        <p className="text-sm">تمامی حقوق محفوظ است</p>
      </div>

      {/* Right Section */}
      <div className="flex space-x-6 left-num text-eggshell">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 hover:text-pink-500 transition"
        >
          <FaInstagram className="text-lg" />
          <span className="hidden sm:inline">Instagram</span>
          {/* <span> اینستاگرام </span> */}
        </a>
        <a
          href="https://t.me"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 hover:text-blue-400 transition"
        >
          <FaTelegramPlane className="text-lg" />
          <span className="hidden sm:inline">Telegram</span>
          {/* <span> تلگرام </span> */}
        </a>
        <a
          href="mailto:lloopforlife@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 hover:text-red-500 transition"
        >
          <FaEnvelope className="text-lg" />
          <span className="hidden sm:inline">Email</span>
          {/* <span> ایمیل </span> */}
        </a>
        <a referrerpolicy='origin' target='_blank' href='https://trustseal.enamad.ir/?id=653285&Code=RaAwR5KPF65j3auqo1ipoHjAb4FAEujk' className="w-8 sm:w-16">
          <img referrerpolicy='origin' src='https://trustseal.enamad.ir/logo.aspx?id=653285&Code=RaAwR5KPF65j3auqo1ipoHjAb4FAEujk' alt='' style={{'cursor':'pointer'}} className="w-8 sm:w-16" code='RaAwR5KPF65j3auqo1ipoHjAb4FAEujk' />
        </a>
      </div>
    </footer>
  );
}
