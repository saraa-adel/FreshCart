import React, { useContext, useEffect, useState } from 'react'
import style from './Cart.module.css'
import axios from 'axios';
import logo from '../../Assets/images/freshcart-logo.svg'
import empty from '../../Assets/images/shopping (2).png'
import { CartContext } from '../Context/CartContext';
import { BallTriangle } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

export default function Cart() {
  let { getCartItems, deleteCartItem, updateCartItem, deleteCartItems, numOfCart, setNumOfCart } = useContext(CartContext);
  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = "Cart"
},[]);

async function getItems(){
  let {data} = await getCartItems()
  setCart(data)
  if (data && data.numOfCartItems !== undefined) {
    setNumOfCart(data.numOfCartItems);
  } else {
    setNumOfCart(0);
  }
  setLoading(false)
}
async function deleteItem(id){
  setLoading(true)
  let {data} = await deleteCartItem(id)
  setCart(data)
  setNumOfCart(data.numOfCartItems);
  setLoading(false)
}
async function deleteItems(){
  setLoading(true)
  let {data} = await deleteCartItems()
  setCart([])
  setNumOfCart(0);
  setLoading(false)
}
async function updateItem(id, count){
  if (count < 1) {
    let {data} = await deleteCartItem(id)
    setCart(data)
    setNumOfCart(data.numOfCartItems);
    }else{
    let {data} = await updateCartItem(id , count)
    setCart(data)
    setNumOfCart(data.numOfCartItems);
    }
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
  </> : cart && cart.numOfCartItems!== 'undefined' && numOfCart >0 ? <>
    <>
    <div className="bg-main-light p-3 mt-5 py-3">
    <div className='d-flex justify-content-between align-items-end flex-wrap'>
    <div>
    <h4 className='fw-bold fs-3 pb-3'>Shop Cart :</h4>
    <p className='text-main fw-bold'>Total Cart Price : {cart.data.totalCartPrice} EGP</p>
    </div>
      <div className='pb-2'>
      <button onClick={()=> deleteItems()} className='btn btn-danger text-end'><i className='fas fa-trash-can'></i> Clear the cart</button>
      </div>
    </div>
    {cart.data.products.map((product) => ( <div key={product.product.id} className="row align-items-center m-0 border border-1 border-bottom p-2" >
          <div className="col-md-1">
            <div className="img">
              <img src={product.product.imageCover} className='w-100' alt={product.product.title} />
            </div>
          </div>
          <div className="col-md-10">
            <div className="item">
              <h3 className='h5 fw-bold'>{product.product.title.split(' ').slice(0,3).join(' ')}</h3>
              <p className='text-main fw-bold'>Price : {product.price} EGP</p>
              <button onClick={() => deleteItem(product.product.id)} className='btn'><i className='fas fa-trash-can text-danger'></i> Remove</button>
            </div>
          </div>
          <div className="col-md-1">
            <div className="count d-flex justify-content-center align-items-center">
              <button onClick={() => updateItem(product.product.id, product.count + 1)} className='btn py-1 px-2 brdr'>+</button>
              <span className='px-2'>{product.count}</span>
              <button onClick={() => updateItem(product.product.id, product.count - 1)} className='btn py-1 px-2 brdr'>-</button>
            </div>
          </div>
        </div>))}
      <Link to={`/shippingaddress/${cart.data._id}`} className='btn bg-main text-light m-3'>Online Payment</Link>
      </div>
    </>
  </> : <>
  <div className='d-flex flex-column justify-content-center align-items-center'>
  <div className=' py-3'>
      <img src={empty} alt="empty cart" />
    </div>
    <h4 className='text-main fw-bold pb-2'>Your cart is empty</h4>
    <p className='text-secondary text-center pb-2'>Looks like you haven't added anything to your cart. <br />
    Go ahead & explore top products
    </p>
    <Link to={'/products'} className='btn bg-main text-light fw-bold '>Explore Our Products</Link>
  </div>
  </>}
  </div>
  </>
}
