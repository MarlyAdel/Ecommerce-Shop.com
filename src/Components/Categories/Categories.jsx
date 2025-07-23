import React from "react";
import { Link } from "react-router-dom";

export default function Categories() {
  const categories = [
    "beauty",
    "fragrances",
    "furniture",
    "groceries",
    "home-decoration",
    "kitchen-accessories",
    "laptops",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "mobile-accessories",
    "motorcycle",
    "skin-care",
    "smartphones",
    "sports-accessories",
    "sunglasses",
    "tablets",
    "tops",
    "vehicle",
    "womens-bags",
    "womens-dresses",
    "womens-jewellery",
    "womens-shoes",
  ];

  return (
    <section className="categories">
      <div className="container h-full">
        <div className="categories-title pt-28">
          <h1 className="text-3xl font-lora font-semibold mb-8">Categories :</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-4 mb-11">
          {categories.map((cat, index) => (
            <div key={index} className="bg-teal-100 p-6 rounded-lg">
              <p className="font-lora text-black">{cat.replace("-", " ")}</p>
              <Link to={`/categories/${cat}`} className="text-blue-400">
                View products
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
