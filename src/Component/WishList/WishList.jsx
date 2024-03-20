import React, { useContext, useEffect, useState } from 'react'
import style from './WishList.module.css'
import axios from 'axios';
import logo from '../../Assets/images/freshcart-logo.svg'
import now from '../../Assets/images/wish-list.png'
import { WishListContext } from '../Context/WishListContext';
import { BallTriangle } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import toast from 'react-hot-toast';

export default function WishList() {
  let {addToCart , setNumOfCart } = useContext(CartContext)
  let {getWishListItems, deleteWishListItem} = useContext(WishListContext)
  const [wishList, setWishList] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = "WishList"
},[]);

async function getItems(){
  let {data} = await getWishListItems()
  if(data.status==='success'){
    console.log(data.count);
    setWishList(data)
    setLoading(false)
  }
}

async function postToCart(id){
  let{data} = await addToCart(id)
    setNumOfCart(data.numOfCartItems);
    toast.success(data.message,{duration :1000})
}

async function removeFromWishList(id){
  let{data} = await deleteWishListItem(id)
  let updatedWishList = { ...wishList };
  updatedWishList.data = updatedWishList.data.filter(item => item.id !== id)
  setWishList(updatedWishList)
  toast.success(data.message,{duration :1000})
}

useEffect(()=>{
  getItems()
},[])

  return <>
  <div className="py-2">
  {loading ? <>
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
        <img src={logo} className='w-100' alt="" />
      </div>
    </div>
  </> : wishList && wishList.data.length > 0 ?<>
    <div className='py-4'>
       <h4 className='fw-bold mx-auto fs-1 text-center header position-relative d-flex justify-content-center align-items-end'>Your WishList<i className="fa-solid fa-heart text-danger ps-2"></i></h4>
         <div className='row pt-4 g-4 justify-content-center'>
         {wishList.data.map((product)=> <div key={product._id} className="col-lg-2 position-relative">
        <button onClick={()=>removeFromWishList(product.id)} className='btn position-absolute end-heart text-secondary fs-4 text-end pt-0 border-0'><i className="fa-solid fa-heart-circle-xmark"></i></button>
        <div className="product rounded-2 p-2">
        <Link to={`/productDetails/${product._id}`}>
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
            <button onClick={()=>postToCart(product._id)} className='btn bg-main w-100 text-light btn-small'>Add To Cart</button>
          </div>
        </div>)}
      </div>
      </div>
  </> : <>
  <div className='d-flex flex-column justify-content-center align-items-center'>
  <div className=' py-3'>
      <img src={now} alt="empty cart" />
    </div>
    <h4 className='text-main fw-bold pb-2'>Your Wishlist Await</h4>
    <p className='text-secondary text-center pb-2'>Explore more and shortlist some items</p>
    <Link to={'/products'} className='btn bg-main fw-bold text-light'>Start Shopping</Link>
  </div>
  </>}
  </div>
  </>
}
