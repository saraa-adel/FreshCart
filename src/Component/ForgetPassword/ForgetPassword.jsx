import React, { useContext, useEffect, useState } from 'react'
import style from './ForgetPassword.module.css'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import {UserContext} from '../Context/UserContext.js'
import toast from 'react-hot-toast'

export default function ForgetPassword() {

  useEffect(() => {
    document.title = "ForgetPassword"
},[]);

let {setUserToken} = useContext(UserContext)
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  let navigate = useNavigate()

  async function sendCode(values){
    setLoading(true)
   let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,values)
   .catch((err)=>{
    setApiError(err.response.data.message)
    setLoading(false)
   })
   console.log('hello')
   setLoading(false)
   localStorage.setItem('userToken', data.token)
   setUserToken(data.token)
   toast.success("Verification code has been send");
   navigate('/login/verifyCode')
  }

  let validationSchema = yup.object({
      email: yup.string().required('Email is required').email('invalid email'),
  })

  let formik = useFormik({
    initialValues:{
      email:'',
    },validationSchema
    ,onSubmit:sendCode
  })

  return <>
     <div className="w-75 mx-auto py-4">
     <h4 className='fw-bold mx-auto fs-1 text-center header position-relative d-flex justify-content-center align-items-end'>Forget Password</h4>
     <form onSubmit={formik.handleSubmit}>
      {apiError ?<div className="alert alert-danger">{apiError}</div>:''} 

      <label htmlFor="email">Email : </label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" name="email" id="email" className='form-control mb-3'/>
      {formik.errors.email && formik.touched.email?<div className="alert alert-danger py-2">{formik.errors.email}</div>: ''}
      
      <div>
      {loading? <button type='button' className='btn bg-main text-light'>
      <i className='fas fa-spinner fa-spin'></i>
      </button>
      :<button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-light'>Send Code</button>
      }
      </div>
    
     </form>
     </div>
  </>
}
