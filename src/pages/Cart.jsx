import Navbar from "../components/Navbar";
import useFetch from "../useFetch";
import { NavLink } from "react-router-dom";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Cart() {
  // const [productCount, setProductCount] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalProductPrice, setTotalProductPrice] = useState(0);

  const apiUrl =
    "https://shopping-site-backend-mocha.vercel.app/api/products/get-cart-items/cart";
  const { finalData, setFinalData } = useFetch(apiUrl);
  // console.log(finalData?.cartItems);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      let tempTotalProduct = 0;
      let tempTotalProductPrice = 0;
      finalData?.cartItems.map((prod) => {
        tempTotalProduct += prod.addedToCart.length;
        tempTotalProductPrice += prod.addedToCart.length * prod.finalPrice;
      });
      setTotalProducts(tempTotalProduct);
      setTotalProductPrice(tempTotalProductPrice);
    }, 0);
    return () => clearTimeout(timeOut);
  }, [finalData]);

  async function removeFromCartHandler(prodId, specs) {
    const removeApiUrl = `https://shopping-site-backend-mocha.vercel.app/api/products/remove-from-cart/${prodId}/${specs}`;
    await fetch(removeApiUrl, {
      method: "POST"
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log("Error in removing data from cart", err));
    // console.log(prodId, specs);
    const productIndex = finalData.cartItems.findIndex(obj => obj._id == prodId);
    console.log(productIndex)
    if(finalData.cartItems[productIndex].addedToCart.length == 1)
      finalData.cartItems = finalData.cartItems.filter(product => product._id != prodId);
    else 
    finalData.cartItems[productIndex].addedToCart.pop();
    setFinalData({...finalData});
  }

  return (
    <>
      <Navbar showsearch={false} />
      <main className="bg-body-secondary py-5" style={{ minHeight: "54em" }}>
        <h3 className="text-center mb-5">
          <strong>MY CART ({finalData?.cartItems.length})</strong>
        </h3>
        <div className="row justify-content-center m-0">
          <section
            className="bg-white col-sm-4  p-0 d-flex flex-column bg-body-secondary"
            style={{ height: "100%", width: "35em" }}
          >
            {finalData != null ? (
              finalData.cartItems.length > 0 ? (
                finalData.cartItems.map((product) => (
                  <div
                    className="product-card mb-4 bg-white d-flex"
                    key={product._id}
                  >
                    <img
                      src={product.imageLink}
                      alt="prod-img"
                      style={{ width: "15em" }}
                    />
                    <div
                      className="mx-4 d-flex flex-column align-self-center"
                      style={{ width: "100%" }}
                    >
                      <p className="fs-4 mb-2">{product.shortTitle}</p>
                      <div className="d-flex">
                        <h3 className="fw-semibold">
                          <strong>₹{product.finalPrice}</strong>
                        </h3>
                        <p className="fs-4 ms-3 mt-1 mb-1 text-decoration-line-through text-body-tertiary">
                          ₹{product.mrpPrice}
                        </p>
                      </div>
                      <h4 className="fw-semibold text-body-tertiary">
                        <strong>
                          {100 -
                            Math.floor(
                              (product.finalPrice / product.mrpPrice) * 100
                            )}
                          % off
                        </strong>
                      </h4>
                      <div className="d-flex align-items-center">
                        <p>
                          <strong>Quantity:</strong>
                        </p>
                        <div className="d-flex ms-3">
                          <FaMinusCircle
                            style={{ fontSize: "23px" }}
                            className="mt-2"
                            // onClick={() => setProductCount(productCount - 1)}
                          />
                          <p
                            className="border border-2 px-3 py-1 mx-2 rounded"
                            style={{ fontSize: "17px" }}
                          >
                            {product.addedToCart.length}
                          </p>
                          <FaPlusCircle
                            style={{ fontSize: "23px" }}
                            className="mt-2"
                            // onClick={() => setProductCount(productCount + 1)}
                          />
                        </div>
                      </div>
                      <div
                        className="d-flex mt-4 flex-column"
                        style={{ width: "100%" }}
                      >
                        <NavLink className="text-decoration-none fw-semibold border bg-secondary text-white text-center py-1 mb-2" onClick={() => removeFromCartHandler(product._id, product.addedToCart[product.addedToCart.length - 1])}>
                          Remove From Cart
                        </NavLink>
                        <NavLink className="text-decoration-none fw-semibold border border-2 text-center py-1 text-body-tertiary">
                          Move to Wishlist
                        </NavLink>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <h2>Cart Empty. Please Add Some Items.</h2>
              )
            ) : (
              <h2>Loading Cart...</h2>
            )}
          </section>
          <section
            className="bg-white col-sm-3 ms-5 rounded p-4"
            style={{ height: "100%", width: "27em" }}
          >
            <h4 className="mt-2 fw-semibold">
              <strong>PRICE DETAILS</strong>
            </h4>
            <hr />
            <div className="d-flex justify-content-between fs-5">
              <p>Price ({totalProducts} item)</p>
              <p>₹{totalProductPrice}</p>
            </div>
            <div className="d-flex justify-content-between fs-5">
              <p>Discount</p>
              <p>-₹1000</p>
            </div>
            <div className="d-flex justify-content-between fs-5">
              <p>Delivery Charges</p>
              <p>₹499</p>
            </div>
            <hr className="mt-1" />
            <div className="d-flex justify-content-between fs-5">
              <h4 className="fw-semibold">
                <strong>TOTAL AMOUNT</strong>
              </h4>
              <h4 className="fw-semibold">
                <strong>
                  ₹{totalProductPrice ? totalProductPrice - 501 : 0}
                </strong>
              </h4>
            </div>
            <hr />
            <p className="fs-5">You will save ₹1000 on this order</p>
            <NavLink className="btn btn-primary mb-1" style={{ width: "100%" }}>
              Place Order
            </NavLink>
          </section>
        </div>
      </main>
    </>
  );
}
