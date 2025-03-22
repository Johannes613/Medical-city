import React from "react";
import medicalProducts from "../products/ProductList";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { MdStarHalf } from "react-icons/md";

export default function NewArrival() {
  return (
    <div className="products">
      <div className="container">
        <div className="row fac-head my-5">
          <div className="col">
            <p className="tag px-3 mx-auto text-uppercase">Latest</p>
            <h2 className="about-head fs-3">New Arrivals</h2>
          </div>
        </div>
        <div className="row mb-5">
          {medicalProducts.filter((pr)=> pr.id > 10).map((product) => (
            <div key={product.id} className="col-md-6 col-xl-4 col-xxl-3 mb-4">
              <div className="each-product">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-img"
                />
                <p className="text-uppercase add-btn my-auto">Add to cart</p>
              </div>
              <h5 className="mt-3 fw-semibold">{product.name}</h5>

              <p className="item-price fw-medium">
                ${product.price.toFixed(2)}{" "}
                <span className="fw-semibold ms-1">
                  <AiFillStar className="mb-1 ratings" />
                  <AiFillStar className="mb-1 ratings" />
                  <AiFillStar className="mb-1 ratings" />
                  <AiFillStar className="mb-1 ratings" />
                  <MdStarHalf className="mb-1 ratings" />
                  <span className="mb-1 ms-1 ratings">{product.rating}</span>
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
