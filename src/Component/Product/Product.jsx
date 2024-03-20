import React, { useContext } from 'react'
import style from './Product.module.css'
import logo from '../../Assets/images/freshcart-logo.svg'
import { BallTriangle } from 'react-loader-spinner'
import { useQueries, useQuery } from 'react-query'
import axios from 'axios';
import { WishListContext } from '../Context/WishListContext';
import { CartContext } from '../Context/CartContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Product() {

  let {addToCart , setNumOfCart } = useContext(CartContext)
  let { addToWishList } = useContext(WishListContext);
  let {isLoading} = useQuery('Products', getProducts)

  async function postToCart(id){
    let{data} = await addToCart(id)
    if(data.status === 'success'){
      setNumOfCart(data.numOfCartItems);
      toast.success(data.message,{duration :1000})
    }
  }
  async function postToWishList(id){
    let{data} = await addToWishList(id)
    if(data.status === 'success'){
      toast.success(data.message,{duration :1000})
    }
  }

  function getProducts(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/products')
  }
  let {data} = useQuery('Products', getProducts)

  return <>
         {isLoading? 
       <div className="row">
          <div className="loading flex-column pb-5">
        <BallTriangle
            width={70}
            radius={4}
            ariaLabel="ball-triangle-loading"
            wrapperStyle={{}}
            wrapperClass="d-flex justify-content-center align-items-center mt-5 text-main"
            visible={true}
        />
        <div>
          <img src={logo} className='w-100' alt="logo" />
        </div>
        </div>
       </div>:<>
   {data?.data.data.map((product)=> <div key={product.id} className="col-lg-2">
   <div className="product rounded-2 p-2 position-relative">
   <button onClick={()=>postToWishList(product.id)} className='btn position-absolute end-heart w-100 text-danger fs-4 text-end top-0 p-0 border-0'><i className="fa-solid fa-heart"></i></button>
   <Link to={`/productDetails/${product.id}`}>
       <img src={product.imageCover} className='w-100' alt={product.title.split(' ').splice(0,2).join(' ')} />
       <span className='font-sm text-main'>{product.category.name}</span>
       <h3 className='h5'>{product.title.split(' ').splice(0,2).join(' ')}</h3>
       <div className="d-flex py-3 justify-content-between align-items-center">
         <span className='font-sm'>{product.price} EGP</span>
         <span>
           <i className='fas fa-star rating-color me-1'></i>
           {product.ratingsAverage}
         </span>
       </div>
       </Link>
       <button onClick={()=>postToCart(product.id)} className='btn bg-main w-100 text-light btn-small'>Add To Cart</button>
     </div>
   </div>)}
  </>
}
</>
}
