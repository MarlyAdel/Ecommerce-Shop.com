import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import SimilarProducts from '../Similar Products/SimilarProducts';
import { useCart } from '../Context/CartContext';

export default function ProductDetails() {

   const [details , setDetails] = useState(null);
   const {id , categoryId} = useParams();
   const [selectedImage, setSelectedImage] = useState(null);
   const {addToCart} = useCart()

   //console.log(id)

   function getProductDetails(){
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then(({ data }) => {
        //console.log(data);
        setDetails(data);
      })
      .catch((err) => {
        console.log(err);
      });
   }

   useEffect(() => {
    if (id) {
      getProductDetails();
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
   },[id]);

   useEffect(() => {
     if (details?.images?.length > 0) {
       setSelectedImage(details.images[0]); // default image
     }
   }, [details]);

   return (
     <>
       <section className="product-details container h-[100%]">
         <div className="p-4 pb-16">
           {details ? (
             <div className="grid grid-cols-1 gap-0 md:grid-cols-3 md:gap-4">
               <div>
                 {/* Main Image */}
                 <img
                   src={selectedImage || details.images?.[0]}
                   alt={details.title}
                   className="w-96 mt-28 rounded-lg shadow-md transition duration-300"
                 />

                 {/* Thumbnail Images */}
                 <div className="flex gap-2 mt-4">
                   {details.images?.map((img, index) => (
                     <img
                       key={index}
                       src={img}
                       alt={`Thumbnail ${index}`}
                       className={`w-12 h-12 object-cover border-2 rounded cursor-pointer ${
                         selectedImage === img
                           ? "border-teal-600"
                           : "border-gray-300"
                       }`}
                       onClick={() => setSelectedImage(img)}
                     />
                   ))}
                 </div>
               </div>

               <div className="mt-36">
                 <h2 className="text-2xl font-bold mb-2">{details.title}</h2>
                 <p className="text-yellow-500 font-medium mb-1">
                   {details.rating} ⭐⭐⭐
                 </p>
                 <p className="text-2xl text-teal-600 font-bold mb-2">
                   $
                   {(
                     details.price -
                     (details.price * details.discountPercentage) / 100
                   ).toFixed(2)}
                 </p>

                 {details.discountPercentage && (
                   <div className="text-red-500 mb-2 space-y-1 font-medium">
                     <p>
                       <del className="text-gray-500">${details.price}</del>
                       <span className="ml-2">
                         -{details.discountPercentage}%
                       </span>
                     </p>
                   </div>
                 )}

                 <div className="flex flex-col mb-2">
                   <p className="font-bold">
                     Brand :{" "}
                     <span className="font-normal"> {details.brand}</span>
                   </p>
                   <p className="font-bold">
                     Category :
                     <span className="font-normal"> {details.category}</span>
                   </p>
                   <p className="font-bold">
                     Stock :{" "}
                     <span className="font-normal"> {details.stock}</span>
                   </p>
                 </div>
                 <p className="text-lg font-medium">About the product</p>
                 <p className="mb-4">{details.description}</p>
                 <button onClick={() => addToCart(details)}>
                   <i className="fa-solid fa-cart-plus bg-teal-900 p-3 dark:bg-gray-800 text-white rounded-md"></i>
                 </button>
               </div>

               {/* ✅ Reviews Section */}
               <div className="reviews mt-36">
                 <h2 className="font-bold text-2xl font-lora mb-4">Reviews</h2>
                 {details.reviews && details.reviews.length > 0 ? (
                   <div className="space-y-4">
                     {details.reviews.map((review, index) => (
                       <div
                         key={index}
                         className="border p-4 rounded shadow-sm bg-gray-50 dark:bg-gray-600"
                       >
                         <div className="flex items-center justify-between mb-1">
                           <p className="font-semibold">
                             {review.reviewerName}
                           </p>
                           <p className="text-yellow-500">
                             {Array(review.rating)
                               .fill()
                               .map((_, i) => (
                                 <span key={i}>⭐</span>
                               ))}
                           </p>
                         </div>
                         <p className="text-sm text-gray-600 mb-1 dark:text-white">
                           {review.comment}
                         </p>
                         <p className="text-xs text-gray-400">{review.date}</p>
                       </div>
                     ))}
                   </div>
                 ) : (
                   <p className="text-gray-500">No reviews yet.</p>
                 )}
               </div>
             </div>
           ) : (
             <p className="flex items-center justify-center h-[100%] mt-60 text-4xl text-teal-600 font-semibold ">
               Loading...
             </p>
           )}
         </div>
       </section>

       {/* Similar Products */}

       <section className="similar-products container py-10">
         <h2 className="text-4xl font-lora font-semibold">Similar Products</h2>
         <SimilarProducts
           categoryId={details?.category}
           currentProductId={details?.id}
         />
       </section>
     </>
   );
}  