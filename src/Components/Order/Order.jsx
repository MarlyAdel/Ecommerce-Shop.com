// src/pages/OrderConfirmation.jsx
import React from "react";

export default function Order() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-20 h-screen">
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-900 shadow-xl rounded-lg p-10 mt-28 text-center">
        <h2 className="text-4xl font-lora font-bold mb-4 text-teal-700">
          🎉 Thank you for shipping!
        </h2>
        <p className="text-xl text-gray-700 dark:text-gray-200">
          Your order is out for delivery 🚚
        </p>
      </div>
    </section>
  );
}
