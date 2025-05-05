import React, { useContext, useState } from "react";
import "./searchedProducts.css";
import Navbar from "./Navbar";

import Context from "../context/Context";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { useNavigate } from "react-router-dom";
const SearchedProducts = () => {
  const Navigate = useNavigate();

  const { state, dispatch } = useContext(Context);
  const { Searched, Product, Cart } = state;
  const [min, setMin]=useState("Min");
  const [max, setMax]=useState(5000)
  const [category, setCategory] = useState([]);
  const [rating, setRating] = useState([]);
  const [discount, setDiscount] = useState([]);
  const [radio, setRadio]=useState({
    min:0,
    max:10
  })

  const unique = [...new Set(Searched.map((data) => data.category))];
  

  const handleCategoryCheckBox = (cat) => {
    setCategory((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );

    console.log(category);
  };
  const handleRatingCheckbox = (rate) => {
    setRating((prev) =>
      prev.includes(rate) ? prev.filter((r) => r !== rate) : [...prev, rate]
    );

    console.log(rating);
  };
  const handleDiscountCheckBox = (dis) => {
    setDiscount((prev) =>
      prev.includes(dis) ? prev.filter((d) => d !== dis) : [...prev, dis]
    );
    console.log(discount);
  };

  const ADDTOCART = (prod) => {
    dispatch({
      type: "ADD TO CART",
      payload: prod,
    });
    
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

              <select value={min} onChange={(e)=>setMin(e.target.value)}>
                <option>Min</option>
                <option>10</option>
                <option>50</option>
                <option>100</option>
              </select>
              <span>To</span>
              <select value={max} onChange={(e)=>setMax(e.target.value)}>
                
                <option>50</option>
                <option>100</option>
                <option>1000</option>
                <option value={5000}>5000+</option>
              </select>
            </div>
            <div>
              <p>CATEGORIES</p>

              {unique.map((cat) => (
                <>
                  <input
                    type="checkbox"
                    value={cat}
                    onChange={() => handleCategoryCheckBox(cat)}
                  />
                  <label>{cat}</label>
                  <br />
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

              <input
                type="checkbox"
                onChange={() => handleDiscountCheckBox(40)}
              />
              <label>40% or more</label>
              <br />
              <input
                type="checkbox"
                onChange={() => handleDiscountCheckBox(30)}
              />
              <label>30% or more</label>
              <br />
              <input
                type="checkbox"
                onChange={() => handleDiscountCheckBox(20)}
              />
              <label>20% or more</label>
              <br />
              <input
                type="checkbox"
                onChange={() => handleDiscountCheckBox(10)}
              />
              <label>10% or more</label>
            </div>
            <div>
              <p>Customers Rating</p>
              <input type="checkbox" onChange={() => handleRatingCheckbox(4)} />
              <label>4 and above</label>
              <br />
              <input type="checkbox" onChange={() => handleRatingCheckbox(3)} />
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
