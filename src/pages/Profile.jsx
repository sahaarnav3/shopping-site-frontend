import Navbar from "../components/Navbar";
import { NavLink } from "react-router-dom";

import { FaUserCircle, FaShoppingBag, FaAddressCard } from "react-icons/fa";
import { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Profile() {
  const [activeSection, setActiveSection] = useState("");

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pincode, setPincode] = useState("");
  const [locality, setLocality] = useState("");
  const [detailedAddress, setDetailedAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [fetchedAddressData, setFetchedAddressData] = useState([]);

  const [showAddressAlert, setShowAddressAlert] = useState("");
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  const [orderHistoryData, setOrderHistoryData] = useState([]);
  const [totalProductPrice, setTotalProductPrice] = useState(0);
  const [particularOrderData, setParticularOrderData] = useState([]);

  useEffect(() => {
    if (showOrderHistory) {
      const apiUrl =
        `${API_BASE_URL}/orders/get_all_orders`;
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            setOrderHistoryData(
              data.orders.map((order) => ({
                ...order,
                totalPrice: order.products.reduce(
                  (acc, curr) => acc + curr.quantity * curr.product.finalPrice,
                  0
                ),
              }))
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [showOrderHistory]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      const apiUrl =
        `${API_BASE_URL}/address/get_all_address`;
      fetch(apiUrl)
        .then((response) => {
          if (response.status === 200) return response.json();
          else if (response.status === 404 || response.status === 500)
            throw new Error("Nothing");
        })
        .then((data) => setFetchedAddressData(data.addresses))
        .catch((err) => {
          console.log(err);
          setFetchedAddressData([]);
        });
    }, 0);
    return () => clearTimeout(timeOut);
  }, []);

  function addNewAddressHandler() {
    const apiUrl =
      `${API_BASE_URL}/address/add_new_address`;

    const addressObject = {
      name: name,
      mobileNumber: parseInt(phoneNumber),
      pincode: parseInt(pincode),
      detailedAddress: detailedAddress,
      city: city,
      state: state,
      defaultAddress: false,
    };
    fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(addressObject),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) setShowAddressAlert("true");
        else setShowAddressAlert("false");
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setFetchedAddressData([...fetchedAddressData, addressObject]);
      })
      .catch((err) => console.log(err));
  }

  function clearFieldsHandler() {
    setName("");
    setPhoneNumber("");
    setPincode("");
    setLocality("");
    setDetailedAddress("");
    setCity("");
    setState("");
  }

  function deleteAddressHandler(addressId, defaultAddressStatus) {
    const apiUrl = `${API_BASE_URL}/address/delete_address/${addressId}`;
    if (defaultAddressStatus) return;
    fetch(apiUrl, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 200)
          setFetchedAddressData(
            fetchedAddressData.filter((address) => address._id !== addressId)
          );
        return response.json();
      })
      .catch((err) => console.log(err));
  }

  function setAsDefaultAddressHandler(addressId) {
    const apiUrl = `${API_BASE_URL}/address/edit_default/${addressId}`;
    fetch(apiUrl, {
      method: "PATCH",
    })
      .then((response) => {
        if (response.status === 200)
          setFetchedAddressData(
            fetchedAddressData.map((address) => {
              if (address._id === addressId) address.defaultAddress = true;
              else address.defaultAddress = false;
              return address;
            })
          );
        return response.json();
      })
      .catch((err) => console.log(err));
  }

  function renderDataHandler() {
    if (activeSection == "address") {
      return (
        <section className="py-3 pb-5">
          <h4>ADD A NEW ADDRESS</h4>
          {showAddressAlert.length > 0 ? (
            showAddressAlert === "true" ? (
              <>
                <div
                  className="alert alert-success alert-dismissible fade show"
                  role="alert"
                >
                  <strong>Success!</strong> Address Added to Database.
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
                  <strong>Failure!</strong> Address Couldn't be added to
                  Database.
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
          <div className="mt-4">
            <div className="d-flex">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control me-3 py-2"
                style={{ fontSize: "20px" }}
              />
              <input
                type="number"
                placeholder="10-digit mobile number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="form-control"
                style={{ fontSize: "20px" }}
              />
            </div>
            <div className="d-flex mt-3">
              <input
                type="number"
                placeholder="Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="form-control me-3"
                style={{ fontSize: "20px" }}
              />
              <input
                type="text"
                placeholder="Locality"
                value={locality}
                onChange={(event) => setLocality(event.target.value)}
                className="form-control py-2"
                style={{ fontSize: "20px" }}
              />
            </div>
            <div className="d-flex mt-3">
              <textarea
                placeholder="Address (Area and Street)"
                value={detailedAddress}
                onChange={(event) => setDetailedAddress(event.target.value)}
                className="form-control"
                rows={4}
                style={{ fontSize: "20px" }}
              />
            </div>
            <div className="d-flex mt-3">
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(event) => setCity(event.target.value)}
                className="form-control me-3"
                style={{ fontSize: "20px" }}
              />
              <input
                type="text"
                placeholder="State"
                value={state}
                onChange={(event) => setState(event.target.value)}
                className="form-control py-2"
                style={{ fontSize: "20px" }}
              />
            </div>
            <div className="d-flex justify-content-between">
              <button
                className="btn btn-dark mt-3 py-2"
                style={{ width: "49%", fontSize: "20px" }}
                onClick={addNewAddressHandler}
              >
                Save Address
              </button>
              <button
                className="btn btn-primary mt-3 py-2"
                style={{ width: "49%", fontSize: "20px" }}
                onClick={clearFieldsHandler}
              >
                Clear Fields
              </button>
            </div>
          </div>
          <hr />
          <div className="mt-3">
            <h4 className="mb-4">SAVED ADDRESSES</h4>
            <div>
              {fetchedAddressData?.length > 0 ? (
                fetchedAddressData.map((address) => (
                  <div
                    className="border border-1 border-black p-3"
                    key={address._id}
                  >
                    <div className="d-flex">
                      <p className="me-5">
                        <strong>{address.name.toUpperCase()}</strong>
                      </p>
                      <p className="">
                        <strong>{address.mobileNumber}</strong>
                      </p>
                    </div>
                    <div>
                      <p className="text-start" style={{ width: "75%" }}>
                        {address.detailedAddress}, {address.city},{" "}
                        {address.state} - <strong>{address.pincode}</strong>
                      </p>
                    </div>
                    <div
                      className="d-flex justify-content-between"
                      style={{ width: "100%" }}
                    >
                      {address.defaultAddress ? (
                        <NavLink
                          className="btn btn-warning disabled"
                          style={{ width: "49%" }}
                        >
                          <strong>DEFAULT ADDRESS</strong>
                        </NavLink>
                      ) : (
                        <NavLink
                          className="btn"
                          style={{
                            width: "49%",
                            backgroundColor: "black",
                            color: "white",
                          }}
                          onClick={() =>
                            setAsDefaultAddressHandler(address._id)
                          }
                        >
                          Set As Default
                        </NavLink>
                      )}
                      <NavLink
                        className="btn btn-danger"
                        style={{ width: "49%" }}
                        onClick={() =>
                          deleteAddressHandler(
                            address._id,
                            address.defaultAddress
                          )
                        }
                      >
                        Delete Address
                      </NavLink>
                    </div>
                  </div>
                ))
              ) : (
                <div className="border border-1 border-black p-3">
                  <h5>
                    <strong>Add Some Address First</strong>
                  </h5>
                </div>
              )}
            </div>
          </div>
        </section>
      );
    } else if (activeSection == "accountDetails") {
      return (
        <section
          className="accountDetailsSection p-5 d-flex flex-column justify-content-evenly"
          style={{ height: "inherit" }}
        >
          <div className="">
            <h4>First Name:</h4>
            <h3 className="px-4 py-2 mt-3" style={{ backgroundColor: "white" }}>
              {" "}
              <strong>Arnav</strong>{" "}
            </h3>
          </div>
          <div className="">
            <h4>Last Name:</h4>
            <h3 className="px-4 py-2 mt-3" style={{ backgroundColor: "white" }}>
              {" "}
              <strong>Saha</strong>{" "}
            </h3>
          </div>
          <div className="">
            <h4>Email:</h4>
            <h3
              className="px-4 py-2 mt-3 rounded-3"
              style={{ backgroundColor: "white" }}
            >
              {" "}
              <strong>abcxyz@gmail.com</strong>{" "}
            </h3>
          </div>
          <div>
            <h4>Phone Number:</h4>
            <h3 className="px-4 py-2 mt-3" style={{ backgroundColor: "white" }}>
              {" "}
              <strong>1234567890</strong>{" "}
            </h3>
          </div>
        </section>
      );
    } else if (activeSection == "orderHistory") {
      return (
        <section>
          <div className="d-flex flex-column py-4 px-4">
            <div className="d-flex pb-3 text-center border-bottom border-black border-1">
              <p className="p-0 m-0 fs-5" style={{ width: "25%" }}>
                <strong>ORDER</strong>
              </p>
              <p className="p-0 m-0 fs-5" style={{ width: "25%" }}>
                <strong>DATE</strong>
              </p>
              <p className="p-0 m-0 fs-5" style={{ width: "25%" }}>
                <strong>TOTAL</strong>
              </p>
              <p className="p-0 m-0 fs-5" style={{ width: "25%" }}>
                <strong>ACTION</strong>
              </p>
            </div>
            {orderHistoryData.length > 0 ? (
              orderHistoryData.map((order) => {
                const formattedDate = new Date(
                  order.createdAt
                ).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short", // "long" for full month name
                  day: "numeric",
                });
                return (
                  <div
                    className="d-flex py-4 justify-content-between border-bottom  border-3"
                    key={order._id}
                  >
                    <h4
                      className="text-primary p-0 m-0 text-center"
                      style={{ width: "25%", overflow: "hidden" }}
                    >
                      <strong>#{order._id.substring(0, 5)}</strong>
                    </h4>
                    <p
                      className="p-0 m-0 fs-5 text-center"
                      style={{ width: "25%" }}
                    >
                      {formattedDate}
                    </p>
                    <p
                      className="p-0 m-0 fs-5 text-center"
                      style={{ width: "25%" }}
                    >
                      ₹
                      {order.products.reduce(
                        (acc, curr) =>
                          acc + curr.product.finalPrice * curr.quantity,
                        0
                      ) + 501}
                    </p>
                    <NavLink
                      className="btn btn-success fs-6 py-1 m-0 "
                      style={{ width: "25%" }}
                      onClick={() => {
                        setTotalProductPrice(
                          order.products.reduce(
                            (acc, curr) =>
                              acc + curr.product.finalPrice * curr.quantity,
                            0
                          )
                        );
                        setParticularOrderData(order);
                        setActiveSection("particularOrderDetail");
                      }}
                    >
                      View
                    </NavLink>
                  </div>
                );
              })
            ) : (
              <h2 className="text-center mt-5 pt-5">Loading...</h2>
            )}
          </div>
        </section>
      );
    } else if (activeSection == "particularOrderDetail") {
      return (
        <section className="container">
          <div className="mt-3">
            <h3 className="mb-5 text-center">
              <strong>CHECK ORDER SUMMARY BELOW.</strong>
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
                {particularOrderData.products.length > 0
                  ? particularOrderData.products.map((particularProduct) => (
                      <tr key={particularProduct._id}>
                        <th scope="row" className="ps-4">
                          {particularOrderData.products.indexOf(
                            particularProduct
                          ) + 1}
                        </th>
                        <td>{particularProduct.product.shortTitle}</td>
                        <td>{particularProduct.product.finalPrice}</td>
                        <td>{particularProduct.quantity}</td>
                        <td>
                          {particularProduct.product.finalPrice *
                            particularProduct.quantity}
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
                key={particularOrderData.address._id}
                style={{ backgroundColor: "white" }}
              >
                <div className="d-flex">
                  <p className="me-5">
                    <strong>
                      {particularOrderData.address.name.toUpperCase()}
                    </strong>
                  </p>
                  <p className="">
                    <strong>{particularOrderData.address.mobileNumber}</strong>
                  </p>
                </div>
                <div>
                  <p className="text-start" style={{ width: "75%" }}>
                    {particularOrderData.address.detailedAddress},{" "}
                    {particularOrderData.address.city},{" "}
                    {particularOrderData.address.state} -{" "}
                    <strong>{particularOrderData.address.pincode}</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    }
    return (
      <h2 className="text-center mt-5 pt-5">Click On Any Relevant Section</h2>
    );
  }

  return (
    <>
      <Navbar />
      <main className="bg-body-secondary py-4" style={{ minHeight: "54em" }}>
        <div className="container">
          <h2 className="text-center mb-4">
            <strong>Dashboard</strong>
          </h2>
          <div className="row" style={{ height: "46em" }}>
            <div
              className="col-md-4 border border-0 border-black py-4 px-4 d-flex flex-column justify-content-between"
              style={{ height: "40%", fontSize: "20px" }}
            >
              <NavLink
                className="d-flex justify-content-between text-decoration-none border-bottom border-2 border-black pb-2 px-2"
                style={{
                  color: activeSection === "accountDetails" ? "black" : "grey",
                }}
                onClick={() => setActiveSection("accountDetails")}
              >
                <h3>Account Details</h3>
                <FaUserCircle style={{ fontSize: "30px" }} />
              </NavLink>
              <NavLink
                className="d-flex justify-content-between text-decoration-none border-bottom border-2 border-black pb-2 px-2"
                style={{
                  color: activeSection === "orderHistory" ? "black" : "grey",
                }}
                onClick={() => {
                  setActiveSection("orderHistory");
                  setShowOrderHistory(true);
                }}
              >
                <h3>Order History</h3>
                <FaShoppingBag style={{ fontSize: "30px" }} />
              </NavLink>
              <NavLink
                className="d-flex justify-content-between text-decoration-none border-bottom border-2 border-black pb-2 px-2"
                style={{
                  color: activeSection === "address" ? "black" : "grey",
                }}
                onClick={() => setActiveSection("address")}
              >
                <h3>Address</h3>
                <FaAddressCard style={{ fontSize: "30px" }} />
              </NavLink>
            </div>
            <div
              className="col-md-8 border border-2 border-black px-4"
              style={{ height: "100%", overflow: "auto" }}
            >
              {/* {renderedData} this is causing some sorta rendering issue. */}
              {renderDataHandler()}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
