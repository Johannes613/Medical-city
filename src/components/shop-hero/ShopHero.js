import React from "react";
import "./ShopHero.css";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import { carouselSlides } from "./shopList";


export default function ShopHero() {
  return (
    <div className="hero position-relative w-100">
      <div className="container-fluid p-0">
        <Carousel fade>
          {carouselSlides.map((slide) => (
            <Carousel.Item key={slide.id}>
              <img
                className="d-block w-100 vh-100"
                src={slide.image}
                alt={slide.title}
              />
              <div className="over-lay text-center text-md-start">
                <div className="content col-12 col-md-10 col-lg-7">
                  <p className="tag px-3">{slide.feature}</p>
                  <h1 className="">{slide.title}</h1>
                  <p className="mt-4 desc">{slide.description}</p>
                  <Button className="mt-4 contact-btn px-4 py-2" variant="primary">
                    {slide.buttonText}
                  </Button>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
