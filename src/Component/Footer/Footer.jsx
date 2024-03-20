import React from 'react'
import style from './Footer.module.css'
import amazon from '../../Assets/images/payment/6220a986912013c51947f9b7 (1).png'
import american from '../../Assets/images/payment/pngegg (3).png'
import master from '../../Assets/images/payment/pngegg (2).png'
import paypal from '../../Assets/images/payment/580b57fcd9996e24bc43c530.png'
import google from '../../Assets/images/payment/pngegg4.png'
import appstore from '../../Assets/images/payment/appstore.png'

export default function Footer() {
  return <>
     <div className="bg-main-light mt-5">
      <div className="px-4 py-5">
      <h4 className='fw-bold'>Get the FreashCart app</h4>
      <p className='text-secondary mt-3 mb-0'>We will send you a link, open it on your phone to download the app</p>
      <div className="row px-4 mt-2 g-3 pb-4">
        <div className="col-md-10">
          <div>
            <input type="email" placeholder='Email' className='form-control' />
          </div>
        </div>
        <div className="col-md-2">
          <div>
            <button className='px-2 btn bg-main text-light'>Share App Link</button>
          </div>
        </div>
      </div>
      <div className='py-4 border-bottom border-top d-flex justify-content-between flex-wrap'>
        <div className='d-flex align-items-center py-1'>
          <p className='fw-bold mb-1 pe-3'>Payment Partners</p>
          <div className='d-flex flex-wrap'>
          <div>
            <img src={amazon} className='w-75px pe-3 cursor-pointer' alt="amazon pay" />
          </div>
          <div>
            <img src={american} className='w-60px pe-3 cursor-pointer' alt="american" />
          </div>
          <div>
            <img src={master} className='w-60px pe-3 cursor-pointer' alt="master" />
          </div>
          <div>
            <img src={paypal} className='w-60px pe-3 cursor-pointer' alt="paypal" />
          </div>
          </div>
        </div>
        <div className='d-flex align-items-center py-1 flex-wrap'>
          <p className='fw-bold mb-0 pe-2'>Get deliveries with FreshCart</p>
          <div className='d-flex align-items-center'>
          <div>
            <img src={appstore} className='w-100px pe-2 cursor-pointer' alt="app store" />
          </div>
          <div>
            <img src={google} className='w-115px pe-2 cursor-pointer' alt="google play" />
          </div>
          </div>
        </div>
      </div>
      </div>
     </div>
  </>
}
