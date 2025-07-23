import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../Context/CartContext';

export default function TrendingProducts() {

  const [trending , setTrending] = useState([])
  const [loading , setLoading] = useState([]);
    
  const {addToCart} = useCart()

  async function getTrendingProducts (){
    setLoading(true)
    try {
        const dummy = await axios.get("https://dummyjson.com/products/category/beauty");
       
        setTrending(dummy.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      finally {
        setLoading(false); 
      }
    }

  useEffect(() => {
    getTrendingProducts();
  },[])

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <span className="animate-spin w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
          {trending.map((product, index) => (
            <div
              key={`${product.id}-${index}`}
              className="border-2 p-4 rounded shadow"
            >
              <Link to={`/productdetails/${product.category}/${product.id}`}>
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="h-56 mx-auto mb-3 object-fill cursor-pointer transform transition duration-300 hover:scale-110"
                />
              </Link>
              <p className="text-sm text-gray-500">{product.category}</p>
              <Link to={`/productdetails/${product.category}/${product.id}`} className="text-xl font-semibold mt-1 cursor-pointer">
                {product.title.split(" ").splice(0, 4).join(" ")}
              </Link>
              <div className="rating">
                <span>{product.rating?.rate || product.rating} ⭐⭐⭐⭐</span>
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
                  <i className="fa-solid fa-cart-plus bg-teal-900 p-3 text-white rounded-md dark:bg-gray-800 "></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
