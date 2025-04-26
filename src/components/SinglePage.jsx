import React, { useContext, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./singlePage.css";
import { useParams } from "react-router-dom";
import Context from "../context/Context";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import Stars from "./Stars";
import Layout from "./Layout";

const SinglePage = () => {
  const { state, dispatch } = useContext(Context);
  const { Product, Cart } = state;
  const { prodId } = useParams();
  const [imgNo, setimgNo] = useState(0);
  console.log(Product.discount);
  function addToCart(prod) {
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
  // console.log(typeof(prodId))
  //   console.log(Product.filter((prod)=>prod.id===Number(prodId))[0]);
  return (
    <>
      <Layout>
        <Navbar />
        <div className="singleProduct">
          {Product.filter((prod) => prod.id === Number(prodId)).map((prod) => (
            <div className="card">
              <div className="allImages">
                {prod.images.map((img, id) => (
                  <img
                    src={img}
                    onClick={() => setimgNo(id)}
                    style={
                      id === imgNo
                        ? { border: "2px solid blue" }
                        : { border: "none" }
                    }
                    alt="img"
                  />
                ))}
              </div>
              <div className="singleImage">
              {console.log(imgNo)}
                <img src={prod.images[imgNo]} alt="img" />

                {Cart.some((cart) => cart.id === prod.id) ? (
                  <button
                    style={{ backgroundColor: "red" }}
                    onClick={() => removeFromCart(prod.id)}
                  >
                    {<RemoveShoppingCartIcon />}Remove From Cart
                  </button>
                ) : (
                  <button onClick={() => addToCart(prod)}>
                    {<ShoppingCartOutlinedIcon />}Add to Cart
                  </button>
                )}
              </div>
              <div className="details">
                <p>{prod.description} </p>
                <h2>{prod.title}</h2>
                <span className="rating">
                  {prod.rating}
                  <Stars star={prod.rating} />
                </span>

                <hr />
                <span className="price-tag">
                  <p style={{ color: "green" }}>
                    Extra $
                    {(Math.trunc((prod.price * prod.discountPercentage) / 100))}{" "}
                    OFF
                  </p>
                  <div className="price">
                    <p>
                      $
                      {prod.price -
                        Math.trunc(
                          (prod.price * prod.discountPercentage) / 100
                        )}
                    </p>
                    <p style={{ textDecoration: "line-through" }}>
                      ${prod.price}
                    </p>
                    <p style={{ color: "green" }}>
                      {" "}
                      {prod.discountPercentage}% OFF
                    </p>
                  </div>
                </span>
                <hr />
                <table>
                  <tr>
                    <th>Brand:</th>
                    <td>{prod.brand}</td>
                  </tr>
                  <tr>
                    <th>Category:</th>
                    <td>{prod.category}</td>
                  </tr>

                  <tr>
                    <th
                      style={
                        prod.stock > 0
                          ? { color: "green" }
                          : { textDecoration: "line-through", color: "red" }
                      }
                    >
                      In Stock:
                    </th>
                    <td>{prod.stock} Available</td>
                  </tr>
                </table>
                <hr />
              </div>
            </div>
          ))}
        </div>
      </Layout>
    </>
  );
};

export default SinglePage;
