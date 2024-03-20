import React from 'react'
// import style from './CategoriesSlider.module.css'
import axios from 'axios'
import { useQuery } from 'react-query'
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

export default function CategoriesSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay:true,
    autoplaySpeed:2000,
    slidesToShow: 6,
    arrows: false
  };

  function getCategories(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }

  let {data} = useQuery('Categories', getCategories)
  // console.log(data?.data.data)

  return <>
  <div className="pt-3">
  <h4 className='fw-bold pb-3'>Shop popular categories</h4>
  </div>
  <div className="row pb-2">
      <Slider {...settings}>
        {data?.data.data.map(category => <div key={category._id} className='col-md-2'>
        <Link to={`/categoriesDetails/${category._id}`}>
          <div className="img cursor-pointer">
            <img src={category.image} height={200} className='w-100' alt={category.name} />
            <p>{category.name}</p>
          </div>
          </Link>
        </div>)}
      </Slider>
  </div>
  </>
}