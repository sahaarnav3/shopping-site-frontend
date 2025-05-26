import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { useParams, NavLink } from "react-router-dom";
import {
  FaHeart,
  FaRegHeart,
  FaStar,
  FaStarHalfAlt,
  FaPlusCircle,
  FaMinusCircle,
  FaBoxOpen,
  FaHandHoldingUsd,
  FaTruck,
  FaMoneyCheckAlt,
} from "react-icons/fa";
import useFetch from "../useFetch";
import { useState } from "react";
import useProductContext from "../contexts/ProductContext";

export default function ProductDetails() {
  const productId = useParams().prodId;
  const apiUrl = `https://shopping-site-backend-mocha.vercel.app/api/products/${productId}`;
  const { finalData } = useFetch(apiUrl);
  const productData = finalData?.data.product;
  const [productCount, setProductCount] = useState(1);
  const [sizeSelected, setSizeSelected] = useState("S");
  const [showAlert, setShowAlert] = useState("");
  // console.log(productData);

  const {
    setWishlistItemCount,
    wishlistItemCount,
    cartItemCount,
    setCartItemCount,
  } = useProductContext();

  async function wishlistHandler() {
    productData.addedToWishlist = !productData.addedToWishlist;
    const url = `https://shopping-site-backend-mocha.vercel.app/api/products/toggle-wishlist/${productData._id}`;
    await fetch(url, {
      method: "PATCH",
    })
      .then((data) => {
        // console.log(data);
        if (data.status === 200) {
          if (!productData.addedToWishlist)
            setWishlistItemCount(wishlistItemCount - 1);
          else setWishlistItemCount(wishlistItemCount + 1);
        }
      })
      .catch((err) => console.log(err));
  }

  function starhandler(stars) {
    const starArr = [];
    for (let i = 1; i <= stars; i++)
      starArr.push(<FaStar className="text-warning" key={i} />);
    if (stars % 1 != 0)
      starArr.push(<FaStarHalfAlt className="text-warning" key={stars + 1} />);
    return starArr;
  }

  async function addToCartHandler() {
    const url = `https://shopping-site-backend-mocha.vercel.app/api/products/add-to-cart/${productData._id}/${sizeSelected}`;
    await fetch(url, {
      method: "POST",
    })
      .then((data) => {
        // console.log(data.status)
        if (data.status == 200) {
          setShowAlert("true");
          setCartItemCount(cartItemCount + 1);
        } else setShowAlert("false");
      })
      .catch((err) => console.log(err));
  }

  // function buyNowHandler(){
  //   addToCartHandler();

  // }

  return (
    <>
      <Navbar showsearch={false} />
      <main className="bg-body-tertiary py-4">
        <section className="container bg-white" style={{ width: "75%" }}>
          {showAlert.length > 0 ? (
            showAlert === "true" ? (
              <>
                <div
                  className="alert alert-success alert-dismissible fade show"
                  role="alert"
                >
                  <strong>Success!</strong> Product added to cart.
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                  ></button>
                </div>
              </>
            ) : (
              <>
                <div
                  className="alert alert-danger alert-dismissible fade show"
                  role="alert"
                >
                  <strong>Failure!</strong> Product Couldn't be added to cart.
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                  ></button>
                </div>
              </>
            )
          ) : (
            ""
          )}
          <div className="row p-3">
            {productData ? (
              <>
                <div className="col-sm-3 p-0 position-relative" id="image-div">
                  <img
                    src={productData.imageLink}
                    alt="product-img"
                    className="img-fluid"
                  />
                  {productData.addedToWishlist ? (
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

                  <div className="d-flex flex-column text-center py-3">
                    <NavLink
                      className="p-2 mb-2 bg-primary text-white text-decoration-none"
                      onClick={addToCartHandler}
                      to="/cart"
                    >
                      <strong>Buy Now</strong>
                    </NavLink>
                    <NavLink
                      className="p-2 bg-secondary text-white text-decoration-none"
                      onClick={addToCartHandler}
                    >
                      <strong>Add to Cart</strong>
                    </NavLink>
                  </div>
                </div>
                <div className="col-sm-7 ps-5 pb-5">
                  <h5 className="fs-5" style={{ width: "58%" }}>
                    {productData.fullTitle}
                  </h5>
                  <div className="d-flex align-items-start">
                    <p className="fw-medium py-2">{productData.rating}</p>
                    <span className="ps-3" style={{ fontSize: "22px" }}>
                      {productData.rating ? (
                        starhandler(productData.rating)
                      ) : (
                        <p>Loading...</p>
                      )}
                    </span>
                  </div>
                  <div className="d-flex">
                    <h2>
                      <strong>₹{productData.finalPrice}</strong>
                    </h2>
                    <h3 className="ms-3 pt-2 mb-0 pb-0 text-decoration-line-through text-body-tertiary">
                      ₹{productData.mrpPrice}
                    </h3>
                  </div>
                  <h4 className="text-body-tertiary m-0 p-0">
                    <strong>
                      {100 -
                        Math.floor(
                          (productData.finalPrice / productData.mrpPrice) * 100
                        )}
                      % off
                    </strong>
                  </h4>
                  <div className="d-flex mt-4 align-items-center">
                    <p>
                      <strong>Quantity:</strong>
                    </p>
                    <div className="d-flex ms-3">
                      <FaMinusCircle
                        style={{ fontSize: "23px" }}
                        className="mt-2"
                        onClick={() => setProductCount(productCount - 1)}
                      />
                      <p
                        className="border border-2 px-3 py-1 mx-2 rounded"
                        style={{ fontSize: "17px" }}
                      >
                        {productCount}
                      </p>
                      <FaPlusCircle
                        style={{ fontSize: "23px" }}
                        className="mt-2"
                        onClick={() => setProductCount(productCount + 1)}
                      />
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <p>
                      <strong>Size:</strong>
                    </p>
                    <div className="d-flex ms-2">
                      {productData.size.map((givenSize) => (
                        <h4
                          className={`mx-1 border border-2 px-3 py-1 ${
                            sizeSelected == givenSize
                              ? "text-primary border-primary"
                              : "text-body-tertiary border-secondary-subtle"
                          }`}
                          onClick={() => setSizeSelected(givenSize)}
                          style={{ cursor: "pointer" }}
                          key={givenSize}
                        >
                          <strong>{givenSize}</strong>
                        </h4>
                      ))}
                    </div>
                  </div>
                  <hr className="border border-1 border-dark" />
                  <div className="d-flex text-center" style={{ width: "50%" }}>
                    <div>
                      <FaBoxOpen className="display-4 border rounded-circle p-2 bg-body-secondary" />
                      <p className="px-4">10 days Returnable</p>
                    </div>
                    <div>
                      <FaHandHoldingUsd className="display-4 border rounded-circle p-2 bg-body-secondary" />
                      <p className="px-4">Pay on Delivery</p>
                    </div>
                    <div>
                      <FaTruck className="display-4 border rounded-circle p-2 bg-body-secondary" />
                      <p className="px-4">Free Delivery</p>
                    </div>
                    <div>
                      <FaMoneyCheckAlt className="display-4 border rounded-circle p-2 bg-body-secondary" />
                      <p className="px-4">Secure Payment</p>
                    </div>
                  </div>
                  <hr className="border border-1 border-dark" />
                  <div className="mt-4">
                    <p>
                      <strong>Description:</strong>
                    </p>
                    <ul>
                      {productData.description.map((desc) => (
                        <li key={desc}>{desc}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="col-sm-2">{/* side gap */}</div>
                <hr className="border border-1 border-dark" />
                <div className="py-2">
                  <h4>More items you may like in apparel.</h4>
                  {productData ? (
                    <div className="d-flex py-3 justify-content-between">
                      <ProductCard
                        key={productData._id + "1"}
                        productData={productData}
                      />
                      <ProductCard
                        key={productData._id + "2"}
                        productData={productData}
                      />
                      <ProductCard
                        key={productData._id + "3"}
                        productData={productData}
                      />
                      <ProductCard
                        key={productData._id + "4"}
                        productData={productData}
                      />
                    </div>
                  ) : (
                    <h4>Loading...</h4>
                  )}
                </div>
              </>
            ) : (
              <h4>Loading...</h4>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
