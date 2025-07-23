import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useCart } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const [formData, setFormData] = useState({
    country: "",
    city: "",
    address: "",
    phone: "",
  });

  const { clearCart, cartItems } = useCart();
  const navigate = useNavigate();
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      toast.error("Your cart is empty 🛒", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      return;
    }


    toast.success("Order confirmed! ✌️", {
      position: "top-right",
      autoClose: 3000,
      style: {
        background: "#10b981",
        color: "white",
      },
    });

     setTimeout(() => {
       navigate("/order");
     }, 2000); 

    clearCart(); 
    setFormData({ country: "", city: "", address: "", phone: ""});

   
    
  };

  useEffect(() => {
    if (cartItems.length === 0) {
      setFormData({
        country: "",
        city: "",
        address: "",
        phone: "",
      });
    }
  }, [cartItems]);

  return (
    <section className="checkout py-20 px-4 sm:px-6 lg:px-20 ">
      <div className="max-w-xl mx-auto bg-green-100 dark:bg-gray-900 shadow-md rounded-lg p-8 mt-6">
        <h2 className="text-3xl font-bold mb-6 text-center font-lora">Checkout 🧾</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 bg-white px-4 py-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded mb-4"
            />
          </div>


          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 transition"
          >
            Place Order
          </button>
        </form>
      </div>
    </section>
  );
}
