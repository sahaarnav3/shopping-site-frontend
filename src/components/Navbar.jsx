import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar border border-2">
      <div className="container-fluid container d-flex justify-content-between align-items-center">
        <div>
          <NavLink className="nav-link navbar-brand" to="/">
            <h4 className="text-body-tertiary">
              <strong>MyShoppingSite</strong>
            </h4>
          </NavLink>
        </div>
        <div>
          <input
            className="form-control px-5"
            type="search"
            placeholder="🔍Search"
            aria-label="Search"
          />
        </div>
        <div>
          <button type="button" className="btn btn-light position-relative me-3">
            <span  style={{"font-size": "25px"}}>🩶</span>
            <span className="position-absolute top-0 start-10 translate-middle badge rounded-pill bg-danger my-1">
              10
            </span>
          </button>
          <button type="button" className="btn btn-light position-relative">
            <span  style={{"font-size": "25px"}}>🛒</span> Cart
            <span className="position-absolute top-0 start-10 translate-middle badge rounded-pill bg-danger my-1">
              10
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}
