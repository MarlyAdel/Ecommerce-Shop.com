import React from "react";
import Slider from "react-slick";
import img1 from "../../assets/images/slide1.webp";
import img2 from "../../assets/images/slide2.jpg";
import img3 from "../../assets/images/slide3.webp";
import img4 from "../../assets/images/slide4.jpg";
import img5 from "../../assets/images/slide5.jpg";
import img6 from "../../assets/images/slide6.jpg";
import img7 from "../../assets/images/slide7.webp";
import img8 from "../../assets/images/slide8.webp";
import img9 from "../../assets/images/slide9.jpg";
import img10 from "../../assets/images/slide10.webp";
import img11 from "../../assets/images/slide11.jpg";
import img12 from "../../assets/images/slide12.png";
import img13 from "../../assets/images/slide13.webp";
import img14 from "../../assets/images/slide14.webp";
import img15 from "../../assets/images/slide15.jpg";
import img16 from "../../assets/images/slide16.webp";
import img17 from "../../assets/images/slide17.webp";




export default function ImageSlider() {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 800,
    slidesToShow: 5, 
    slidesToScroll: 5,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const images = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img11,
    img12,
    img13,
    img14,
    img15,
    img16,
    img17,
  ];

  return (
    <div className="container mx-auto my-10 ">
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index} className="px-2">
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
