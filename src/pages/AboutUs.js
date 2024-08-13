import React from "react";
import { Button, Box, Typography, Container, Grid } from "@mui/material";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import movieAnimation from "../assets/movie-animation.json";
import popcornAnimation from "../assets/popcorn-animation.json";
import Layout from "./Layout";
import Footer from "../Components/Footer";

const AboutUs = () => {
  return (
    <div>
      <Layout />
      <Container
        sx={{ backgroundColor: "black", minHeight: "100vh", padding: 4 }}
      >
        <Typography variant="h2" align="center" color="red" gutterBottom>
          About Us
        </Typography>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Lottie
              animationData={movieAnimation}
              loop={true}
              style={{ width: "100%", height: "auto" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                backgroundColor: "rgba(255, 0, 0, 0.1)",
                borderRadius: 10,
                boxShadow: 3,
                padding: 4,
                textAlign: "center",
              }}
            >
              <Typography variant="h2" color="red" gutterBottom>
                Let's Book
              </Typography>
              <Typography variant="body1" color="white" paragraph>
                Our platform is dedicated to providing an exceptional booking
                experience. Whether you are planning to attend a concert, movie,
                or any event, we ensure you get the best seats in the house!
              </Typography>
              <Typography variant="body1" color="white" paragraph>
                We strive to make your experience seamless and enjoyable,
                focusing on user satisfaction and convenience. Join us and start
                booking your next experience today!
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ marginTop: 8 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  backgroundColor: "rgba(255, 0, 0, 0.1)",
                  borderRadius: 10,
                  boxShadow: 3,
                  padding: 4,
                  textAlign: "center",
                }}
              >
                <Typography variant="h2" color="red" gutterBottom>
                  Enjoy the Shows!
                </Typography>
                <Typography variant="body1" color="white" paragraph>
                  Join us for an unforgettable experience! Our platform makes it
                  easy to find and book the best seats for your favorite events.
                </Typography>
                <Link to="/" style={{ textDecoration: "none" }}>
                  <Button variant="contained" color="error" sx={{ mt: 2 }}>
                    Book Seats Now
                  </Button>
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Lottie
                animationData={popcornAnimation}
                loop={true}
                style={{ width: "100%", height: "auto" }}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Footer />
    </div>
  );
};

export default AboutUs;
