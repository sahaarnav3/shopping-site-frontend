import { createContext, useContext, useEffect, useState } from "react";
import useFetch from "../useFetch";

const ProductContext = createContext();

const useProductContext = () => useContext(ProductContext);
export default useProductContext;

export function ProductProvider({ children }) {
  const [wishlistItemCount, setWishlistItemCount] = useState(0);
  const [cartItemCount, setCartItemCount] = useState(0);

  const wishlistApi =
    "https://shopping-site-backend-mocha.vercel.app/api/products/wishlist-items/wishlist";
  const cartItemsApi =
    "https://shopping-site-backend-mocha.vercel.app/api/products/get-cart-items/cart";
  const { finalData: wishlistItemsData } = useFetch(wishlistApi);
  const { finalData: cartItemsData } = useFetch(cartItemsApi);

  useEffect(() => {
    if (wishlistItemsData)
      setWishlistItemCount(wishlistItemsData.data.product.length);
  }, [wishlistItemsData]);

  useEffect(() => {
    if (cartItemsData){
      let temp = cartItemsData.cartItems.reduce((acc, curr) => acc + curr.addedToCart.length, 0);
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
        setCartItemCount
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}