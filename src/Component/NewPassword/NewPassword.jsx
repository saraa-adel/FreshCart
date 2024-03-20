import React, { useContext, useEffect, useState } from 'react'
import style from './NewPassword.module.css'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import {UserContext} from '../Context/UserContext.js'
import toast from 'react-hot-toast'

export default function NewPassword() {

  useEffect(() => {
    document.title = "New password"
},[]);

let {setUserToken} = useContext(UserContext)
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  let navigate = useNavigate()

  async function resetPassword(values){
    setLoading(true)
   let {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,values)
   .catch((err)=>{
    setLoading(false);
    toast.error(err.response?.data?.message || 'An error occurred');
   })
    setLoading(false);
    toast.success('Password changed');
    navigate('/login');
  }

  let validationSchema = yup.object({
      email: yup.string().required('Email is required').email('invalid email'),
      newPassword: yup.string().required('Password is required').matches(/^[A-Z][\w @]{5,8}$/, 'invalid password'),
  })

  let formik = useFormik({
    initialValues:{
      email:'',
      newPassword:'',
    },validationSchema
    ,onSubmit:resetPassword
  })

  return <>
     <div className="w-75 mx-auto py-4">
     <h4 className='fw-bold mx-auto fs-1 text-center header position-relative d-flex justify-content-center align-items-end'>New Password</h4>
     <form onSubmit={formik.handleSubmit}>
      {apiError ?<div className="alert alert-danger">{apiError}</div>:''} 

      <label htmlFor="email">Email : </label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" name="email" id="email" className='form-control mb-3'/>
      {formik.errors.email && formik.touched.email?<div className="alert alert-danger py-2">{formik.errors.email}</div>: ''}
      
      <label htmlFor="newPassword">New Password : </label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" name="newPassword" id="newPassword" className='form-control mb-3'/>
      {formik.errors.newPassword && formik.touched.newPassword?<div className="alert alert-danger py-2">{formik.errors.newPassword}</div>: ''}
      
      <div className='d-flex justify-content-between align-items-center'>
      <div>
      {loading? <button type='button' className='btn bg-main text-light'>
      <i className='fas fa-spinner fa-spin'></i>
      </button>
      :<button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-light'>Confirm</button>
      }
      </div>
      </div>
    
     </form>
     </div>
  </>
}
