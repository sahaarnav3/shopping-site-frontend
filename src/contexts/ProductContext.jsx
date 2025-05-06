import { createContext, useContext } from "react";
import useFetch from "../useFetch";

const ProductContext = createContext();

const useProductContext = () => useContext(ProductContext);
export default useProductContext;

export function ProductProvider({ children }) {
  const wishlistApi =
    "https://shopping-site-backend-mocha.vercel.app/api/products/wishlist-items/wishlist";
  const cartItemsApi =
    "https://shopping-site-backend-mocha.vercel.app/api/products/get-cart-items/cart";
  const { finalData: wishlistItemsData } = useFetch(wishlistApi);
  const { finalData: cartItemsData } = useFetch(cartItemsApi);
  return (
    <ProductContext.Provider
      value={{ wishlistItems: wishlistItemsData, cartItems: cartItemsData }}
    >
      {children}
    </ProductContext.Provider>
  );
}

//Remember to use state variables now to store cart items, so they get updated by itself.
