import Navbar from "../components/Navbar";

import useProductContext from "../contexts/ProductContext";
import ProductCard from "../components/ProductCard";

export default function Wishlist() {
  const { wishlistItems } = useProductContext();
  console.log(wishlistItems);

  return (
    <>
      <Navbar showsearch={false} />
      <main className="bg-light pb-5">
        <section className="container py-4">
          <h4 className="text-center">
            <strong>My Wishlist</strong>
          </h4>
          <div className="row justify-content-between gy-4 mt-3 mb-5">
            {wishlistItems != null
              ? wishlistItems.data.product.map((prodData) => (
                  <ProductCard key={prodData._id} productData={prodData} />
                ))
              : ""}
          </div>
        </section>
      </main>
    </>
  );
}
