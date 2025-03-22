import React from "react";
import ShopHero from "../../components/shop-hero/ShopHero";
import NavBar from "../../components/navBar/NavBar";
import Products from "../../components/products/Products";
import Blogs from "../../components/blogs/Blogs";
import EmailSub from "../../components/email-subscription/EmailSub";
import NewArrival from "../../components/new-arrival/NewArrival";
import Footer from "../../components/footer/Footer";

export default function ShoppingPage() {
  return (
    <div className="shopping-page">
      <NavBar />
      <ShopHero />
      <Products />
      <EmailSub />
      <NewArrival />
      <Blogs />
      <Footer />
    </div>
  );
}
