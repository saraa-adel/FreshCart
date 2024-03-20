import React from 'react'
import style from './NotFound.module.css'
import notfound from '../../Assets/images/error.svg'

export default function NotFound() {
  return <>
     <div className='py-3 d-flex justify-content-center align-items-center'>
      <img src={notfound} alt="notfound" />
     </div>
  </>
}
