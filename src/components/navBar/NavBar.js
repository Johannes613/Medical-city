import React, { useContext, useEffect, useState } from "react";
import "./NavBar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../images/log.png";
import SignIn from "../signIn/SignIn";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Badge, { badgeClasses } from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";
import { GlobalContext } from "../../context/GlobalContext";
import { db } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function NavBar() {
  const {currentUser, numOfItems,setNumOfItems} = useContext(GlobalContext);
  const CartBadge = styled(Badge)`
    & .${badgeClasses.badge} {
      top: -12px;
      right: -6px;
    }
  `;
   const fetchCartItems = async () => {
      if(currentUser){
      const docRef = doc(db, "userCart", currentUser);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        const data = docSnap.data();
        setNumOfItems(data?.cart?.length)
      } else {
        console.log("No such document!");
      }
      }
      else{
        console.log("pt")
      }
      
    };
    useEffect(()=>{
   fetchCartItems();   
    })
  return (
    <div className="nav-bar">
      <Navbar expand="lg" className="nav-boot bg-body-tertiary">
        <Container>
          <Navbar.Brand>
            <Link to="/" className="nav-link home">
              <img className="logo-img" src={logo} alt="Logo" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav text-center">
            <Nav className="gap-5 mx-auto ">
              <Link to="/" className="nav-link fw-medium">
                Home
              </Link>
              <Link to="/shopping" className="nav-link  fw-medium">
                Shopping
              </Link>
              <Link to="/contact" className="nav-link  fw-medium">
                Contact
              </Link>
              <Link to="/" className="nav-link  fw-medium">
                Testimonials
              </Link>
              <Link to="/" className="nav-link  fw-medium">
                Services
              </Link>
            </Nav>
            <div className="d-flex align-items-center justify-content-center gap-5">
              {currentUser ? (
                <Link to="/cart" className="nav-link">
                  {" "}
                  <IconButton>
                    <ShoppingCartIcon fontSize="small" />
                    <CartBadge
                      badgeContent={numOfItems}
                      color="primary"
                      overlap="circular"
                    />
                  </IconButton>
                </Link>
              ) : (
                <></>
              )}
              <SignIn />
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
