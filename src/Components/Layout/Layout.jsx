import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../Footer/Footer'

export default function Layout() {

  const location = useLocation();
  const hideNavbar = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="min-h-screen bg-white dark:bg-gray-700 text-black dark:text-white transition-colors duration-300">
      {!hideNavbar && <Navbar />}
      <Outlet />
      <Footer />
    </div>
  );
}
