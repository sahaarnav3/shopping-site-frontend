import { NavLink } from "react-router-dom";
import { BsFillHeartFill } from "react-icons/bs";
import { FaHeart, FaShoppingCart, FaUserAlt } from "react-icons/fa";
// import useFetch from "../useFetch";
import useProductContext from "../contexts/ProductContext";

export default function Navbar({ showsearch = false, setSearchTerm }) {

  const { cartItemCount, wishlistItemCount } = useProductContext();

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
            onChange={(e) => {
              if(e.target.value == "")
                setSearchTerm("ALLPRODUCTS");
              else setSearchTerm(e.target.value)
            }}
          /> : ""}
        </div>
        <div className="d-flex">
          <NavLink className="position-relative me-5" to="/wishlist">
            <span style={{ "fontSize": "30px" }}>
              <FaHeart className="text-secondary" />
            </span>
            <span className="position-absolute bottom-0 start-10 translate-middle badge rounded-pill bg-danger my-3">
              { wishlistItemCount }
            </span>
          </NavLink>
          <NavLink className="position-relative me-5" to="/cart">
            <span style={{ "fontSize": "30px" }}>
              <FaShoppingCart className="text-secondary" />
            </span>
            <span className="position-absolute bottom-0 start-10 translate-middle badge rounded-pill bg-danger my-3">
              {cartItemCount}
            </span>
          </NavLink>
          <NavLink className="" to="/profile">
            <span style={{ "fontSize": "30px" }}>
              <FaUserAlt className="text-secondary" />
            </span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
