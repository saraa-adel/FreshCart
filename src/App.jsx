import React, { useContext, useEffect } from 'react'
import Layout from './Component/Layout/Layout.jsx'
import Home from './Component/Home/Home.jsx'
import Cart from './Component/Cart/Cart.jsx'
import WishList from './Component/WishList/WishList.jsx'
import Products from './Component/Products/Products.jsx'
import Categories from './Component/Categories/Categories.jsx'
import CategoriesDetails from './Component/CategoriesDetails/CategoriesDetails.jsx'
import AllOrders from './Component/AllOrders/AllOrders.jsx'
import ShippingAddress from './Component/ShippingAddress/ShippingAddress.jsx'
import Brands from './Component/Brands/Brands.jsx'
import Register from './Component/Register/Register.jsx'
import Login from './Component/Login/Login.jsx'
import ForgetPassword from './Component/ForgetPassword/ForgetPassword.jsx'
import VerifyCode from './Component/VerifyCode/VerifyCode.jsx'
import NewPassword from './Component/NewPassword/NewPassword.jsx'
import NotFound from './Component/NotFound/NotFound.jsx'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CounterContextProvider from './Component/Context/CounterContext.js'
import { UserContext } from './Component/Context/UserContext.js'
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute.jsx'
import ProductDetails from './Component/ProductDetails/ProductDetails.jsx'
import { Toaster } from 'react-hot-toast'
import { store } from './Redux/Store';
import { Provider } from 'react-redux'
import BrandDetails from './Component/BrandDetails/BrandDetails.jsx'

export default function App() {

  let routers = createBrowserRouter([
    {path:'' ,element: <Layout/>, children: [
      {index: true ,element: <ProtectedRoute><Home/></ProtectedRoute>},
      {path: 'cart' ,element: <ProtectedRoute><Cart/></ProtectedRoute>},
      {path: 'wishList' ,element: <ProtectedRoute><WishList/></ProtectedRoute>},
      {path: 'productDetails/:id' ,element: <ProtectedRoute><ProductDetails/></ProtectedRoute>},
      {path: 'products' ,element: <ProtectedRoute><Products/></ProtectedRoute>},
      {path: 'categories' ,element: <ProtectedRoute><Categories/></ProtectedRoute>},
      {path: 'categoriesDetails/:categoryId' ,element: <ProtectedRoute><CategoriesDetails/></ProtectedRoute>},
      {path: 'allOrders' ,element: <ProtectedRoute><AllOrders/></ProtectedRoute>},
      {path: 'shippingaddress/:cartId' ,element: <ProtectedRoute><ShippingAddress/></ProtectedRoute>},
      {path: 'brands' ,element: <ProtectedRoute><Brands/></ProtectedRoute>},
      {path: 'brandDetails/:brandId' ,element: <ProtectedRoute><BrandDetails/></ProtectedRoute>},
      {path: 'register' ,element: <Register/>},
      {path: 'login' ,element: <Login/>},
      {path: 'login/forgetPassword' ,element: <ForgetPassword/>},
      {path: 'login/verifyCode' ,element: <VerifyCode/>},
      {path: 'login/newPassword' ,element: <NewPassword/>},
      {path: '*' ,element: <NotFound/>},
    ]}
  ])

  let{setUserToken} = useContext(UserContext)
  useEffect(()=>{
    if (localStorage.getItem('userToken')){
      setUserToken(localStorage.getItem('userToken'))
    }
  },[])

  return <>
  <CounterContextProvider>
    <Provider store={store}>
    <RouterProvider router={routers}></RouterProvider>
    <Toaster/>
    </Provider>
  </CounterContextProvider>
  </>
}
