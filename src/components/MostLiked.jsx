import React, { useContext, useState, useEffect } from 'react';
import "./popular.css"; // Same CSS, perfect!
import Context from "../context/Context";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@mui/material'; // 👉 Add Skeleton for loading

const MostLiked = () => {
  const { state } = useContext(Context);
  const { Product } = state;
  const [popularPage, setPopularPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    if (Product && Product.length > 0) {
      setIsLoading(false); 
    }
  }, [Product,popularPage]);

  const filteredProducts = Product
    ? Product.filter((prod) => prod.rating > 4.9)
    : [];

  return (
    <div className="popular">
      <h3>Most Liked</h3>
      {/* Left nav */}
      <button
        className="nav-btn nav-left"
        onClick={() => setPopularPage((p) => Math.max(0, p - 1))}
        aria-label="Previous"
        disabled={popularPage <= 0}
      >
        <ArrowBackIosIcon fontSize="small" />
      </button>

      <div className="popular-sec">
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
                    alt={prod.title}
                    onClick={() => navigate(`/productDetails/${prod.id}`)}
                  />
                  <div className="title">
                    <span>{prod.rating}☆</span>
                    <h5>Most Trusted.</h5>
                  </div>
                  <p>{prod.description.slice(0, 30)}...</p>
                </div>
              ))}
      </div>

      {/* Right nav */}
      <button
        className="nav-btn nav-right"
        onClick={() => setPopularPage((p) => p + 1)}
        aria-label="Next"
        disabled={popularPage >= Math.floor(filteredProducts.length / 5)}
      >
        <ArrowForwardIosIcon fontSize="small" />
      </button>
    </div>
  );
};

export default MostLiked;
