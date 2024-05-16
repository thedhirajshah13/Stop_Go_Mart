import React, { useContext } from "react";
import './cart.css'
import Context from "../context/Context";
import Navbar from "./Navbar";

const Cart=()=>{
const{state}=useContext(Context)
const {Cart}=state
return(
    <>
    <Navbar/>
       {
        Cart.length<=0?<p>Cart is empty</p>:<div>
        <h1>Shopping Cart</h1>
            {
            
                Cart.map((cartitem, index)=>(
                    <>
                    
                    <div className="cart">
                        <img src={cartitem.images[0]}/>
                        <div className="cartdescription">
                            <h3>{cartitem.description}</h3>
                            <p style={cartitem.stock>0?{color:'green'}:{textDecoration:'line-through', color:'red'}}>In Stock</p>
                            <p>{cartitem.brand}</p>
                        </div>
                        <h3>${cartitem.price}</h3>
                    </div>
                    </>
                   
                ))
            }
        </div>
       }

    </>
)
}

export default Cart;

// brand
// : 
// "Apple"
// category
// : 
// "smartphones"
// description
// : 
// "An apple mobile which is nothing like apple"
// discountPercentage
// : 
// 12.96
// id
// : 
// 1
// images
// : 
// (5) ['https://cdn.dummyjson.com/product-images/1/1.jpg', 'https://cdn.dummyjson.com/product-images/1/2.jpg', 'https://cdn.dummyjson.com/product-images/1/3.jpg', 'https://cdn.dummyjson.com/product-images/1/4.jpg', 'https://cdn.dummyjson.com/product-images/1/thumbnail.jpg']
// price
// : 
// 549
// rating
// : 
// 4.69
// stock
// : 
// 94
// thumbnail
// : 
// "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg"
// title
// : 
// "iPhone 9"