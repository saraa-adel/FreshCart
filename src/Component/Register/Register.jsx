import React, { useEffect, useState } from 'react'
import style from './Register.module.css'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

export default function Register() {

  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')
  let navigate = useNavigate()


  async function registerSubmit(values){
    setLoading(true)
   let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values)
   .catch((err)=>{
    setApiError(err.response.data.message)
    setLoading(false)
   })
   if (data.message === 'success'){
    setLoading(false)
    navigate('/login')
   }
  }

  let validationSchema = yup.object({
      name: yup.string().required('Name is required').min(3,'Minimum length is 3').max(10,'Maximum length is 10'),
      email: yup.string().required('Email is required').email('invalid email'),
      password: yup.string().required('Password is required').matches(/^[A-Z][\w @]{5,8}$/, 'invalid password'),
      rePassword: yup.string().required('RePassword is required').oneOf([yup.ref('password')],'password and repassword do not match'),
      phone: yup.string().required('Phone is required').matches(/^01[0125][0-9]{8}$/,'we need egyptian number')
  })

  let formik = useFormik({
    initialValues:{
      name:'',
      email:'',
      password:'',
      rePassword:'',
      phone:''
    },validationSchema
    ,onSubmit:registerSubmit
  })

  return <>
     <div className="w-75 mx-auto py-4">
     <h4 className='fw-bold mx-auto fs-1 text-center header position-relative d-flex justify-content-center align-items-end'>Register Now</h4>
     <form onSubmit={formik.handleSubmit}>
      {apiError ?<div className="alert alert-danger">{apiError}</div>:''} 
      
      <label htmlFor="name">Name : </label> 
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" name="name" id="name" className='form-control mb-3'/>
      {formik.errors.name && formik.touched.name?<div className="alert alert-danger py-2">{formik.errors.name}</div>: ''}

      <label htmlFor="email">Email : </label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" name="email" id="email" className='form-control mb-3'/>
      {formik.errors.email && formik.touched.email?<div className="alert alert-danger py-2">{formik.errors.email}</div>: ''}
      
      <label htmlFor="password">Password : </label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" name="password" id="password" className='form-control mb-3'/>
      {formik.errors.password && formik.touched.password?<div className="alert alert-danger py-2">{formik.errors.password}</div>: ''}

      <label htmlFor="repassword">RePassword : </label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" name="rePassword" id="repassword" className='form-control mb-3'/>
      {formik.errors.rePassword && formik.touched.rePassword?<div className="alert alert-danger py-2">{formik.errors.rePassword}</div>: ''}

      <label htmlFor="phone">Phone : </label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="tel" name="phone" id="phone" className='form-control mb-3'/>
      {formik.errors.phone && formik.touched.phone?<div className="alert alert-danger py-2">{formik.errors.phone}</div>: ''}

      {loading? <button type='button' className='btn bg-main text-light'>
      <i className='fas fa-spinner fa-spin'></i>
      </button>
      :<button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-light'>Register</button>
      }
      <Link className='ms-2 h6' to={'/login'}>Login now</Link>

     </form>
     </div>
  </>
}
