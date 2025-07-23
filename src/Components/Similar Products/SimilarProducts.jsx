import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useCart } from '../Context/CartContext';

export default function SimilarProducts({categoryId , currentProductId}) {

 const [similarProducts , setSimilarProducts] = useState([]);
 const {addToCart} = useCart()

  function getSimilarProducts(){
    axios
      .get("https://dummyjson.com/products?limit=200")
      .then(({ data }) => {
        let result = data.products.filter(
          (product) => product.category == categoryId && product.id != currentProductId
        );
        setSimilarProducts(result);
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (categoryId && currentProductId) {
      getSimilarProducts();
    }
  }, [categoryId, currentProductId]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 mt-4">
        {similarProducts.map((product) => (
          <div key={product.id} className="border-2 p-4 rounded shadow">
            <Link to={`/productdetails/${product.category}/${product.id}`}>
              <img
                src={
                  product.images?.[0] ||
                  "https://via.placeholder.com/300x200?text=No+Image"
                }
                alt={product.title}
                className="h-56 mx-auto mb-3 object-fill cursor-pointer transform transition duration-300 hover:scale-110"
              />
            </Link>
            <p className="text-sm text-gray-500">{product.category}</p>
            <Link to={`/productdetails/${product.category}/${product.id}`}>
              <h2 className="text-xl font-semibold mt-1 cursor-pointer">
                {product.title.split(" ").splice(0, 4).join(" ")}
              </h2>
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
                <i className="fa-solid fa-cart-plus bg-teal-900 p-3 dark:bg-gray-800 text-white rounded-md"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
