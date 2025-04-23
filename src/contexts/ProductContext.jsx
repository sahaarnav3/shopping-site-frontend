import { createContext, useContext } from "react";
import useFetch from "../useFetch";

const ProductContext = createContext();

const useProductContext = () => useContext(ProductContext);
export default useProductContext;

export function ProductProvider({ children }) {
    const api = "https://shopping-site-backend-mocha.vercel.app/api/products/wishlist-items/wishlist";
  const { finalData } = useFetch(api);

    return(
        <ProductContext.Provider value={{ wishlistItems:finalData }}>
            {children}
        </ProductContext.Provider>
    )
}

//Remember to use state variables now to store cart items, so they get updated by itself.