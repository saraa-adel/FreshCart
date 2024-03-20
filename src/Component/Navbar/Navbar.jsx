import React, { useContext, useEffect, useState } from 'react'
// import style from './Navbar.module.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../../Assets/images/freshcart-logo.svg'
import wishlist from '../../Assets/images/wishlist (5).png'
import {UserContext} from '../Context/UserContext.js'
import { useSelector } from 'react-redux'
import { jwtDecode } from "jwt-decode";
import { CartContext } from '../Context/CartContext.js'


export default function Navbar() {

  let {getCartItems,numOfCart ,setNumOfCart} = useContext(CartContext)
  let { userToken, setUserToken} = useContext(UserContext) 
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('');
  const decoded = userToken ? jwtDecode(localStorage.getItem("userToken")) : null
  let navigate = useNavigate()

  function logOut(){
    localStorage.removeItem('userToken')
    setUserToken(null)
    navigate('/login')
  }
  
  async function getItems() {
      const { data } = await getCartItems();
      if (data && data.numOfCartItems !== undefined) {
        setNumOfCart(data.numOfCartItems);
      } else {
        setNumOfCart(0);
    }
  }  

    useEffect(()=>{
      getItems()
    },[])

  useEffect(() => {
       const currentPath = location.pathname;
       setActiveLink(currentPath);
       }, [location]);
  
  
  return <>
     <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container">
    <Link to={'/'} className="navbar-brand">
      <img src={logo} alt="" />
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {userToken!= null? <>
          <li className="nav-item pe-2">
          <Link className={`nav-link color-hover ${activeLink === '/' ? 'active' : ''} fw-bold text-center rounded-2`} to={'/'}>Home</Link>
        </li> 
        <li className="nav-item pe-2">
          <Link className={`nav-link color-hover ${activeLink === '/products' || activeLink.includes('productDetails') ? 'active' : ''} fw-bold text-center rounded-2`} to={'products'}>Products</Link>
        </li> 
        <li className="nav-item pe-2">
          <Link className={`nav-link color-hover ${activeLink === '/categories' || activeLink.includes('categoriesDetails') ? 'active' : ''} fw-bold text-center rounded-2`} to={'categories'}>Categories</Link>
        </li> 
        <li className="nav-item pe-2">
          <Link className={`nav-link color-hover ${activeLink === '/brands' || activeLink.includes('brandDetails') ? 'active' : ''} fw-bold text-center rounded-2`} to={'brands'}>Brands</Link>
        </li> 
        </>:''}
      </ul>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

        {userToken != null ? <>
          <Link to={'/wishlist'} className=' nav-link d-flex justify-content-center align-items-center '>
          <i className={`fa-solid fa-shield-heart color-hover2 fs-2 text-secondary pe-1 ${activeLink === '/wishlist' ? 'colorHover2' : ''}`}></i>
        </Link>
          <Link to={'/cart'} className=' nav-link d-flex justify-content-center align-items-center '>
        <i className={`fa-solid fa-cart-shopping  position-relative color-hover fs-2 pe-2 text-secondary ${activeLink === '/cart' ? 'colorHover' : ''}`}>
        <span className='w-25px h-25px d-flex align-items-center justify-content-center rounded-circle position-absolute bg-main cart-num'>
          { numOfCart >0 ||numOfCart !== "undefined"? <>
        <p className='m-0 text-white fw-medium fs-6'>{numOfCart}</p>
        </>:<>
        <p className='m-0 text-white fw-medium fs-6'>0</p>
        </>}
        </span>
        </i>
        </Link>
            <div className="dropdown text-center">
              <button type="button" className="btn bg-main text-white dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              <i className="fa-solid fa-user"></i>
              </button>
              <ul className="dropdown-menu">
                <li><span className="nav-link cursor-pointer px-0 fw-bold color-hover">Hi {decoded.name}!</span></li>
                <li className="nav-item d-flex align-items-center justify-content-evenly py-2">
                <i className="fa-brands fa-instagram cursor-pointer"></i>
                <i className="fa-brands fa-facebook cursor-pointer"></i>
                <i className="fa-brands fa-twitter cursor-pointer"></i>
                <i className="fa-brands fa-youtube cursor-pointer"></i>
                </li>
                <li><hr className="dropdown-divider"/></li>
                <li><span onClick={logOut} className="nav-link cursor-pointer color-hover">SignOut</span></li>
              </ul>
            </div>
        </>:<>
        <li className="nav-item">
          <Link className={`nav-link color-hover ${activeLink === '/register' ? 'active' : ''} fw-bold text-center rounded-2`} to={'register'}>Register</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link color-hover ${activeLink === '/login' ? 'active' : ''} fw-bold text-center rounded-2`} to={'login'}>Login</Link>
        </li>
        </>}
      </ul>
    </div>
  </div>
</nav>
  </>
}
