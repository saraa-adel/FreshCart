import React, { useContext, useEffect, useState } from 'react'
import style from './VerifyCode.module.css'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import {UserContext} from '../Context/UserContext.js'
import toast from 'react-hot-toast'

export default function VerifyCode() {

  useEffect(() => {
    document.title = "Verification Code"
},[]);

let {setUserToken} = useContext(UserContext)
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  let navigate = useNavigate()

  async function verification(values){
    setLoading(true)
   const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,values)
   .catch((err)=>{
    setApiError(err.response.data.message)
    setLoading(false)
   })
    setLoading(false)
    toast.success("Success");
    navigate('/login/newPassword')
  }

  let validationSchema = yup.object({
      resetCode: yup.string().matches(/^\d{5,6}$/, "inValid Code").required("code is required")
  })

  let formik = useFormik({
    initialValues:{
      resetCode:'',
    },validationSchema
    ,onSubmit:verification
  })

  return <>
     <div className="w-75 mx-auto py-4">
     <h4 className='fw-bold mx-auto fs-1 text-center header position-relative d-flex justify-content-center align-items-end'>Verification Code</h4>
     <form onSubmit={formik.handleSubmit}>
      {apiError ?<div className="alert alert-danger">{apiError}</div>:''} 

      <label htmlFor="code">Write the code </label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" name="resetCode" id="code" className='form-control mb-3'/>
      {formik.errors.resetCode && formik.touched.resetCode?<div className="alert alert-danger py-2">{formik.errors.resetCode}</div>: ''}
      
      <div>
      {loading? <button type='button' className='btn bg-main text-light'>
      <i className='fas fa-spinner fa-spin'></i>
      </button>
      :<button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-light'>Verify code</button>
      }
      </div>
    
     </form>
     </div>
  </>
}
