import React, { useContext, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../asset/logon.png";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Person3Icon from "@mui/icons-material/Person3";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Context from "../context/Context";

const Navbar = ({ authenticated, setauthenticated }) => {
  const { state, dispatch } = useContext(Context);
  const { Product, Cart } = state;

  const [search, setsearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  function handleLogout() {
    setauthenticated(false);
    alert("Logged out");
  }

  function searchProducts() {
    const searchedProducts = Product.filter(
      (prod) =>
        prod.title?.toLowerCase().includes(search) ||
        prod.brand?.toLowerCase().includes(search) ||
        prod.category?.toLowerCase().includes(search) ||
        prod.description?.toLowerCase().includes(search)
    );
    dispatch({
      type: "SEARCHED PRODUCTS",
      payload: searchedProducts,
    });

    navigate("/search");
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchProducts();
    }
  };

  return (
    <>
      <div className="navbar">
        {/* Logo */}
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>

        {/* Hamburger for mobile */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </div>

        {/* Navigation Links */}
        <div className={`navitem ${menuOpen ? "open" : ""}`}>
          <Link to="/">Home</Link>
          <Link to="/explore">Explore</Link>
          <Link to="/new">New</Link>
          <Link to="/contact">Contact Us</Link>
        </div>

        {/* Search Bar */}
        <div className="search">
          <img src={logo} className="search-logo" alt="logo" />
          <input
            type="text"
            placeholder="Search for Products, Brands and more."
            value={search}
            onChange={(e) => setsearch(e.target.value?.toLowerCase())}
            onKeyDown={handleKeyPress}
          />
          <button onClick={searchProducts}>
            <SearchIcon />
          </button>
        </div>

        {/* Profile + Cart */}
        <div className="profile">
          <Link to="/wishlist">
            <FavoriteIcon className="wishbtn" />
          </Link>

          <Link to="/cart" className="cart-link">
            <ShoppingCartOutlinedIcon />
            {Cart.length > 0 && <span className="cart-count">{Cart.length}</span>}
          </Link>

          <Link onClick={handleLogout} className="profile-link">
            {authenticated ? (
              <>
                <img src="" alt="user" />
                <span>Name</span>
              </>
            ) : (
              <Person3Icon />
            )}
          </Link>
        </div>
      </div>

      {/* Announcement Section */}
      <div className="announcement">
        <p>Invite Friends and get 50% off on your next purchase</p>
        <span>Invite Now</span>
        <button>
          <ClearIcon />
        </button>
      </div>
    </>
  );
};

export default Navbar;
