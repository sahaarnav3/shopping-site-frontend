import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import Filter from "../components/Filter";
import useFetch from "../useFetch";
import ProductCard from "../components/ProductCard";

import { useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Men() {
  const url =
    `${API_BASE_URL}/products/by_category/men`;
  const { finalData } = useFetch(url);
  const [filteredData, setFilteredData] = useState([]);

  return (
    <>
      <Navbar showsearch={true} />
      <main className="row m-0 py-1">
        <section className="col-md-3 py-4 px-5">
          <Filter finalData={finalData} setFilteredData={setFilteredData} />
        </section>
        <section className="col-md-9 bg-light rounded px-5 py-4">
          <h4 className="fw-medium mb-4">
            {finalData != null ? (
              <>
                <strong>Showing All Products </strong>
                <span className="fw-medium fs-6">
                  {" "}
                  ( Showing {filteredData.length} products )
                </span>
              </>
            ) : (
              <div className="spinner-border text-secondary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
          </h4>
          <div className="row justify-content-between gy-4">
            {filteredData != null
              ? filteredData.map((prodData) => (
                  <ProductCard key={prodData._id} productData={prodData} />
                ))
              : ""}
          </div>
        </section>
      </main>
    </>
  );
}

//This component is not in use anymore. This was initial approach (To make seperate pages for seperate category). 
// But the current approach is to use ProductListingPage component.