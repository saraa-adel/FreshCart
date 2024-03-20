import React, { useEffect, useState } from 'react'
import style from './CategoriesDetails.module.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import logo from '../../Assets/images/freshcart-logo.svg';
import { BallTriangle } from 'react-loader-spinner'


export default function CategoriesDetails() {

  const [category, setCategory] = useState({})
  const [loading, setLoading] = useState(true)

  let {categoryId} = useParams()
  async function getCategoriesDetails(categoryId){
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`)
    setCategory(data.data)
    setLoading(false)
  }
  
  useEffect(()=>{
    getCategoriesDetails(categoryId)
  },[categoryId])
  return <>
     {loading ? <div className="row">
          <div className="loading flex-column pb-5">
            <BallTriangle
              width={70}
              radius={4}
              ariaLabel="ball-triangle-loading"
              wrapperClass="d-flex justify-content-center align-items-center mt-5 text-main"
              visible={true}
            />
            <div>
              <img src={logo} className="w-100" alt="logo" />
            </div>
          </div>
        </div>: <>
          <Helmet>
            <meta charSet="utf-8" />
            <title>{category.name}</title>
          </Helmet>
          <div className="shadow row g-3 bg-main-light p-5 my-5 rounded align-items-center">
            <div className='col-md-6 d-flex justify-content-center'>
            <div className='w-75 shadow '>
              <img src={category.image} className='w-100 rounded' alt={category.name} />
            </div>
            </div>
            <div className='col-md-4 d-flex justify-content-center'>
            <div>
              <h4 className='h2 fw-bold'>{category.name}</h4>
              <p className='text-main h5'>{category.slug}</p>
            </div>
            </div>
          </div>
        </>}
    </>
}
