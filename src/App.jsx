import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductProvider } from "./contexts/ProductContext";
import './App.css';

import Home from "./pages/Home";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
// import Men from "./pages/Men";
// import Women from "./pages/Women"; this was the initial approach to different pages.
import ProductDetails from "./pages/ProductDetails";
import ProductListingPage from "./pages/ProductListingPage";
import Profile from "./pages/Profile";

function App() {
  return (
    <ProductProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/men" element={<ProductListingPage category={"men"} />} />
          <Route path="/women" element={<ProductListingPage category={"women"} />} />
          <Route path="/kids" element={<ProductListingPage category={"kids"} />} />
          <Route path="/electronics" element={<ProductListingPage category={"electronics"} />} />
          <Route path="/product-details/:prodId" element={<ProductDetails />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </ProductProvider>
  );
}

export default App;
