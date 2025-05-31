import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import Filter from "../components/Filter";
import useFetch from "../useFetch";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ProductListingPage({ category }) {
  const url = `${API_BASE_URL}/products/by-category/${category}`;
  const { finalData } = useFetch(url);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // console.log(searchTerm);

  useEffect(() => {
    if (searchTerm.length > 0) {
      // console.log(filteredData);
      if (searchTerm == "ALLPRODUCTS") {
        setFilteredData(finalData.data.products);
        return;
      }
      let tempArr = finalData.data.products.filter((product) =>
        product.shortTitle.toLowerCase().includes(searchTerm)
      );
      setFilteredData(tempArr);
    }
  }, [searchTerm]);

  return (
    <>
      <Navbar showsearch={true} setSearchTerm={setSearchTerm} />
      <main className="row m-0 py-1">
        <section className="col-md-3 py-4 px-5">
          <Filter finalData={finalData} setFilteredData={setFilteredData} />
        </section>
        <section
          className="col-md-9 bg-light rounded px-5 py-4"
          style={{ minHeight: "53rem" }}
        >
          <h4 className="fw-medium mb-4">
            {finalData != null ? (
              <>
                <strong>Showing All Products </strong>
                <span className="fw-medium fs-6">
                  ( Showing {filteredData.length} products )
                </span>
              </>
            ) : (
              <div className="spinner-border text-secondary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
          </h4>
          <div className="row justify-content-between gy-4 px-3">
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
