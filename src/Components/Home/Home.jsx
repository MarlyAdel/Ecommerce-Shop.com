import React, { useEffect, useState } from 'react'
import './Home.css'
import homeImg from '../../assets/images/hero.png'
import TrendingProducts from '../Trending Products/TrendingProducts';
import offerImg from '../../assets/images/offer.png'
import NewArrivals from '../New Arrivals/NewArrivals';
import { Link } from 'react-router-dom';
import ImageSlider from '../Shared/Slider';



export default function Home() {

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <section id="home">
        <div className="relative container bg-teal-300 h-[80vh]  flex justify-center items-center my-[72px] md:my-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-11 items-center">
            <div className="p-4 z-30">
              <p className="font-medium text-lg mt-20">Starting At $990</p>
              <h2 className="text-5xl font-bold my-2 font-lora">
                The best notebook <br /> collection 2025
              </h2>
              <h3 className="text-2xl font-semibold my-5">
                Exclusive offer <span className="text-red-700">-10%</span> off
                this week
              </h3>
              <Link to={"/products"} className="bg-white text-black dark:bg-gray-800 dark:text-white py-2 px-5 rounded-md font-medium transition-colors duration-300">
                Shop Now
              </Link>
            </div>

            <div className="flex justify-center items-center">
              <img src={homeImg} alt="laptop" />
            </div>
          </div>
        </div>
        
      </section>

      {/* Support */}
      <section className="support">
        <div className="container mt-28 md:mt-0 pb-8">
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-blue-200 p-6 flex rounded-md">
              <div className="flex items-center pe-4">
                <i className="fa-solid fa-truck-fast text-3xl"></i>
              </div>

              <div>
                <h1 className="font-semibold text-xl">Free Delivery</h1>
                <p className="text-slate-700">Orders from all items</p>
              </div>
            </div>
            <div className="bg-green-200 p-6 flex rounded-md">
              <div className="flex items-center pe-4">
                <i className="fa-solid fa-dollar-sign text-3xl"></i>
              </div>

              <div>
                <h1 className="font-semibold text-xl">Return & Refund</h1>
                <p className="text-slate-700">Money back guarantee</p>
              </div>
            </div>
            <div className="bg-blue-200 p-6 flex rounded-md">
              <div className="flex items-center pe-4">
                <i className="fa-solid fa-percent text-3xl"></i>
              </div>

              <div>
                <h1 className="font-semibold text-xl">Member Discount</h1>
                <p className="text-slate-700">On order over $99</p>
              </div>
            </div>
            <div className="bg-green-200 p-6 flex rounded-md">
              <div className="flex items-center pe-4">
                <i className="fa-solid fa-headset text-3xl"></i>
              </div>
              <div>
                <h1 className="font-semibold text-xl">Support 24/7</h1>
                <p className="text-slate-700">Contact us 24 hours a day</p>
              </div>
            </div>
          </div>
        </div>
      </section>

       {/* Slider */}

       <section className='slider mt-6'>
        <div>
          <ImageSlider/>
        </div>
       </section>

      {/* Trending Products */}
      <section className="trending my-16">
        <div className="container">
          <div className="trending-title mb-8">
            <h2 className="text-4xl font-lora font-semibold">
              Trending Products
            </h2>
          </div>
          <div className="trending-content">
            <TrendingProducts />
          </div>
        </div>
      </section>
      <section className="offer">
        <div className="relative h-[65vh] mb-11 mx-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <img src={offerImg} alt="" />
            </div>
            <div className="bg-yellow-400 flex flex-col justify-center items-center text-center py-8 sm:py-12 md:py-20 px-4">
              <h1 className="text-xl sm:text-3xl md:text-5xl font-sevillana font-bold mb-2">
                Don't miss the offer
              </h1>
              <h2 className="text-xl sm:text-3xl md:text-5xl font-sevillana font-bold mb-2">
                Grab it now
              </h2>
              <Link
                to={"/products"}
                className="mt-11 bg-white text-black dark:bg-gray-800 dark:text-white py-2 px-5 rounded-md font-medium transition-colors duration-300"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* New Arrivals */}
      <section className="new-arrivals my-16">
        <div className="container">
          <div className="arrivals-title mb-8">
            <h2 className="text-4xl font-lora font-semibold">New Arrivals</h2>
          </div>
          <div>
            <NewArrivals />
          </div>
        </div>
      </section>
      {/* Go-Up Arrow */}
      {showButton && (
        <a className="go-up" href="#">
          <i className="fa-solid fa-arrow-up text-white"></i>
        </a>
      )}
    </>
  );
}
