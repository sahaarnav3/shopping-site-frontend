import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaUserAlt, FaBars } from "react-icons/fa";
import useProductContext from "../contexts/ProductContext";

export default function Navbar({ showsearch = false, setSearchTerm }) {
  const { cartItemCount, wishlistItemCount } = useProductContext();
  const [collapsed, setCollapsed] = useState(true);

  return (
    <nav className="navbar navbar-expand-md bg-white">
      <div className="container-fluid container d-flex justify-content-between align-items-center">
        <div>
          <NavLink className="nav-link navbar-brand" to="/">
            <h4 className="text-body-tertiary me-5">
              <strong>MyShoppingSite</strong>
            </h4>
          </NavLink>
        </div>
        {/* Toggle button for md and below */}
        <button
          className="navbar-toggler d-md-none"
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setCollapsed((prev) => !prev)}
        >
          <FaBars />
        </button>
        {/* Collapsible content */}
        <div
          className={`collapse navbar-collapse d-md-flex flex-md-row justify-content-md-end align-items-md-center ${
            collapsed ? "" : "show"
          }`}
          id="navbarSupportedContent"
        >
          {/* Search bar */}
          {showsearch && (
            <div className="my-2 my-md-0 me-md-4 w-100 w-md-auto">
              <input
                className="form-control px-5 ms-5"
                type="search"
                placeholder="🔍 Search"
                aria-label="Search"
                style={{width: "80%"}}
                onChange={(e) => {
                  if (e.target.value === "") setSearchTerm("ALLPRODUCTS");
                  else setSearchTerm(e.target.value);
                }}
              />
            </div>
          )}
          {/* Right-side NavLinks */}
          <div className="d-flex align-items-center justify-content-evenly mt-3 mt-md-0">
            <NavLink className="position-relative me-5" to="/wishlist">
              <span style={{ fontSize: "30px" }}>
                <FaHeart className="text-secondary" />
              </span>
              <span className="position-absolute bottom-0 start-10 translate-middle badge rounded-pill bg-danger my-3">
                {wishlistItemCount}
              </span>
            </NavLink>
            <NavLink className="position-relative me-5" to="/cart">
              <span style={{ fontSize: "30px" }}>
                <FaShoppingCart className="text-secondary" />
              </span>
              <span className="position-absolute bottom-0 start-10 translate-middle badge rounded-pill bg-danger my-3">
                {cartItemCount}
              </span>
            </NavLink>
            <NavLink to="/profile">
              <span style={{ fontSize: "30px" }}>
                <FaUserAlt className="text-secondary" />
              </span>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}