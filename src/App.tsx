import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Products from "./pages/product/Product";
import NotFound from "./pages/NotFound";
import ServerNotAvailable from "./pages/ServerNotAvailable";
import Dashboard from "./pages/dashboard/Dashboard";
import Settings from "./pages/dashboard/Settings";
import Request from "./pages/requests/Request";
import Vendors from "./pages/vendors/Vendors";
import VendorsProducts from "./pages/vendors/VendorsProducts";
import InstallApp from "./pages/InstallApp/InstallApp";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import ScrollToTop from "./components/common/ScrollToTop";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App(): JSX.Element {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/home" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
        <Route path="/signup" element={<MainLayout><Signup /></MainLayout>} />
        <Route path="/products" element={<MainLayout><Products /></MainLayout>} />
        <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
        <Route path="/dashboard/settings" element={<MainLayout><Settings /></MainLayout>} />
        <Route path="/dashboard/requests" element={<MainLayout><Request /></MainLayout>} />
        <Route path="/vendors" element={<MainLayout><Vendors /></MainLayout>} />
        <Route path="/vendors/:vendorsId" element={<MainLayout><VendorsProducts /></MainLayout>} />
        <Route path="/app" element={<MainLayout><InstallApp /></MainLayout>} />
        <Route path="/about-us" element={<MainLayout><About /></MainLayout>} />
        <Route path="/contact-us" element={<MainLayout><Contact /></MainLayout>} />
        <Route path="/404" element={<MainLayout><NotFound /></MainLayout>} />
        <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
        {/* <Route path="*" element={<MainLayout><ServerNotAvailable /></MainLayout>} /> */}
      </Routes>

      <div style={{ display: "none" }}>loop</div>

      <Analytics />
      <SpeedInsights />
      <ToastContainer position="top-right" autoClose={5000} className="right-farsi" />
    </>
  );
}

export default App;
