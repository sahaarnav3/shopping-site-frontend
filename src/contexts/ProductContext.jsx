import { createContext, useContext, useEffect, useState } from "react";
import useFetch from "../useFetch";

const ProductContext = createContext();

const useProductContext = () => useContext(ProductContext);
export default useProductContext;

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function ProductProvider({ children }) {
  const [wishlistItemCount, setWishlistItemCount] = useState(0);
  const [cartItemCount, setCartItemCount] = useState(0);

  const wishlistApi = `${API_BASE_URL}/products/wishlist-items/wishlist`;
  const cartItemsApi = `${API_BASE_URL}/products/get-cart-items/cart`;

  const { finalData: wishlistItemsData } = useFetch(wishlistApi);
  const { finalData: cartItemsData } = useFetch(cartItemsApi);

  useEffect(() => {
    if (wishlistItemsData)
      setWishlistItemCount(wishlistItemsData.data.product.length);
  }, [wishlistItemsData]);

  useEffect(() => {
    if (cartItemsData) {
      let temp = cartItemsData.cartItems.reduce(
        (acc, curr) => acc + curr.addedToCart.length,
        0
      );
      setCartItemCount(temp);
    }
  }, [cartItemsData]);
  return (
    <ProductContext.Provider
      value={{
        wishlistItems: wishlistItemsData,
        cartItems: cartItemsData,
        wishlistItemCount,
        setWishlistItemCount,
        cartItemCount,
        setCartItemCount,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
