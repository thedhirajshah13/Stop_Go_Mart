import React, { useContext, useEffect, useState } from "react";
import "./popular.css";
import Context from "../context/Context";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@mui/material";

const Popular = () => {
  const { state, dispatch, userDetails } = useContext(Context);
  const Navigate = useNavigate();
  const { Product } = state;
  const [popularPage, setpopularPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // 👉 Add loading state

  useEffect(() => {
    async function fetchproduct() {
      try {
        const productData = await fetch("https://dummyjson.com/products?limit=200");
        const data = await productData.json();
        dispatch({
          type: "FETCH PRODUCT",
          payload: data.products,
        });
        setIsLoading(false); // 👉 Set loading false after data fetched
      } catch (error) {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      }
    }

    fetchproduct();
  }, [userDetails]);

  const filteredProducts = Product
    ? Product.filter((prod) => prod.discountPercentage > 15)
    : [];

  return (
    <div className="popular">
      <h3>Hot Deals</h3>
      <div className="popular-sec">
        
        {popularPage > 0 && (
          <button onClick={() => setpopularPage(popularPage - 1)}>
            <ArrowBackIosIcon />
          </button>
        )}

        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => (
              <div className="popular-card" key={index}>
                <Skeleton variant="rectangular" height={180} width={300} />
                <Skeleton width="80%" />
                <Skeleton width="60%" />
                <Skeleton width="90%" />
              </div>
            ))
          : filteredProducts
              .slice(popularPage * 5, popularPage * 5 + 5)
              .map((prod) => (
                <div className="popular-card" key={prod.id}>
                  <img
                    src={prod.images[0]}
                    alt="img"
                    onClick={() => Navigate(`/productDetails/${prod.id}`)}
                  />
                  <div className="title">
                    <span>Upto {prod.discountPercentage}% off</span>
                    <h5>Deal Of The Day.</h5>
                  </div>
                  <p>{prod.description.slice(0, 30)}...</p>
                </div>
              ))}

        {popularPage < Math.floor(filteredProducts.length / 5) && (
          <button onClick={() => setpopularPage(popularPage + 1)}>
            <ArrowForwardIosIcon />
          </button>
        )}
      </div>
    </div>
  );
};

export default Popular;
