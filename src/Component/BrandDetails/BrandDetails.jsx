import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BallTriangle } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';

import logo from '../../Assets/images/freshcart-logo.svg';

export default function BrandDetails() {
  const [brand, setBrand] = useState({})
  const [loading, setLoading] = useState(true)

  let {brandId} = useParams()
  async function getBrandDetails(brandId){
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`)
    setBrand(data.data)
    setLoading(false)
  }
  
  useEffect(()=>{
    getBrandDetails(brandId)
  },[brandId])

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
            <title>{brand.name}</title>
          </Helmet>
          <div className="bg-main-light shadow rounded p-5 my-5">
            <h2 className='pb-3 fw-bold'>Brand Name: <span className='text-main'>{brand.name}</span></h2>
            <div className='w-100 d-flex justify-content-center align-items-center'>
              <img src={brand.image} className='w-50 rounded-5 shadow' alt={brand.name} />
            </div>
          </div>
        </>}
    </>;
}
