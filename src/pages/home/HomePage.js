import React from "react";
import NavBar from "../../components/navBar/NavBar";
import Hero from "../../components/hero/Hero";
import About from "../../components/about/About";
import Facilties from "../../components/facilities/Facilties";
import Success from "../../components/success/Success";
import Services from "../../components/services/Services";
import ContactUsAd from "../../components/contact-ad/ContactUsAd";
import Appointment from "../../components/appointment/Appointment";
// import OurTeam from "../../components/our-team/OurTeam";
import Testimonial from "../../components/testimonials/Testimonial";
import Blogs from "../../components/blogs/Blogs";
import Premium from "../../components/premium/Premium";
import Footer from "../../components/footer/Footer";


export default function HomePage() {
  return (
    <div>
      <NavBar />
      <Hero />
      <About />
      <Facilties />
      <Success />
      <Services />
      <ContactUsAd />
      <Testimonial />
      <Blogs/>
      {/* <OurTeam /> */}
      <Premium/>
      <Appointment />
      <Footer/>
    </div>
  );
}
