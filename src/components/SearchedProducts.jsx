import React, { useContext, useState } from "react";
import "./searchedProducts.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Context from "../context/Context";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { useNavigate } from "react-router-dom";
const SearchedProducts = () => {
  const Navigate = useNavigate();

  const { state, dispatch } = useContext(Context);
  const { Searched, Product, Cart } = state;
  console.log(Searched, Cart);

  const unique = [...new Set(Searched.map((data) => data.category))];
  console.log(unique)

  const ADDTOCART = (prod) => {
    dispatch({
      type: "ADD TO CART",
      payload: prod,
    });
    //    console.log(Cart.length)
  };

  const REMOVECART = (prodId) => {
    dispatch({
      type: "REMOVE FROM CART",
      payload: prodId,
    });
  };

  return (
    <>
      <div className="search">
        <Navbar />
        <div className="searchedProducts">
          <div className="sidepanel">
            <h1>FILTERS</h1>
            <div>
              <p>PRICE</p>
              <input type="range" />
              <br />

              <select>
                <option>500</option>
                <option>700</option>
                <option>1000</option>
                <option>5000</option>
              </select>
              <span>To</span>
              <select>
                <option>500</option>
                <option>700</option>
                <option>1000</option>
                <option>5000</option>
              </select>
            </div>
            <div>
                <p>CATEGORIES</p>

                {unique.map((prod) => (
                  <>
                    <input type="checkbox" />
                    <label>{prod}</label>
                    <br/>
                  </>
                ))}
              </div>
            <div>
              
              <p>IDEAL FOR</p>

              <input type="checkbox" />
              <label>Men</label>
              <br />

              <input type="checkbox" />
              <label>Women</label>
              <br />

              <input type="checkbox" />
              <label>Children</label>
              <br />

              <input type="checkbox" />
              <label>Couples</label>
              <br />
            </div>
            <div>
              <p>DISCOUNT</p>
              <input type="checkbox"/>
              <label>60% or more</label>
              <br/>
              <input type="checkbox"/>
              <label>50% or more</label>
              <br/>
              <input type="checkbox"/>
              <label>40% or more</label>
              <br/>
              <input type="checkbox"/>
              <label>30% or more</label>
              <br/>
              <input type="checkbox"/>
              <label>20% or more</label>
              <br/>
              <input type="checkbox"/>
              <label>10% or more</label>

            </div>
            <div>
              <p>Customers Rating</p>
              <input type="checkbox"/>
              <label>4 and above</label>
              <br/>
              <input type="checkbox"/>
              <label>3 and above</label>
            </div>
          </div>
          <div className="mainpanel">
            {Searched.length <= 0
              ? Product.map((prod) => (
                  <div className="searched-card">
                    <img
                      src={prod.images[0]}
                      alt="img"
                      onClick={() => Navigate(`/productDetails/${prod.id}`)}
                    />
                    <div className="title">
                      <span>upto {prod.discountPercentage}% off</span>
                      <h5>Deal Of The Day.</h5>
                    </div>
                    <p>{prod.description.slice(0, 30)}...</p>
                    {Cart.some((cart) => cart.id === prod.id) ? (
                      <button
                        style={{
                          backgroundColor: "red",
                          color: "white",
                          width: "100%",
                        }}
                        onClick={() => REMOVECART(prod.id)}
                      >
                        {<RemoveShoppingCartIcon />}REMOVE FROM CART
                      </button>
                    ) : (
                      <button
                        onClick={() => ADDTOCART(prod)}
                        style={{
                          backgroundColor: "green",
                          color: "white",
                          width: "100%",
                        }}
                      >
                        {<ShoppingCartOutlinedIcon />}ADD TO CART
                      </button>
                    )}
                  </div>
                ))
              : Searched.map((prod) => (
                  <div className="searched-card">
                    <img
                      src={prod.images[0]}
                      alt="img"
                      onClick={() => Navigate(`/productDetails/${prod.id}`)}
                    />
                    <div className="title">
                      <span>upto {prod.discountPercentage}% off</span>
                      <h5>Deal Of The Day.</h5>
                    </div>
                    <p>{prod.description.slice(0, 30)}...</p>
                    {Cart.some((cart) => cart.id === prod.id) ? (
                      <button
                        style={{
                          backgroundColor: "red",
                          color: "white",
                          width: "100%",
                        }}
                        onClick={() => REMOVECART(prod.id)}
                      >
                        {<RemoveShoppingCartIcon />}REMOVE FROM CART
                      </button>
                    ) : (
                      <button
                        onClick={() => ADDTOCART(prod)}
                        style={{
                          backgroundColor: "green",
                          color: "white",
                          width: "100%",
                        }}
                      >
                        {<ShoppingCartOutlinedIcon />}ADD TO CART
                      </button>
                    )}
                  </div>
                ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default SearchedProducts;
