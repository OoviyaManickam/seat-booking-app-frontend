import React from "react";
import "./Login.js";
import "./Register.js";
import Layout from "./Layout.js";
import Slideshow from "../Components/Slideshow.js";
import AnimatedText from "../Components/AnimatedText.js";
import EventsByCategory from "../Components/EventsByCategory.js";
import Footer from "../Components/Footer.js";
import FilterComponent from "../Components/Filter.js";

function HomePage() {
  return (
    <div className="Home">
      <Layout />
      <Slideshow />
      <AnimatedText />
      <FilterComponent />
      <EventsByCategory category="movie" />
      <EventsByCategory category="event" />
      <EventsByCategory category="concert" />
      <Footer />
    </div>
  );
}

export default HomePage;
