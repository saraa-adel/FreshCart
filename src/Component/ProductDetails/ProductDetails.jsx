import React, { useContext, useEffect, useState } from 'react'
import style from './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import logo from '../../Assets/images/freshcart-logo.svg'
import axios from 'axios'
import { BallTriangle } from 'react-loader-spinner'
import Slider from "react-slick";
import { Helmet } from 'react-helmet'
import toast from 'react-hot-toast'
import { CartContext } from '../Context/CartContext'

export default function ProductDetails(){

  let {addToCart , setNumOfCart } = useContext(CartContext)
async function postToCart(id){
  let{data} = await addToCart(id)
  if(data.status === 'success'){
    setNumOfCart(data.numOfCartItems);
    toast.success(data.message,{duration :1000})
  }
}

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay:true,
    autoplaySpeed:2000,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const [details, setDetails] = useState({})
  const [loading, setLoading] = useState(true)

  let {id} = useParams()
  async function getDetails(id){
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    setDetails(data.data)
    setLoading(false)
  }
  
  useEffect(()=>{
    getDetails(id)
  },[id])

  return <>
      {loading? <div className="row">
        <div className="loading flex-column pb-5">
      <BallTriangle
          width={70}
          radius={4}
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{}}
          wrapperClass="d-flex justify-content-center align-items-center mt-5 text-main"
          visible={true}
      />
      <div>
        <img src={logo} className='w-100' alt="" />
      </div>
      </div>
     </div>: 
     <>
       <Helmet>
    <meta charSet='utf-8' />
    <title>{details.title}</title>
  </Helmet>
  <div className="row align-items-center py-3">
      <div className="col-md-4">
        <Slider className='mb-5' {...settings}>
          {details.images.map((image ,index)=><img src={image} key={index} className='w-100' alt={details.title} />)}
        </Slider>
        </div>
        <div className="col-md-8">
        <div className='details'>
          <h3 className='h5'>{details.title}</h3>
          <p className='py-3'>{details.description}</p>
          <span className='font-sm text-main'>{details.category.name}</span>
          <div className="d-flex py-3 justify-content-between align-items-center">
            <span className='font-sm'>{details.price} EGP</span>
            <span>
              <i className='fas fa-star rating-color me-1'></i>
              {details.ratingsAverage}
            </span>
          </div>
          <button onClick={()=>postToCart(details.id)} className='btn bg-main w-100 text-light btn-small'>Add To Cart</button>
        </div>
        </div>
     </div>
     </>
     }
</>
}
