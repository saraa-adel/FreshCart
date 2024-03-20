import React, { useContext, useEffect, useState } from 'react'
import style from './Login.module.css'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import {UserContext} from '../Context/UserContext.js'

export default function Login() {

  useEffect(() => {
    document.title = "Login"
},[]);

let {setUserToken} = useContext(UserContext)
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  let navigate = useNavigate()

  async function loginSubmit(values){
    setLoading(true)
   let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values)
   .catch((err)=>{
    setApiError(err.response.data.message)
    setLoading(false)
   })
   if (data.message === 'success'){
    setLoading(false)
    localStorage.setItem('userToken', data.token)
    setUserToken(data.token)
    navigate('/')
   }
  }

  let validationSchema = yup.object({
      email: yup.string().required('Email is required').email('invalid email'),
      password: yup.string().required('Password is required').matches(/^[A-Z][\w @]{5,8}$/, 'invalid password'),
  })

  let formik = useFormik({
    initialValues:{
      email:'',
      password:'',
    },validationSchema
    ,onSubmit:loginSubmit
  })

  return <>
     <div className="w-75 mx-auto py-4">
     <h4 className='fw-bold mx-auto fs-1 text-center header position-relative d-flex justify-content-center align-items-end'>Login Now</h4>
     <form onSubmit={formik.handleSubmit}>
      {apiError ?<div className="alert alert-danger">{apiError}</div>:''} 

      <label htmlFor="email">Email : </label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" name="email" id="email" className='form-control mb-3'/>
      {formik.errors.email && formik.touched.email?<div className="alert alert-danger py-2">{formik.errors.email}</div>: ''}
      
      <label htmlFor="password">Password : </label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" name="password" id="password" className='form-control mb-3'/>
      {formik.errors.password && formik.touched.password?<div className="alert alert-danger py-2">{formik.errors.password}</div>: ''}
      
      <div className='d-flex justify-content-between align-items-center'>
      <div>
      {loading? <button type='button' className='btn bg-main text-light'>
      <i className='fas fa-spinner fa-spin'></i>
      </button>
      :<button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-light'>login</button>
      }
      <Link className='ms-2 h6' to={'/register'}>Register now</Link>
      </div>
      <div>
      <Link className='ms-2 h6 text-main' to={"/login/forgetPassword"}>Forget password?</Link>
      </div>
      </div>
    
     </form>
     </div>
  </>
}
