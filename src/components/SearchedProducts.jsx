import React, { useContext, useState, useMemo } from "react";
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

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(5000);
  const [category, setCategory] = useState([]);
  const [rating, setRating] = useState([]);
  const [discount, setDiscount] = useState([]);

  // Extract unique categories from searched list
  const unique = [...new Set(Searched.map((data) => data.category))];

  // =======================
  // Handle filter toggles
  // =======================
  const handleCategoryCheckBox = (cat) => {
    setCategory((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleRatingCheckbox = (rate) => {
    setRating((prev) =>
      prev.includes(rate) ? prev.filter((r) => r !== rate) : [...prev, rate]
    );
  };

  const handleDiscountCheckBox = (dis) => {
    setDiscount((prev) =>
      prev.includes(dis) ? prev.filter((d) => d !== dis) : [...prev, dis]
    );
  };

  // =======================
  // Cart Actions
  // =======================
  const ADDTOCART = (prod) => {
    dispatch({ type: "ADD TO CART", payload: prod });
  };

  const REMOVECART = (prodId) => {
    dispatch({ type: "REMOVE FROM CART", payload: prodId });
  };

  // =======================
  // Filtering Logic
  // =======================
  const filteredProducts = useMemo(() => {
    const baseList = Searched.length > 0 ? Searched : Product;

    return baseList.filter((prod) => {
      const withinPrice = prod.price >= min && prod.price <= max;
      const matchCategory = category.length
        ? category.includes(prod.category)
        : true;
      const matchDiscount = discount.length
        ? discount.some((d) => prod.discountPercentage >= d)
        : true;
      const matchRating = rating.length
        ? rating.some((r) => prod.rating >= r)
        : true;

      return withinPrice && matchCategory && matchDiscount && matchRating;
    });
  }, [Searched, Product, min, max, category, discount, rating]);

  return (
    <>
      <Navbar />
      <div className="search">
        <div className="searchedProducts">
          {/* Sidebar Filters */}
          <div className="sidepanel">
            <h1>FILTERS</h1>

            {/* Price Filter */}
            <div>
              <p>PRICE</p>
              <select
                value={min}
                onChange={(e) => setMin(Number(e.target.value))}
              >
                <option value={0}>Min</option>
                <option value={10}>10</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span> to </span>
              <select
                value={max}
                onChange={(e) => setMax(Number(e.target.value))}
              >
                <option value={100}>100</option>
                <option value={500}>500</option>
                <option value={1000}>1000</option>
                <option value={5000}>5000+</option>
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <p>CATEGORIES</p>
              {unique.map((cat) => (
                <div key={cat}>
                  <input
                    type="checkbox"
                    checked={category.includes(cat)}
                    onChange={() => handleCategoryCheckBox(cat)}
                  />
                  <label>{cat}</label>
                </div>
              ))}
            </div>

            {/* Discount Filter */}
            <div>
              <p>DISCOUNT</p>
              {[40, 30, 20, 10].map((d) => (
                <div key={d}>
                  <input
                    type="checkbox"
                    checked={discount.includes(d)}
                    onChange={() => handleDiscountCheckBox(d)}
                  />
                  <label>{d}% or more</label>
                </div>
              ))}
            </div>

            {/* Rating Filter */}
            <div>
              <p>CUSTOMER RATING</p>
              {[4, 3].map((r) => (
                <div key={r}>
                  <input
                    type="checkbox"
                    checked={rating.includes(r)}
                    onChange={() => handleRatingCheckbox(r)}
                  />
                  <label>{r}★ & above</label>
                </div>
              ))}
            </div>
          </div>

          {/* Product Cards */}
          <div className="mainpanel">
            {filteredProducts.map((prod) => (
              <div className="searched-card" key={prod.id}>
                <img
                  src={prod.images[0]}
                  alt={prod.title}
                  onClick={() => Navigate(`/productDetails/${prod.id}`)}
                />
                <div className="title">
                  <span>upto {prod.discountPercentage}% off</span>
                  <h5>Deal Of The Day</h5>
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
                    <RemoveShoppingCartIcon /> REMOVE FROM CART
                  </button>
                ) : (
                  <button
                    style={{
                      backgroundColor: "green",
                      color: "white",
                      width: "100%",
                    }}
                    onClick={() => ADDTOCART(prod)}
                  >
                    <ShoppingCartOutlinedIcon /> ADD TO CART
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
