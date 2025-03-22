import "./SignIn.css";
import React, { useContext, useRef, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { toast, ToastContainer } from "react-toastify";
import { GlobalContext } from "../../context/GlobalContext";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export default function SignIn() {
  const [accState, setAccState] = useState("Sign-in");
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  const [show, setShow] = useState(false);
  const {currentUser } = useContext(GlobalContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formDatas = new FormData(formRef.current);
    const { email, password } = Object.fromEntries(formDatas.entries());
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await setDoc(doc(db, "userCart", user.uid), {
        cart: [],
      });
      setShow(false);
      toast.success("Account created successfully");
    } catch (error) {
      const errorMessage = error.message;
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };


  const handleLogOut = async () => {
    try {
      await signOut(auth);
      toast.success("User logged Out!");
    } catch (error) {
      toast.error(error.message);
    }
  };


  
  const handleLogIn = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formDatas = new FormData(formRef.current);
    const { email, password } = Object.fromEntries(formDatas.entries());
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      toast.success("User Logged in!");
      setShow(false);
    } catch (error) {
      const errorMessage = error.message;
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row">
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={true}
        closeButton
      />

      <Button
        variant="primary"
        onClick={currentUser ? handleLogOut : handleShow}
        className="fw-bold"
      >
        {currentUser
          ? "SignOut"
          : accState === "Sign-in"
          ? "Sign In"
          : "Sign Up"}
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        centered
        className="custom-modal"
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" className="fw-bold">
            {accState} to Medicate Hospital
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form ref={formRef}>
            {accState === "Sign-up" && (
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  name="username"
                  required
                />
              </Form.Group>
            )}

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                name="password"
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer className="border-0 d-flex justify-content-center">
          <Button
            variant="secondary"
            onClick={handleClose}
            className="fw-bold me-2"
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={accState === "Sign-up" ? handleSignUp : handleLogIn}
            disabled={loading}
            className="fw-bold"
          >
            {loading
              ? "Loading . . ."
              : accState === "Sign-up"
              ? "Create Account"
              : "Sign in"}
          </Button>
        </Modal.Footer>

        <div className="text-center p-3 fw-semibold">
          {accState === "Sign-up" ? (
            <p>
              Already have an account?{" "}
              <span
                className="text-primary"
                onClick={() => setAccState("Sign-in")}
                style={{ cursor: "pointer" }}
              >
                Sign In
              </span>
            </p>
          ) : (
            <p>
              Don't have an account?{" "}
              <span
                className="text-primary"
                onClick={() => setAccState("Sign-up")}
                style={{ cursor: "pointer" }}
              >
                Sign Up
              </span>
            </p>
          )}
        </div>
      </Modal>
    </div>
  );
}
