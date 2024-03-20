import React from 'react'
import style from './MainSlider.module.css'
import slide1 from '../../Assets/images/slider-image-3.jpeg'
import slide2 from '../../Assets/images/slider-image-2.jpeg'
import slide3 from '../../Assets/images/slider-image-1.jpeg'
import img1 from '../../Assets/images/slider-2.jpeg'
import img2 from '../../Assets/images/grocery-banner-2.jpeg'
import Slider from 'react-slick'
import FeaturedProducts from './../FeaturedProducts/FeaturedProducts';

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay:true,
    autoplaySpeed:2000,
    slidesToShow: 1,
    arrows: false
  };
  return <>
  <div className="row my-3 gx-0">
    <div className="col-md-9">
      <Slider {...settings}>
        <img src={slide1} height={300} className='w-100' alt="" />
        <img src={slide2} height={300} className='w-100' alt="" />
        <img src={slide3} height={300} className='w-100' alt="" />
      </Slider>
    </div>
    <div className='col-md-3'>
      <div className="images">
        <img src={img1} className='w-100' height={150} alt="" />
        <img src={img2} className='w-100' height={150} alt="" />
      </div>
    </div>
  </div>
  </>
}
