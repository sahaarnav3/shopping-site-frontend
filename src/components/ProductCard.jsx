import { NavLink } from "react-router-dom";

export default function ProductCard({ productData }) {
  return (
    <>
      <div
        className="card p-0 col-md-3 text-center"
        style={{ width: "16rem" }}
      >
        <img
          src={productData.imageLink}
          className="card-img-top img-fluid"
          style={{ height: "20rem" }}
          alt="prod-img"
        />
        <div className="card-body p-0">
          <p className="card-text my-2">{productData.shortTitle}</p>
          <h4 className="card-title mb-3">
            <strong>₹{productData.finalPrice}</strong>
          </h4>
          {productData.addedToCart.size.length > 0 ? (
            <NavLink
              className="nav-link bg-primary text-white py-1 rounded-2 rounded-top-0"
              style={{ width: "100%" }}
            >
              <strong>Go To Cart</strong>
            </NavLink>
          ) : (
            <NavLink
              className="nav-link bg-secondary text-white py-1 rounded-2 rounded-top-0"
              style={{ width: "100%" }}
            >
              <strong>Add To Cart</strong>
            </NavLink>
          )}
        </div>
      </div>
    </>
  );
}
