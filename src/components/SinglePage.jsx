import React, { useContext, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./singlePage.css";
import { useParams } from "react-router-dom";
import Context from "../context/Context";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import Stars from "./Stars";
import { CiStar } from "react-icons/ci";

const SinglePage = () => {
  const { state, dispatch } = useContext(Context);
  const { Product, Cart } = state;
  const { prodId } = useParams();
  const [imgNo, setimgNo] = useState(0);
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
              <span>
                {prod.rating}
                <CiStar />
              </span>
              <span>
                <Stars star={prod.rating} />
              </span>
              {/* <p>Brand: <span>{prod.brand}</span> </p>
              <p>Category: <span>{prod.category}</span></p>
              <p>Discounted Price :<span>{prod.price}$</span></p>
              
              <p>In Stocks: <span>{prod.stock}</span></p> */}
              <hr/>
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
                  <th>Price:</th>
                  <td>{prod.price}$</td>
                </tr>
                <tr>
                  <th>Stocks:</th>
                  <td>{prod.stock}</td>
                </tr>
              </table>
              <hr/>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default SinglePage;
