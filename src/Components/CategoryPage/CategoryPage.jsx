import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCart } from '../Context/CartContext';

export default function CategoryPage() {

  const { name, productId } = useParams();
  const [products , setProducts] = useState([])
  const {addToCart} = useCart()
 

  async function fetchProducts() {
    try {
      const res = await axios.get(`https://dummyjson.com/products?limit=200`);
      const allProducts = res.data.products;

      const filtered = allProducts.filter(
        (product) =>
          product.category.toLowerCase() === name.toLowerCase() &&
          product.id !== Number(productId)
      );

      setProducts(filtered);
    } catch (error) {
      console.log("Error fetching product", error);
    }
  }

  

  useEffect(() => {
    fetchProducts();
  },[name])

  return (
    <section className="categories">
      <div className="container h-[100%]">
        <div className="categories-title pt-28">
          <h1 className=" flex text-xl sm:text-2xl md:text-3xl lg:text-4xl font-lora font-semibold mb-4 sm:mb-6 md:mb-8">
            Category :
            <h1 className="text-teal-700 ms-5 dark:text-gray-300"> {name} </h1>
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
          {products.map((product) => (
            <div key={product.id} className="border p-6 rounded-lg">
              <Link to={`/productdetails/${product.category}/${product.id}`}>
                <img
                  src={product.images[0]}
                  alt=""
                  className="h-56 mx-auto mb-3 object-fill cursor-pointer transform transition duration-300 hover:scale-110"
                />
              </Link>
              <p className="text-sm text-gray-500">{product.category}</p>
              <Link
                to={`/productdetails/${product.category}/${product.id}`}
                className="text-xl font-semibold mt-1 cursor-pointer"
              >
                {product.title.split(" ").slice(0, 3).join(" ")}
              </Link>
              <div className="rating">
                <span>{product.rating} ⭐⭐⭐⭐</span>
              </div>
              <p className="text-xl font-medium text-teal-600">
                {product.price} $
              </p>
              {product.discountPercentage && (
                <div className="discount flex gap-2">
                  <p>
                    <del>${product.price}</del>
                  </p>
                  <span className="text-red-600 font-semibold">
                    -{product.discountPercentage}%
                  </span>
                </div>
              )}
              <p>Stock: {product.stock}</p>
              <div className="flex justify-end">
                <button onClick={() => addToCart(product)}>
                  <i className="fa-solid fa-cart-plus bg-teal-900 p-2 text-white rounded-md dark:bg-gray-800"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
