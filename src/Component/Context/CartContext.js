import axios from "axios";
import { createContext, useState } from "react";

export let CartContext = createContext()

export default function CartContextProvider(props){
    const [numOfCart, setNumOfCart] = useState(0);


    let headers={
        token : localStorage.getItem('userToken')
    }
    function checkOutSession(cartId , shippingAddress){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
        {cartId},
        {headers}
        )
        .then((response)=> response)
        .catch((err)=> err)
    }
    function addToCart(productId){
        return axios.post('https://ecommerce.routemisr.com/api/v1/cart',
        {productId},
        {headers}
        )
        .then((response)=> {
        setNumOfCart(response.numOfCartItems)
        return response
            })
        .catch((err)=> err)
    }
    function getCartItems(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/cart',
        {headers}
        )
        .then((response)=> {
        setNumOfCart(response.numOfCartItems)
        return response
        })
        .catch((err)=> err)
    }
    function deleteCartItem(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {headers}
        )
        .then((response)=> response)
        .catch((err)=> err)
    }
    function deleteCartItems(){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
        {headers}
        )
        .then((response)=> response)
        .catch((err)=> err)
    }
    function updateCartItem(productId , count){
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {count},
        {headers}
        )
        .then((response)=> response)
        .catch((err)=> err)
    }

     return<CartContext.Provider value={{addToCart , getCartItems , deleteCartItem , updateCartItem , checkOutSession , deleteCartItems , numOfCart , setNumOfCart }}>
          {props.children}
     </CartContext.Provider>
}