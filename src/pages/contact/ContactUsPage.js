import React from "react";
import NavBar from "../../components/navBar/NavBar";
import ContactUs from "../../components/contact/ContactUs";
import Footer from "../../components/footer/Footer";
import Appointment from "../../components/appointment/Appointment";
import Blogs from "../../components/blogs/Blogs";

export default function ContactUsPage() {
  return (
    <div>
      <NavBar />
      <ContactUs />
      <Appointment/>
      <Blogs/>
      {/* <LocationCard /> */}
      <Footer />
    </div>
  );
}
