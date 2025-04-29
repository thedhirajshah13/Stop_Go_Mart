import React, { useContext, useState, useEffect } from "react";
import Navbar from "./Navbar";

import "./singlePage.css";
import { useParams } from "react-router-dom";
import Context from "../context/Context";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import Stars from "./Stars";
import Layout from "./Layout";
import { Skeleton } from "@mui/material";

const SinglePage = () => {
  const { state, dispatch } = useContext(Context);
  const { Product, Cart } = state;
  const { prodId } = useParams();
  const [imgNo, setimgNo] = useState(0);
  const [loadedImages, setLoadedImages] = useState({});

  function addToCart(prod) {
    console.log(prod);
    dispatch({
      type: "ADD TO CART",
      payload: prod,
    });
  }
  function removeFromCart(prodid) {
    dispatch({
      type: "REMOVE FROM CART",
      payload: prodid,
    });
  }

  const selectedProduct = Product.find((prod) => prod.id === Number(prodId));

  const handleImageLoad = (index) => {
    setLoadedImages((prev) => ({ ...prev, [index]: true }));
  };

  if (!selectedProduct) {
    return (
      <Layout>
        <Navbar />
        <div className="singleProduct">
          <Skeleton variant="rectangular" width="100%" height="500px" />
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Layout>
        <Navbar />
        <div className="singleProduct">
          <div className="card">
            {/* Small Images Section */}
            <div className="allImages">
              {selectedProduct.images?.map((img, id) => (
                <div key={id} style={{ marginBottom: "10px" }}>
                  {!loadedImages[id] && (
                    <Skeleton
                      variant="rectangular"
                      width={80}
                      height={80}
                      animation="wave"
                    />
                  )}
                  <img
                    src={img}
                    onClick={() => setimgNo(id)}
                    style={
                      id === imgNo
                        ? {
                            border: "2px solid blue",
                            display: loadedImages[id] ? "block" : "none",
                          }
                        : {
                            border: "none",
                            display: loadedImages[id] ? "block" : "none",
                          }
                    }
                    onLoad={() => handleImageLoad(id)}
                    alt="img"
                  />
                </div>
              ))}
            </div>

            {/* Main Big Image Section */}
            <div className="singleImage">
              {!loadedImages[`main-${imgNo}`] && (
                <Skeleton variant="rectangular" width="100%" height="400px" animation="wave" />
              )}
              <img
                src={selectedProduct.images[imgNo]}
                alt="img"
                onLoad={() => handleImageLoad(`main-${imgNo}`)}
                style={{
                  display: loadedImages[`main-${imgNo}`] ? "block" : "none",
                }}
              />

              {Cart.some((cart) => cart.id === selectedProduct.id) ? (
                <button
                  style={{ backgroundColor: "red" }}
                  onClick={() => removeFromCart(selectedProduct.id)}
                >
                  <RemoveShoppingCartIcon /> Remove From Cart
                </button>
              ) : (
                <button onClick={() => addToCart(selectedProduct)}>
                  <ShoppingCartOutlinedIcon /> Add to Cart
                </button>
              )}
            </div>

            {/* Details Section */}
            <div className="details">
              <p>{selectedProduct.description}</p>
              <h2>{selectedProduct.title}</h2>
              <span className="rating">
                {selectedProduct.rating}
                <Stars star={selectedProduct.rating} />
              </span>

              <hr />
              <span className="price-tag">
                <p style={{ color: "green" }}>
                  Extra ${Math.floor((Math.trunc((selectedProduct.price * selectedProduct.discountPercentage) / 100))*100)/100} OFF
                </p>
                <div className="price">
                  <p>
                    $
                    {Math.floor((selectedProduct.price -
                      Math.trunc(
                        (selectedProduct.price * selectedProduct.discountPercentage) / 100
                      ))*100)/100}
                  </p>
                  <p style={{ textDecoration: "line-through" }}>
                    ${selectedProduct.price}
                  </p>
                  <p style={{ color: "green" }}>
                    {selectedProduct.discountPercentage}% OFF
                  </p>
                </div>
              </span>
              <hr />
              <table>
                <tbody>
                  <tr>
                    <th>Brand:</th>
                    <td>{selectedProduct.brand}</td>
                  </tr>
                  <tr>
                    <th>Category:</th>
                    <td>{selectedProduct.category}</td>
                  </tr>
                  <tr>
                    <th
                      style={
                        selectedProduct.stock > 0
                          ? { color: "green" }
                          : { textDecoration: "line-through", color: "red" }
                      }
                    >
                      In Stock:
                    </th>
                    <td>{selectedProduct.stock} Available</td>
                  </tr>
                </tbody>
              </table>
              <hr />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default SinglePage;
