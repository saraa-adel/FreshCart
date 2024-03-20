import React, { useContext, useEffect } from 'react'
import style from './ShippingAddress.module.css'
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';

export default function ShippingAddress() {

  let {checkOutSession} = useContext(CartContext)

  let {cartId} = useParams()

  useEffect(() => {
    document.title = "Shipping Address"
},[]);

  async function checkOut(values){
    let {data} =await checkOutSession(cartId ,values)
    console.log(data);
    if (data.status === 'success') {
      window.location.href= data.session.url
    }
  }

  let formik = useFormik({
    initialValues:{
      details:'',
      phone:'',
      city:''
    }, onSubmit: checkOut
  })

  return <>
       <div className="py-4">
       <h4 className='fw-bold mx-auto fs-1 text-center header position-relative d-flex justify-content-center align-items-end'>ShippingAddress</h4>
     <div className="w-75 mx-auto">
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="details">Details</label>
        <input onChange={formik.handleChange} id='details' name='details' className='form-control mb-3' type="text" />
        <label htmlFor="phone">Phone</label>
        <input onChange={formik.handleChange} id='phone' name='phone' className='form-control mb-3' type="tel" />
        <label htmlFor="city">City</label>
        <input onChange={formik.handleChange} id='city' name='city' className='form-control mb-3' type="text" />
        <button className='btn bg-main text-light' type='submit'>Checkout</button>
      </form>
     </div>
       </div>
  </>
}
