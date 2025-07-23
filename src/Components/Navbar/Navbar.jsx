import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode , setDarkMode] = useState(false);
   let navigate = useNavigate();

   const { cartItems, clearCart } = useCart();

   const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
     
    const root = window.document.documentElement;
    if(darkMode){
      root.classList.add("dark")
    }
    else{
      root.classList.remove("dark")
    }
  },[darkMode])


  const logOut = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
 }

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-2xl py-1 z-50 fixed top-0 w-full text-black dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink
              to="/"
              className="font-bold text-5xl text-teal-800 font-sevillana dark:text-gray-200"
            >
              Shop.com
            </NavLink>
          </div>

          {/* Center links (hidden on mobile) */}
          <div className="hidden sm:flex flex-1 justify-center space-x-7">
            <NavLink to="/products" className="text-2xl font-medium">
              Products
            </NavLink>
            <NavLink to="/categories" className="text-2xl font-medium">
              Categories
            </NavLink>
          </div>

          {/* Right side links (hidden on mobile) */}
          <div className="hidden sm:flex items-center space-x-6">
            <span
              onClick={logOut}
              className="text-2xl font-medium cursor-pointer hover:text-red-500"
            >
              <i className="fa-regular fa-user"></i> Signout
            </span>
            <div className="relative">
              <NavLink to="/cart" className="text-2xl font-medium">
                <i className="fa-solid fa-cart-shopping text-teal-600 dark:text-gray-300"></i>
              </NavLink>

              {totalQty > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalQty}
                </span>
              )}
            </div>
            {/* DarkMode */}
            <button onClick={() => setDarkMode(!darkMode)} className="text-2xl">
              {darkMode ? (
                <i className="fa-regular fa-sun text-gray-700 text-3xl dark:text-white"></i>
              ) : (
                <i className="fa-regular fa-moon text-gray-700 text-3xl"></i>
              )}
            </button>
          </div>

          {/* menu (mobile only) */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              type="button"
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white rounded-md"
            >
              {menuOpen ? (
                // X icon
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                // icon
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden px-4 pb-4 space-y-2">
          <NavLink to="/products" className="block text-xl py-2">
            Products
          </NavLink>
          <NavLink to="/categories" className="block text-xl py-2">
            Categories
          </NavLink>
          <span
            onClick={logOut}
            className="block text-xl py-2 cursor-pointer hover:text-red-500"
          >
            <i class="fa-regular fa-user"></i> signout
          </span>
          <div className="relative">
            <NavLink to="/cart" className="text-2xl font-medium">
              <i className="fa-solid fa-cart-shopping text-teal-600"></i>
            </NavLink>

            {totalQty > 0 && (
              <span className="absolute -top-2 left-4 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalQty}
              </span>
            )}
          </div>
          <button onClick={() => setDarkMode(!darkMode)} className="text-2xl">
            {darkMode ? (
              <i className="fa-regular fa-sun text-gray-700 text-3xl dark:text-white"></i>
            ) : (
              <i className="fa-regular fa-moon text-gray-700 text-3xl"></i>
            )}
          </button>
        </div>
      )}
    </nav>
  );
}
