import React, { useContext, useEffect, useState } from "react";
import NavBar from "../../components/navBar/NavBar";
import { TiHome } from "react-icons/ti";
import { MdArrowForwardIos } from "react-icons/md";
import backImg from "../../images/background-imgs/image.png";
import ListGroup from "react-bootstrap/ListGroup";
import { GlobalContext } from "../../context/GlobalContext";
import { Button, Card, ToastContainer } from "react-bootstrap";
import { toast } from "react-toastify";
import {doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import Footer from "../../components/footer/Footer";

export default function CheckOut() {
  const {
    grandTotal,
    cartItems,
    fetchCartItems,
    currentUser,
    handleCost,
  } = useContext(GlobalContext);
  const [deliveryFee,setDeliveryFee] = useState(10)

  useEffect(() => {
    if (currentUser) {
      fetchCartItems();
    }
  }, [currentUser]);

  useEffect(() => {
    handleCost();
  }, [cartItems]);

  const clearCart = async () => {
    const docRef = doc(db, "userCart", currentUser);
    await updateDoc(docRef, {
      cart: [],
    });
    fetchCartItems();
    setDeliveryFee(0)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearCart();
    toast.success("Order Confirmend");
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={true}
        closeButton
      />
      <div className="checkout">
        <NavBar />
        <div className="contact-us">
          <div className="back-img">
            <img src={backImg} alt="" />
          </div>
          <div className="head-contact">
            <h1 className="fw-semibold me-auto mt-5 pt-5">Check Out</h1>
            <div className="nav-contact text-uppercase">
              <span className="gray-span">
                <TiHome className="fs-5 mb-1" /> Shopping{" "}
              </span>{" "}
              <span className="prim">
                <MdArrowForwardIos className="mb-1" /> Check Out
              </span>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row my-5">
            <div className="mt-5 d-flex justify-content-center border-0 col-12 col-lg-6">
              <div className="w-100 py-5 px-4 mx-3 rounded shadow">
                <h2 className="mb-4 fw-semibold">Delivery Information</h2>
                <form onSubmit={handleSubmit}>
                  <div className="row mb-3">
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="First name"
                        required
                      />
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Last name"
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email address"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Street"
                      required
                    />
                  </div>
                  <div className="row mb-3">
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="City"
                        required
                      />
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="State"
                        required
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Zip code"
                        required
                      />
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Country"
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Phone number"
                      required
                    />
                  </div>
                  <Button
                    className="contact-btn mt-2 px-5 py-2"
                    variant="primary"
                    type="submit"
                  >
                    Place Order
                  </Button>
                </form>
              </div>
            </div>
            <div className="row cart-summary mt-5 pt-5 col-12 col-lg-5 mx-auto">
              <div className=" ms-auto mt-5 mx-3 shadow p-0 outliner-payment ">
                <Card style={{ border: "none" }}>
                  <Button
                    className="contact-btn px-4 py-2"
                    variant="primary"
                    id="place-order"
                  >
                    Total Payment
                  </Button>
                  <ListGroup variant="flush" className="p-2">
                    <ListGroup.Item className="d-flex justify-content-between flush-mat pb-0 ps-0">
                      <p className="fw-semibold">Total:</p>
                      <p>${grandTotal.toFixed(2)}</p>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between flush-mat pb-0 ps-0">
                      <p className="fw-semibold">Delivery Fee:</p>
                      <p>${deliveryFee.toFixed(2)}</p>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between flush-mat pb-0 ps-0">
                      <p className="fw-semibold">Grand Total:</p>
                      <p className="fs-5 fw-semibold">
                        ${(grandTotal + deliveryFee).toFixed(2)}
                      </p>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
