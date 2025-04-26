import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import useFetch from "../useFetch";

export default function ProductDetails() {
  const productId = useParams().prodId;
  const apiUrl = `https://shopping-site-backend-mocha.vercel.app/api/products/${productId}`;
  const { finalData, loading } = useFetch(apiUrl);
  console.log(finalData);

  return (
    <>
      <Navbar showsearch={false} />
      <main className="bg-body-tertiary py-4">
        <section className="container bg-white" style={{width: "75%"}}>
            now work in rows and columns.
        </section>
      </main>
    </>
  );
}
