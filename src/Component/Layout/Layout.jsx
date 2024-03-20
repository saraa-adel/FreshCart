import React from 'react'
import style from './Layout.module.css'
import Navbar from '../Navbar/Navbar.jsx'
import Footer from '../Footer/Footer.jsx'
import { Outlet } from 'react-router-dom'
import { Offline } from 'react-detect-offline'
import { Helmet } from 'react-helmet';
import favicon from '../../Assets/images/shopping-cart.png'

export default function Layout() {
  return <>
  <Helmet>
    <link rel="shortcut icon" href={favicon} type="image/x-icon" />
  </Helmet>
     <Navbar/>
     <div className="container">
      <Offline>
        <div className="loading">
          <h2 className="fw bold">Only shown offline (surprise!)</h2>
        </div>
      </Offline>
      <Outlet></Outlet>
     </div>
     <Footer/>
  </>
}
