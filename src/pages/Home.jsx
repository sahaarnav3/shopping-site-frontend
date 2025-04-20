import Navbar from "../components/Navbar";
import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Navbar showsearch={true} />
      <main className="bg-body-secondary">
        <section className="container py-5">
          <div className="row text-center">
            {/* https://images.unsplash.com/photo-1507680434567-5739c80be1ac?q=80&w=300 you can set width and quality. */}
            <NavLink className="col-md-3 text-decoration-none position-relative my-3" to="/men">
              <img
                src="https://images.unsplash.com/photo-1507680434567-5739c80be1ac"
                alt="men_banner"
                className="img-fluid rounded"
              />
              <h5
                className="text-secondary bg-white py-1 position-absolute top-50 start-50 translate-middle"
                style={{ width: "93%" }}
              >
                <strong>Men</strong>
              </h5>
            </NavLink>
            <NavLink className="col-md-3 text-decoration-none position-relative my-3">
              <img
                src="https://images.unsplash.com/photo-1506152983158-b4a74a01c721"
                alt="men_banner"
                className="img-fluid rounded"
              />
              <h5
                className="text-secondary bg-white py-1 position-absolute top-50 start-50 translate-middle"
                style={{ width: "93%" }}
              >
                <strong>Women</strong>
              </h5>
            </NavLink>
            <NavLink className="col-md-3 text-decoration-none position-relative my-3">
              <img
                src="https://images.unsplash.com/photo-1574681357916-9d4464642696"
                alt="men_banner"
                className="img-fluid rounded"
              />
              <h5
                className="text-secondary bg-white py-1 position-absolute top-50 start-50 translate-middle"
                style={{ width: "93%" }}
              >
                <strong>Kids</strong>
              </h5>
            </NavLink>
            <NavLink className="col-md-3 text-decoration-none position-relative my-3">
              <img
                src="https://images.unsplash.com/photo-1619644213422-44a8c6f01d4a"
                alt="men_banner"
                className="img-fluid rounded"
              />
              <h5
                className="text-secondary bg-white py-1 position-absolute top-50 start-50 translate-middle"
                style={{ width: "93%" }}
              >
                <strong>Electronics</strong>
              </h5>
            </NavLink>
          </div>
          <div className="my-3">
            <img
              src="https://placehold.co/1500x600?text=Welcome to,\nMyShoppingSite"
              alt="home-banner"
              className="img-fluid rounded"
            />
          </div>
          <div className="row justify-content-between px-2">
            <div className="col-md-6">
              <div
                className="d-flex bg-dark-subtle p-5 my-3 rounded"
                style={{ width: "auto" }}
              >
                <div
                  className="bg-white"
                  style={{ width: "13em", height: "13em" }}
                ></div>
                <div className="d-flex flex-column justify-content-between ps-5">
                  <p>NEW ARRIVALS</p>
                  <div>
                    <h4>Summer Collection</h4>
                    <p className="m-0">
                      Check out our best summer collection to stay cool in style
                      this season.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div
                className="col-md-6 d-flex bg-dark-subtle p-5 my-3 rounded"
                style={{ width: "auto" }}
              >
                <div
                  className="bg-white"
                  style={{ width: "13em", height: "13em" }}
                ></div>
                <div className="d-flex flex-column justify-content-between ps-5">
                  <p>NEW ARRIVALS</p>
                  <div>
                    <h4>Winter Collection</h4>
                    <p className="m-0">
                      Check out our best winter collection to stay warm in style
                      this season.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
