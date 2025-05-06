import Navbar from "../components/Navbar";
import useFetch from "../useFetch";

export default function Cart() {

  const apiUrl = "https://shopping-site-backend-mocha.vercel.app/api/products/get-cart-items/cart";
  const { finalData } = useFetch(apiUrl);
  // console.log(finalData);

  return (
    <>
      <Navbar showsearch={false} />
    </>
  );
}
