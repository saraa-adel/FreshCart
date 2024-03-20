import style from './FeaturedProducts.module.css'
import React from 'react'
import axios from 'axios'
import logo from '../../Assets/images/freshcart-logo.svg'
import { BallTriangle } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import { useQueries, useQuery } from 'react-query'
import { useContext } from 'react'
import { CartContext } from '../Context/CartContext'
import toast from 'react-hot-toast'
import { WishListContext } from '../Context/WishListContext'
import Product from '../Product/Product'

export default function FeaturedProducts() {

  return <>
     <h4 className='pt-3 fs-1 fw-bold header position-relative d-flex justify-content-center align-items-end mx-auto'>Featured Products</h4>
     <div className="row bg-main-light mt-4 pt-4 gy-4">
      <Product />
     </div>
     </>
}
