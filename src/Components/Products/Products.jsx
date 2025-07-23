import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useCart } from '../Context/CartContext';

export default function Products() {

 const [products , setProduct] = useState([]);
 const [loading, setLoading] = useState(true);

 const {addToCart} = useCart()

 async function getProducts() {
  try {
    setLoading(true);
    let { data } = await axios.get("https://dummyjson.com/products?limit=200");
  setProduct(data.products)
 
  } catch (error) {
    console.log("Products Error" , error)
  }
  finally {
    setLoading(false); 
  }
 }

 useEffect(() => {
  getProducts();
 },[])

  return (
    <>
      <section className="products">
        <div className="container h-full">
          <div className="title-product pt-28">
            <h1 className="text-3xl font-lora font-semibold">🛍️ Products :</h1>
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-screen">
              <span className="loader animate-spin w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full"></span>
            </div>
          ) : (
            <div className="products-content">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
                {products.map((product) => (
                  <div key={product.id} className="border-2 p-4 rounded shadow">
                    <Link
                      to={`/productdetails/${product.category}/${product.id}`}
                    >
                      <img
                        src={
                          product.images && product.images[0]
                            ? product.images[0]
                            : "https://via.placeholder.com/300x200?text=No+Image"
                        }
                        alt={product.title}
                        className="h-56 mx-auto mb-3 object-fill cursor-pointer transform transition duration-300 hover:scale-110"
                      />
                    </Link>
                    <p className="text-sm text-gray-500">{product.category}</p>
                    <Link
                      to={`/productdetails/${product.category}/${product.id}`}
                      className="text-xl font-semibold mt-1 cursor-pointer"
                    >
                      {product.title.split(" ").splice(0, 4).join(" ")}
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

                    <div className="flex justify-end">
                      <button onClick={() => addToCart(product)}>
                        <i class="fa-solid fa-cart-plus bg-teal-900 p-3 text-white rounded-md dark:bg-gray-800"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
