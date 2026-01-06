import React, { useContext, useState } from "react";
import "./cart.css";
import Context from "../context/Context";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Layout from "./Layout";
import { GiReturnArrow } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import emptycartimage from "../asset/EmptyCart.jpg";

const Cart = () => {
  const [checkBox, setcheckBox] = useState({});

  const { state, dispatch } = useContext(Context);
  const { Cart } = state;

  // Billing calculations
  const subtotal = Cart.reduce((sum, item) => {
    const discounted = item.price * (1 - item.discountPercentage / 100);
    return sum + discounted * (item.quantity || 1);
  }, 0);

  const originalTotal = Cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const discountTotal = originalTotal - subtotal;
  const tax = +(subtotal * 0.05).toFixed(2); // 5% tax
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 5.0;
  const total = +(subtotal + tax + shipping).toFixed(2);

  function handleQuantity(id, quantity) {
    dispatch({
      type: "Quantity",
      payload: { id, quantity: Number(quantity) },
    });
  }
  function removeFromCart(id) {
    dispatch({
      type: "REMOVE FROM CART",
      payload: id,
    });
  }

  const handleChechBox = (e) => {
    const { name, checked } = e.target;
    // console.log(checked, name);
    // console.log(checkBox);
    // console.log(checkBoxItem);
    if (name === "ALL") {
      const allChecked = {};
      Cart.forEach((item) => {
        allChecked[item.id] = checked;
      });
      setcheckBox(allChecked);
    } else {
      setcheckBox((prev) => ({
        ...prev,
        [name]: checked,
      }));
    }
  };

  const handleRemoveAll=()=>{
    dispatch({
      type:"REMOVE ALL",
      payload:checkBox
    })
  }

  return (
    <>
      <Layout>
        <Navbar />
        <h3>SHOPPING CART</h3>
        {console.log(Cart.length)}
        {Cart?.length == 0 ? (
          <div>
            <img src={emptycartimage} alt="Empty Cart" />
            <p>Cart is Empty</p>
          </div>
        ) : (
          <div>
            <div className="top">
              <input
                type="checkbox"
                name="ALL"
                onChange={handleChechBox}
                checked={
                  Cart.length > 0 && Cart.every((item) => checkBox[item.id])
                }
              />
              <label>
                {Object.values(checkBox).filter(Boolean).length}/{Cart.length}{" "}
                Selected
              </label>

              <p style={{cursor:"pointer"}} onClick={handleRemoveAll}>REMOVE</p>
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
                      checked={!!checkBox[cartItem.id]}
                      onChange={handleChechBox}
                    />

                    <div className="cartDescription">
                      <p>{cartItem.title}</p>
                      <p>{cartItem.category}</p>
                      <p>Sold By:{cartItem.brand}</p>
                      <select
                        value={cartItem.quantity}
                        onChange={(e) =>
                          handleQuantity(cartItem.id, e.target.value)
                        }
                        style={{ border: "none", borderRadius: "6%" }}
                      >
                        <option value={1}>Qty:1</option>
                        <option value={2}>Qty:2</option>
                        <option value={3}>Qty:3</option>
                        <option value={4}>Qty:4</option>
                        <option value={5}>Qty:5</option>
                        <option value={6}>Qty:6</option>
                        <option value={7}>Qty:7</option>
                        <option value={8}>Qty:8</option>
                      </select>
                      <div className="cartItemPrice">
                        <p>
                          $
                          {Math.floor(
                            cartItem.quantity *
                              (cartItem.price -
                                Math.trunc(
                                  (cartItem.price *
                                    cartItem.discountPercentage) /
                                    100
                                )) *
                              100
                          ) / 100}
                        </p>
                        <p style={{ textDecoration: "line-through" }}>
                          $
                          {Math.floor(
                            cartItem.price * cartItem.quantity * 100
                          ) / 100}
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
                <h4>BILLING SUMMARY</h4>
                <div style={{display:'flex',justifyContent:'space-between',marginTop:'10px'}}>
                  <span>Items ({Cart.length})</span>
                  <span>${originalTotal.toFixed(2)}</span>
                </div>

                <div style={{display:'flex',justifyContent:'space-between',marginTop:'8px'}}>
                  <span>Discount</span>
                  <span style={{color:'var(--accent-2)'}}>- ${discountTotal.toFixed(2)}</span>
                </div>

                <div style={{display:'flex',justifyContent:'space-between',marginTop:'8px'}}>
                  <span>Subtotal</span>
                  <strong>${subtotal.toFixed(2)}</strong>
                </div>

                <div style={{display:'flex',justifyContent:'space-between',marginTop:'8px'}}>
                  <span>Tax (5%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <div style={{display:'flex',justifyContent:'space-between',marginTop:'8px'}}>
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>

                <hr style={{margin:'12px 0',borderColor:'rgba(15,23,42,0.06)'}} />

                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <strong>Total</strong>
                  <strong style={{color:'var(--accent-2)'}}>${total.toFixed(2)}</strong>
                </div>

                <div style={{marginTop:'12px',display:'flex',flexDirection:'column',gap:'8px'}}>
                  <button className="checkout-btn">Proceed to Checkout</button>
                  <button className="checkout-btn" style={{background:'transparent',color:'var(--muted)',border:'1px solid rgba(15,23,42,0.06)'}} onClick={()=>dispatch({type:'APPLY_COUPON',payload:null})}>Apply Coupon</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </>
  );
};

export default Cart;
