import React, { useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import Authentication from "./pages/Authetiction.js";
import State from "./context/State.js";

import Search from "./pages/Search.js";
import SinglePage from "./components/SinglePage.jsx";
import Cart from "./components/Cart.jsx";
import SearchedProducts from "./components/SearchedProducts.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <State>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<Search />} />
          <Route path="/productdetails/:prodId" element={<SinglePage/>}/>
        </Routes>
      </State>
    </BrowserRouter>
  );
};

export default App;
