import React, { useContext, useState } from "react";
import "./cart.css";
import Context from "../context/Context";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { GiReturnArrow } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";

const Cart = () => {
  const [checkBox, setcheckBox] = useState([]);
  const { state, dispatch } = useContext(Context);
  const { Cart } = state;
  function removeFromCart(id) {
    console.log(id);
    dispatch({
      type: "REMOVE FROM CART",
      payload: id,
    });
  }
  function handleChechBox(e) {
    console.log(checkBox);
    if (e.target.name === "ALL") {
      if (e.target.checked) {
        Cart.map((cartItem) =>
          setcheckBox((values) => [...values, { id: cartItem.id }])
        );
      } else {
        setcheckBox([]);
      }
    } else {
      if (e.target.checked) {
        setcheckBox((values) => [...values, { id: e.target.name }]);
      } else {
        setcheckBox((values) =>
          values.filter((data) => data.id !== e.target.name)
        );
      }
    }
  }

  return (
    <>
      <Navbar />
      <h3>SHOPPING CART</h3>
      {Cart.length < 0 ? (
        <p>Cart is Empty</p>
      ) : (
        <>
          <div className="top">
            <input type="checkbox" name="ALL" onChange={handleChechBox} />
            <label>
              {checkBox.length}/{Cart.length} Selected
            </label>
            <p>REMOVE</p>
            <p>Move to Wishlist</p>
          </div>
          <div className="cart-container">
            <div className="cart">
              {Cart.map((cartItem, index) => (
                <div className="cartItem">
                  <img src={cartItem.images[0]} alt="img" />
                  <input
                    type="checkbox"
                    className="checkbox"
                    name={cartItem.id}
                    onChange={handleChechBox}
                  />
                  <div className="cartDescription">
                    <p>{cartItem.title}</p>
                    <p>{cartItem.category}</p>
                    <p>Sold By:{cartItem.brand}</p>
                    <select>
                      <option>Qty:1</option>
                      <option>Qty:2</option>
                      <option>Qty:3</option>
                      <option>Qty:4</option>
                      <option>Qty:5</option>
                      <option>Qty:6</option>
                      <option>Qty:7</option>
                      <option>Qty:8</option>
                    </select>
                    <div className="cartItemPrice">
                      <p>
                        $
                        {cartItem.price -
                          Math.trunc(
                            (cartItem.price * cartItem.discountPercentage) / 100
                          )}
                      </p>
                      <p style={{ textDecoration: "line-through" }}>
                        ${cartItem.price}
                      </p>
                      <p style={{ color: "green" }}>
                        {" "}
                        {cartItem.discountPercentage}% OFF
                      </p>
                    </div>
                    <div className="return">
                      <span
                        style={{
                          border: "1px solid black",
                          borderRadius: "55%",
                          width: "20px",
                          height: "20px",
                        }}
                      >
                        {<GiReturnArrow />}
                      </span>
                      <p>
                        <span
                          style={{
                            margin: "0",
                            padding: "0",
                            fontWeight: "500",
                          }}
                        >
                          14 Days
                        </span>{" "}
                        Return availabel
                      </p>
                    </div>
                  </div>
                  <div className="removeFromCart">
                    {
                      <RxCross1
                        style={{
                          width: "25px",
                          height: "25px",
                          cursor: "pointer",
                        }}
                        onClick={() => removeFromCart(cartItem.id)}
                      />
                    }
                  </div>
                </div>
              ))}
            </div>

            <div className="billing">
              <p>BILLING</p>
            </div>
          </div>
        </>
      )}

      <Footer />
    </>
  );
};

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
// (5) ['https://cdn.dummyjson.com/cartItemuct-images/1/1.jpg', 'https://cdn.dummyjson.com/cartItemuct-images/1/2.jpg', 'https://cdn.dummyjson.com/cartItemuct-images/1/3.jpg', 'https://cdn.dummyjson.com/cartItemuct-images/1/4.jpg', 'https://cdn.dummyjson.com/cartItemuct-images/1/thumbnail.jpg']
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
// "https://cdn.dummyjson.com/cartItemuct-images/1/thumbnail.jpg"
// title
// :
// "iPhone 9"
