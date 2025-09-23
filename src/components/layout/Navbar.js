import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaHome, FaSignInAlt, FaBoxOpen, FaTachometerAlt, FaClipboardList, FaPhoneAlt, FaInfoCircle, FaSignOutAlt, FaStore } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <nav className="fixed top-0 w-full bg-gray-900 bg-opacity-80 text-white px-6 py-4 shadow-lg z-50 font-myfont">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          {/* Desktop Link*/}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/signup" className="hover:text-blue-400 flex items-center gap-2 right-farsi"><FaSignInAlt /> ثبت نام</Link>
            <Link to="/dashboard/requests" className="hover:text-blue-400 flex items-center gap-2 right-farsi"><FaClipboardList /> درخواست ها</Link>
            <Link to="/dashboard" className="hover:text-blue-400 flex items-center gap-2 right-farsi"><FaTachometerAlt /> داشبورد</Link>
            <Link to="/vendors" className="hover:text-blue-400 flex items-center gap-2 right-farsi"><FaStore /> فروشندگان</Link>
            <Link to="/products" className="hover:text-blue-400 flex items-center gap-2 right-farsi"><FaBoxOpen /> محصولات</Link>
            <Link to="/" className="hover:text-blue-400 flex items-center gap-2 right-farsi"><FaHome /> خانه</Link>
          </div>
          {/* Logo */}
          <Link to={"/"} className="flex items-center space-x-3">
            <img
              src="/icon/favicon.png"
              alt="LOOP Logo"
              className="w-16"
            />
          </Link>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu}>
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 flex flex-col space-y-3 bg-black bg-opacity-90 p-4 rounded-md right-farsi">
            <Link to="/" onClick={toggleMenu} className="hover:text-blue-400 flex items-center gap-2"><FaHome /> خانه</Link>
            <Link to="/signup" onClick={toggleMenu} className="hover:text-blue-400 flex items-center gap-2"><FaSignInAlt /> ثبت نام</Link>
            <Link to="/products" onClick={toggleMenu} className="hover:text-blue-400 flex items-center gap-2"><FaBoxOpen /> محصولات</Link>
            <Link to="/vendors" onClick={toggleMenu} className="hover:text-blue-400 flex items-center gap-2"><FaStore /> فروشندگان</Link>
            <Link to="/dashboard" onClick={toggleMenu} className="hover:text-blue-400 flex items-center gap-2"><FaTachometerAlt /> داشبورد</Link>
            <Link to="/dashboard/requests" onClick={toggleMenu} className="hover:text-blue-400 flex items-center gap-2"><FaClipboardList /> درخواست ها</Link>
          </div>
        )}
      </nav>
      <div className="mb-10"></div>
    </>
  );
}
