import { NavLink } from "react-router-dom";

import { useState } from "react";

export default function Filter() {
  const [priceSliderValue, setPriceSliderValue] = useState(20000);

  function priceSliderHandler(e) {
    //   console.log(e.target.value);
    setPriceSliderValue(e.target.value);
  }
  return (
    <>
      <div className="d-flex justify-content-between">
        <h4 className="fw-medium">
          <strong>Filters</strong>
        </h4>
        <NavLink className="m-0 text-black lead">
          <strong>Clear</strong>
        </NavLink>
      </div>
      <div className="mt-4">
        <h4 className="fw-medium">
          <strong>Price</strong>
        </h4>
        <input
          type="range"
          className="form-range mt-3"
          onChange={priceSliderHandler}
          min="0"
          max="20000"
          value={priceSliderValue}
          step="1000"
        />
        <p>
          <em>
            <strong>
              Value: 0 {priceSliderValue > 0 ? `to ${priceSliderValue}` : ""}
            </strong>
          </em>
        </p>
      </div>
      <div className="mt-5">
        <h4 className="fw-medium mb-4">
          <strong>Rating</strong>
        </h4>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="ratingRadio"
          />
          <label className="form-check-label" for="radioDefault1">
            4 Stars & above
          </label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="ratingRadio" />
          <label className="form-check-label" for="radioDefault1">
            3 Stars & above
          </label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="ratingRadio" />
          <label className="form-check-label" for="radioDefault1">
            2 Stars & above
          </label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="ratingRadio" />
          <label className="form-check-label" for="radioDefault1">
            1 Star & above
          </label>
        </div>
      </div>
      <div className="mt-5">
        <h4 className="fw-medium mb-4">
          <strong>Sort By</strong>
        </h4>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="sortByRadio"
          />
          <label className="form-check-label" for="radioDefault1">
            Price - Low to High
          </label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="sortByRadio" />
          <label className="form-check-label" for="radioDefault1">
            Price - High to Low
          </label>
        </div>
      </div>
    </>
  );
}
