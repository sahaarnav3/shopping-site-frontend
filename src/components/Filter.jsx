import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Filter({ finalData, setFilteredData }) {
  const [priceSliderValue, setPriceSliderValue] = useState(50000);
  const [rating, setRating] = useState(0);
  const [sortBy, setSortBy] = useState(null);

  function clearHandler() {
    setPriceSliderValue(50000);
    setRating(0);
    setSortBy(null);
    setFilteredData([...finalData.data.products]);
  }

  const filterProductData = (currentSliderValue, currentRating, currentSortBy) => {
    setPriceSliderValue(currentSliderValue);
    setRating(currentRating);
    setSortBy(currentSortBy);
    if (finalData != null) {
      const tempData = finalData.data.products.filter((product) => {
        if (product.finalPrice < currentSliderValue && product.rating >= currentRating)
          return product;
      });
      // console.log("tempdata-", tempData);
      let finalTempArray
      if(currentSortBy == 'ascending')
        finalTempArray = tempData.sort((a, b) => a.finalPrice - b.finalPrice);
      else if (currentSortBy == 'descending')
        finalTempArray = tempData.sort((a, b) => b.finalPrice - a.finalPrice);
      else 
        finalTempArray = tempData;
      setFilteredData([...finalTempArray]);
    }
  }

  useEffect(() => {
    const timeOut = setTimeout(() => {
      filterProductData(50000, rating, sortBy);
    }, 0);
    return () => clearTimeout(timeOut);
  }, [finalData]);

  return (
    <>
      <div className="d-flex justify-content-between">
        <h4 className="fw-medium">
          <strong>Filters</strong>
        </h4>
        <NavLink className="m-0 text-black lead" onClick={clearHandler}>
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
          onChange={(e) => {filterProductData(e.target.value, rating, sortBy)}}
          min="0"
          max="50000"
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
            value="4"
            onChange={(e) => {filterProductData(priceSliderValue, e.target.value, sortBy)}}
            checked={rating === "4" ? true : false}
          />
          <label className="form-check-label">4 Stars & above</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="ratingRadio"
            value="3"
            onChange={(e) => {filterProductData(priceSliderValue, e.target.value, sortBy)}}
            checked={rating === "3" ? true : false}
          />
          <label className="form-check-label">3 Stars & above</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="ratingRadio"
            value="2"
            onChange={(e) => {filterProductData(priceSliderValue, e.target.value, sortBy)}}
            checked={rating === "2" ? true : false}
          />
          <label className="form-check-label">2 Stars & above</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="ratingRadio"
            value="1"
            onChange={(e) => {filterProductData(priceSliderValue, e.target.value, sortBy)}}
            checked={rating === "1" ? true : false}
          />
          <label className="form-check-label">1 Star & above</label>
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
            onChange={() => {filterProductData(priceSliderValue, rating, 'ascending')}}
            checked={sortBy === "ascending" ? true : false}
          />
          <label className="form-check-label">Price - Low to High</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="sortByRadio"
            onChange={() => {filterProductData(priceSliderValue, rating, 'descending')}}
            checked={sortBy === "descending" ? true : false}
          />
          <label className="form-check-label">Price - High to Low</label>
        </div>
      </div>
    </>
  );
}
