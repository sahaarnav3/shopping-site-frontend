import { NavLink } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState } from "react";

import useProductContext from "../contexts/ProductContext";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ProductCard({ productData }) {
  const [productDetails, setProductDetails] = useState(productData);

  const { setWishlistItemCount, wishlistItemCount } = useProductContext();

  async function wishlistHandler() {
    setProductDetails({
      ...productDetails,
      addedToWishlist: !productDetails.addedToWishlist,
    });
    const url = `${API_BASE_URL}/products/toggle_wishlist/${productDetails._id}`;
    await fetch(url, {
      method: "PATCH",
    })
      .then((data) => {
        if (data.status === 200) {
          if (productDetails.addedToWishlist)
            setWishlistItemCount(wishlistItemCount - 1);
          else setWishlistItemCount(wishlistItemCount + 1);
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <div className="card p-0 col-md-3 text-center" style={{ width: "16rem" }}>
        <img
          src={productDetails.imageLink}
          className="card-img-top img-fluid"
          style={{ height: "20rem" }}
          alt="prod-img"
        />
        {productDetails.addedToWishlist ? (
          <NavLink
            className="position-absolute end-0 m-2 px-2 pb-1 rounded-circle"
            style={{ backgroundColor: "white" }}
            onClick={wishlistHandler}
          >
            <span style={{ fontSize: "25px" }}>
              <FaHeart className="text-danger" />
            </span>
          </NavLink>
        ) : (
          <NavLink
            className="position-absolute end-0 m-2 px-2 pb-1 rounded-circle"
            style={{ backgroundColor: "white" }}
            onClick={wishlistHandler}
          >
            <span style={{ fontSize: "25px" }}>
              <FaRegHeart className="text-dark" />
            </span>
          </NavLink>
        )}
        <div className="card-body p-0">
          <p className="card-text my-2">{productDetails.shortTitle}</p>
          <h4 className="card-title mb-3">
            <strong>₹{productDetails.finalPrice}</strong>
          </h4>
          {productDetails.addedToCart.length > 0 ? (
            <NavLink
              className="nav-link bg-primary text-white py-1 rounded-2 rounded-top-0"
              style={{ width: "100%" }}
              to="/cart"
            >
              <strong>Go To Cart</strong>
            </NavLink>
          ) : (
            <NavLink
              className="nav-link bg-secondary text-white py-1 rounded-2 rounded-top-0"
              style={{ width: "100%" }}
              to={`/product-details/${productDetails._id}`}
            >
              <strong>Add To Cart</strong>
            </NavLink>
          )}
        </div>
      </div>
    </>
  );
}
