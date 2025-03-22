import React, { useEffect } from "react";
import CartHero from "../../components/cart-hero/CartHero";
import NavBar from "../../components/navBar/NavBar";
import NewArrival from "../../components/new-arrival/NewArrival";
import MainCart from "../../components/main-cart/MainCart";
import Footer from "../../components/footer/Footer";

export default function CartPage() {
  useEffect(() => {
    window.scrollTo(0, 100);
  }, []);
  return (
    <div>
      <NavBar />
      <CartHero />
      <MainCart />
      <NewArrival />
      <Footer />
    </div>
  );
}
