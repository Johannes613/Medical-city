import React from "react";
import "./ContactUs.css";
import { TiHome } from "react-icons/ti";
import { MdArrowForwardIos } from "react-icons/md";
import backImg from "../../images/background-imgs/image.png"
import NavBar from "../navBar/NavBar";

export default function ContactUs() {
  return (
    <div className="contact-us">
        <div className="back-img">
        <img src = {backImg}   alt="" />
        </div>
      <div className="head-contact">
        <h1 className="fw-semibold mt-5 pt-5">Contact Us</h1>
        <div className="nav-contact text-uppercase">
          <span className="gray-span"><TiHome className="mb-1 fs-5" /> Home </span> <span className="prim"><MdArrowForwardIos className="mb-1"/> contact us</span>
        </div>
      </div>
    </div>
  );
}
