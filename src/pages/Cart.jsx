import Navbar from "../components/Navbar";
import useFetch from "../useFetch";
import { NavLink } from "react-router-dom";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Cart() {
  // const [productCount, setProductCount] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalProductPrice, setTotalProductPrice] = useState(0);

  const [showAddressList, setShowAddressList] = useState(false);
  const [defaultAddress, setDefaultAddress] = useState();

  //For correcting of 2 order being placed issue.
  const [orderPlaced, setOrderPlaced] = useState(false);

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

  useEffect(() => {
    const timeOut = setTimeout(() => {
      const apiUrl =
        "https://shopping-site-backend-mocha.vercel.app/api/address/fetch-default-address";
      fetch(apiUrl)
        .then((response) => {
          if (response.status === 200) return response.json();
          else if (response.status === 404 || response.status === 500)
            throw new Error("Nothing");
        })
        .then((data) => setDefaultAddress(data.addresses))
        .catch((err) => {
          console.log(err);
        });
    }, 0);
    return () => clearTimeout(timeOut);
  }, []);

  async function removeFromCartHandler(prodId, specs) {
    const removeApiUrl = `https://shopping-site-backend-mocha.vercel.app/api/products/remove-from-cart/${prodId}/${specs}`;
    await fetch(removeApiUrl, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => console.log("Error in removing data from cart", err));
    // console.log(prodId, specs);
    const productIndex = finalData.cartItems.findIndex(
      (obj) => obj._id == prodId
    );
    console.log(productIndex);
    if (finalData.cartItems[productIndex].addedToCart.length == 1)
      finalData.cartItems = finalData.cartItems.filter(
        (product) => product._id != prodId
      );
    else finalData.cartItems[productIndex].addedToCart.pop();
    setFinalData({ ...finalData });
  }

  async function finalOrderHandler() {
    const finalProductArray = finalData.cartItems.map((product) => {
      return { product: product._id, quantity: product.addedToCart.length };
    });
    const finalAddress = {
      name: defaultAddress.name,
      mobileNumber: defaultAddress.mobileNumber,
      pincode: defaultAddress.pincode,
      detailedAddress: defaultAddress.detailedAddress,
      city: defaultAddress.city,
      state: defaultAddress.state,
    };
    const finalOrderData = {
      products: finalProductArray,
      address: finalAddress,
    };

    try {
      const orderRes = await fetch(
        "https://shopping-site-backend-mocha.vercel.app/api/orders/create-new-order",
        {
          method: "POST",
          body: JSON.stringify(finalOrderData),
          headers: {
            "content-type": "application/json",
          },
        }
      );

      if (orderRes.status === 200) {
        const removeRes = await fetch(
          "https://shopping-site-backend-mocha.vercel.app/api/products/remove-all-cart-items",
          {
            method: "PATCH",
          }
        );
        if (removeRes.status === 200) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  useEffect(() => {
    if (orderPlaced) finalOrderHandler();
  }, [orderPlaced]);

  function renderData() {
    if (!showAddressList) {
      return (
        <>
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
                          <NavLink
                            className="text-decoration-none fw-semibold border bg-secondary text-white text-center py-1 mb-2"
                            onClick={() =>
                              removeFromCartHandler(
                                product._id,
                                product.addedToCart[
                                  product.addedToCart.length - 1
                                ]
                              )
                            }
                          >
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
              <NavLink
                className="btn btn-primary mb-1"
                style={{ width: "100%" }}
                onClick={() => {
                  if (totalProductPrice > 0) {
                    setShowAddressList(true);
                    setOrderPlaced(true); // Trigger order placement
                  } else {
                    setShowAddressList(false);
                  }
                }}
              >
                {totalProductPrice > 0
                  ? "Place Order"
                  : "Add Items To Cart First"}
              </NavLink>
            </section>
          </div>
        </>
      );
    } else {
      // console.log(finalData.cartItems);
      // console.log(defaultAddress);
      // finalOrderHandler();
      //solve this issue of 2 saves here.
      // setOrderPlaced(true);

      return (
        <>
          <main className="container">
            <div className="mt-3">
              <h3 className="mb-5 text-center">
                <strong>ORDER CONFIRMED. CHECK ORDER SUMMARY BELOW.</strong>
              </h3>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col" className="ps-4">
                      S No.
                    </th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Units</th>
                    <th scope="col">Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {finalData.cartItems.length > 0
                    ? finalData.cartItems.map((product) => (
                        <tr key={product._id}>
                          <th scope="row" className="ps-4">
                            {finalData.cartItems.indexOf(product) + 1}
                          </th>
                          <td>{product.shortTitle}</td>
                          <td>{product.finalPrice}</td>
                          <td>{product.addedToCart.length}</td>
                          <td>
                            {product.finalPrice * product.addedToCart.length}
                          </td>
                        </tr>
                      ))
                    : ""}
                  <tr>
                    <th className="table-dark"></th>
                    <th className="table-dark"></th>
                    <th className="table-dark"></th>
                    <th className="table-dark"></th>
                    <th className="table-dark"></th>
                  </tr>
                  <tr>
                    <th>{}</th>
                    <th>Total Price of All Products:</th>
                    <th>{}</th>
                    <th>{}</th>
                    <th className="pb-3" style={{ width: "29%" }}>
                      {totalProductPrice} - 1000 (Discount) + 499 (Shipping) ={" "}
                      {totalProductPrice + 501}
                    </th>
                  </tr>
                </tbody>
              </table>
              <div>
                <h3 className="mt-5 pt-5">Selected Address:</h3>
                <div
                  className="border border-1 border-black p-4 mt-4 rounded rounded-4"
                  key={defaultAddress._id}
                  style={{ backgroundColor: "white" }}
                >
                  <div className="d-flex">
                    <p className="me-5">
                      <strong>{defaultAddress.name.toUpperCase()}</strong>
                    </p>
                    <p className="">
                      <strong>{defaultAddress.mobileNumber}</strong>
                    </p>
                  </div>
                  <div>
                    <p className="text-start" style={{ width: "75%" }}>
                      {defaultAddress.detailedAddress}, {defaultAddress.city},{" "}
                      {defaultAddress.state} -{" "}
                      <strong>{defaultAddress.pincode}</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </>
      );
    }
  }

  return (
    <>
      <Navbar showsearch={false} />
      <main className="bg-body-secondary py-5" style={{ minHeight: "54em" }}>
        {renderData()}
      </main>
    </>
  );
}
