import React, { useContext, useEffect, useState } from "react";
import medicalProducts from "./ProductList";
import "./MainCart.css";
import { MdCancel } from "react-icons/md";
import { FiMinus } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { GlobalContext } from "../../context/GlobalContext";
import { db } from "../../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function MainCart() {
  const {
    cartItems,
    setCartItems,
    currentUser,
    subTotal,
    grandTotal,
    setGrandTotal,
    setSubTotal,
    fetchCartItems,
    handleCost,
  } = useContext(GlobalContext);

  console.log("cartItems",cartItems)
  console.log("filterd",medicalProducts.filter((prod) => cartItems.some((item) => item.id === prod.id)));
  useEffect(() => {
    if (currentUser) {
      fetchCartItems();
    }
  }, [currentUser]);

  useEffect(() => {
    handleCost();
  }, [cartItems]);

  const handleIncrement = async (itemId) => {
    const updatedCartList = cartItems.map((eachItem) => {
      if (eachItem.id === itemId)
        return { id: itemId, amount: eachItem.amount + 1 };
      else return eachItem;
    });
    const docRef = doc(db, "userCart", currentUser);
    await updateDoc(docRef, {
      cart: updatedCartList, // Updating the cart array in Firestore
    });

    fetchCartItems();
  };

  const handleDecrement = async (itemId) => {
    const updatedCartList = cartItems.map((eachItem) => {
      if (eachItem.id === itemId && eachItem.amount > 1)
        return { id: itemId, amount: eachItem.amount - 1 };
      else return eachItem;
    });
    const docRef = doc(db, "userCart", currentUser);
    await updateDoc(docRef, {
      cart: updatedCartList, // Updating the cart array in Firestore
    });

    fetchCartItems();
  };
  const handleRemoveItem = async (itemId) => {
    const updatedCartList = cartItems.filter(
      (eachItem) => eachItem.id !== itemId
    );
    const docRef = doc(db, "userCart", currentUser);
    await updateDoc(docRef, {
      cart: updatedCartList, // Updating the cart array in Firestore
    });

    fetchCartItems();
  };
  return (
    <div className="main-cart mt-5 pt-3">
      <div className="container">
        <div clafssName="row fac-head mb-5">
          <div className="col">
            <p className="text-uppercase mx-auto px-3 tag">Cart</p>
            <h1 className="about-head fs-3">Your Cart</h1>
          </div>
        </div>
        <div className="row border-bottom fs-5 fw-semibold mt-5">
          <div className="col">Item</div>
          <div className="col">Price</div>
          <div className="col">Quantity</div>
          <div className="col">Total</div>
        </div>

        {cartItems.length ? (
          medicalProducts
            .filter((prod) => cartItems.some((item) => item.id === prod.id))
            .map((item) => {
              return (
                <div className="row" key={item.id}>
                  <div className="col d-flex flex-column align-items-center border-bottom justify-content-center gap-1 item-cart">
                    <img src={item.image} className="" alt={item.name} />
                    <p className="fw-semibold mb-1">{item.name}</p>
                  </div>

                  <div className="col d-flex align-items-center border-bottom justify-content-center ind-price">
                    ${item.price.toFixed(2)}
                  </div>

                  <div className="col d-flex align-items-center border-bottom justify-content-center">
                    <div className="d-flex align-items-center justify-content-between ctrl-btn">
                      <button
                        className="inc-dec"
                        onClick={() => handleDecrement(item.id)}
                      >
                        <FiMinus />
                      </button>

                      <button className="cart-value">
                        {(
                          cartItems.find((eachItem) => eachItem.id === item.id)
                            ?.amount || 0
                        )}
                      </button>

                      <button
                        className="inc-dec"
                        onClick={() => handleIncrement(item.id)}
                      >
                        <GoPlus />
                      </button>
                    </div>
                  </div>

                  <div className="col d-flex align-items-center border-bottom justify-content-center fs-5 fw-semibold">
                    $
                    {(
                      cartItems.find((eachItem) => eachItem.id === item.id)
                        ?.amount * item.price || 0
                    ).toFixed(2)}
                    <MdCancel
                      onClick={() => handleRemoveItem(item.id)}
                      className="cancel-btn ms-2"
                    />
                  </div>
                </div>
              );
            })
        ) : (
          <p className="mt-5">Your Cart is Empty!</p>
        )}

        <div className="row cart-summary mt-5">
          <div className="col-lg-4 col-md-6 ms-auto mt-5">
            <Card style={{ border: "none" }}>
              <ListGroup variant="flush" className="">
                <ListGroup.Item className="d-flex justify-content-between flush-mat pb-0 ps-0">
                  <p className="fw-semibold">SubTotal:</p>
                  <p>${subTotal.toFixed(2)}</p>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between flush-mat pb-0 ps-0">
                  <p className="fw-semibold">Sales Tax {"(15%)"}:</p>
                  <p>${(subTotal * 0.15).toFixed(2)}</p>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between flush-mat pb-0 ps-0">
                  <p className="fw-semibold">Grand Total:</p>
                  <p className="fs-5 fw-semibold">${grandTotal.toFixed(2)}</p>
                </ListGroup.Item>

                <Link
                  to={subTotal == 0 ? "" : "/checkout"}
                  className="contact-btn mt-4 px-4 py-2"
                  variant="primary"
                  type="button"
                  id="white-color"
                >
                  Check out
                </Link>
              </ListGroup>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
