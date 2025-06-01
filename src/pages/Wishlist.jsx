import Navbar from "../components/Navbar";

import ProductCard from "../components/ProductCard";

import useFetch from "../useFetch";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Wishlist() {
  const { finalData: wishlistItems } = useFetch(
    `${API_BASE_URL}/products/wishlist_items/wishlist`
  );

  return (
    <>
      <Navbar showsearch={false} />
      <main className="bg-body-secondary pb-5" style={{ minHeight: "54em", minWidth: "22em" }}>
        <section className="container py-4">
          <h4 className="text-center">
            <strong>My Wishlist</strong>
          </h4>
          <div className="container d-flex flex-wrap justify-content-start gy-4 mt-4 mb-5"> 
            {wishlistItems != null
              ? wishlistItems.data.product.map((prodData) => (
                  <div className="my-2 mx-3" key={prodData._id}>
                    <ProductCard productData={prodData} />
                  </div>
                ))
              : <h2>Loading...</h2>}
          </div>
        </section>
      </main>
    </>
  );
}
