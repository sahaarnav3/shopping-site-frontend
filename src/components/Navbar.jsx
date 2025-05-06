import { NavLink } from "react-router-dom";
import { BsFillHeartFill } from "react-icons/bs";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
// import useFetch from "../useFetch";
import useProductContext from "../contexts/ProductContext";

export default function Navbar({ showsearch }) {

  // const api = "https://shopping-site-backend-mocha.vercel.app/api/products/wishlist-items/wishlist";
  // const { finalData } = useFetch(api);
  // console.log(finalData?.data.product.length);
  const { wishlistItems, cartItems } = useProductContext();
  // console.log("navbar cart -", cartItems?.cartItems.length);

  return (
    <nav className="navbar">
      <div className="container-fluid container d-flex justify-content-between align-items-center">
        <div>
          <NavLink className="nav-link navbar-brand" to="/">
            <h4 className="text-body-tertiary">
              <strong>MyShoppingSite</strong>
            </h4>
          </NavLink>
        </div>
        <div>
          { showsearch ? <input
            className="form-control px-5"
            type="search"
            placeholder="🔍 Search"
            aria-label="Search"
          /> : ""}
        </div>
        <div className="d-flex">
          <NavLink className="position-relative me-5" to="/wishlist">
            <span style={{ "fontSize": "30px" }}>
              <FaHeart className="text-secondary" />
            </span>
            <span className="position-absolute bottom-0 start-10 translate-middle badge rounded-pill bg-danger my-3">
              {wishlistItems?.data.product.length}
            </span>
          </NavLink>
          <NavLink className="position-relative" to="/cart">
            <span style={{ "fontSize": "30px" }}>
              <FaShoppingCart className="text-secondary" />
            </span>
            <span className="position-absolute bottom-0 start-10 translate-middle badge rounded-pill bg-danger my-3">
              {cartItems?.cartItems.length}
            </span>
          </NavLink>
          {/* <button type="button" className="btn btn-light position-relative">
            <span  style={{"font-size": "25px"}}>🛒</span> Cart
            <span className="position-absolute top-0 start-10 translate-middle badge rounded-pill bg-danger my-1">
              10
            </span>
          </button> */}
        </div>
      </div>
    </nav>
  );
}
