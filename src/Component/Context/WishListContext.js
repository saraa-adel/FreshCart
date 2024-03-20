import axios from "axios";
import { createContext, useState } from "react";

export let WishListContext = createContext()

export default function WishListContextProvider(props){
    const [wishListItems, setWishListItems] = useState([]);
    const [numOfWishListItems, setNumOfWishListItems] = useState(0);


    let headers={
        token : localStorage.getItem('userToken')
    }

    function addToWishList(productId){
        return axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',
        {productId},
        {headers}
        )
        .then((response)=> {
            setNumOfWishListItems(response.data.numOfWishListItems);
            return response;
        }
        )
        .catch((err)=> err)
    }
    function getWishListItems(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',
        {headers}
        )
        .then((response)=> {
            setWishListItems(response.data.data);
            setNumOfWishListItems(response.data.numOfWishListItems);
            return response;
        })
        .catch((err)=> err)
    }
    function deleteWishListItem(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        {headers}
        )
        .then((response)=> response)
        .catch((err)=> err)
    }
    return <WishListContext.Provider value={{addToWishList, getWishListItems, deleteWishListItem,setNumOfWishListItems, numOfWishListItems, wishListItems}}>
    {props.children}
    </WishListContext.Provider>
}