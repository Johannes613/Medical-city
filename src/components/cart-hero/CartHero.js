import React from "react";
import { TiHome } from "react-icons/ti";
import { MdArrowForwardIos } from "react-icons/md";
import backImg from "../../images/background-imgs/image.png"


export default function CartHero() {
  return (
    <div className="contact-us">
        <div className="back-img">
        <img src = {backImg}   alt="" />
        </div>
      <div className="head-contact">
        <h1 className="fw-semibold me-auto mt-5 pt-5">Cart</h1>
        <div className="nav-contact text-uppercase">
          <span className="gray-span"><TiHome className="fs-5 mb-1" /> Home </span> <span className="prim"><MdArrowForwardIos className="mb-1"/> cart</span>
        </div>
      </div>
    </div>
  );
}
