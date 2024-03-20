import React from 'react'
import style from './Products.module.css'

import Product from '../Product/Product'

export default function Products() {

    return <>
    <div className='py-4'>
       <h4 className='fw-bold mx-auto fs-1 text-center header position-relative d-flex justify-content-center align-items-end'>All Products</h4>
       <div className='row pt-4 g-4'>
         <Product />
      </div> 
    </div>
    </>
}
