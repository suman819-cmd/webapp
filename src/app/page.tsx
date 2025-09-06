"use client";
import Navbar  from "./navbar/page";
import HeroSection from "./herosection/page";
import Story from "./story/page";
import MenuPage from "./ourmenu/page";
import ServicesPage from "./ourservices/page";
import ContactPage from "./contact/page";
import Footer from "./footer/page";

export default function Home() {
  return (
    <>
      <Navbar/>
      <HeroSection/>
      <Story/>
      <MenuPage/>
      <ServicesPage/>
      <ContactPage/>
      <Footer/>
    </>

  )
}