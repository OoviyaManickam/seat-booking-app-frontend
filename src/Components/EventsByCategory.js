import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";

const containerStyle = {
  padding: "90px", 
  marginBottom: "-80px",
};

const cardStyle = {
  width: "250px",
  height: "100%", 
  display: "flex",
  flexDirection: "column",
  margin: "0 50px", 
  position: "relative", 
  borderRadius: "15px",
  overflow: "hidden",
  transition: "transform 0.3s ease-in-out", 
};

const cardMediaStyle = {
  height: "300px", 
};

const dateBannerStyle = {
  position: "absolute",
  top: "10px",
  left: "10px",
  backgroundColor: "#820000",
  color: "white",
  padding: "5px 10px",
  borderRadius: "5px",
  fontWeight: "bold",
};

const headingStyle = {
  marginBottom: "50px", 
  color: "white", 
};

const carouselResponsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const EventsByCategory = ({ category }) => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleCardClick = (event) => {
    navigate(`/event/${event.title}`, { state: { event } });
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/event/category?category=${category}`
        );
        setEvents(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEvents();
  }, [category]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={containerStyle}>
      <Typography variant="h4" style={headingStyle} gutterBottom>
        {category.charAt(0).toUpperCase() + category.slice(1)}s
      </Typography>
      {events.length === 0 ? (
        <Typography>No events found</Typography>
      ) : (
        <Carousel
          responsive={carouselResponsive}
          swipeable={true}
          draggable={true}
          showDots={false}
          infinite={true}
          keyBoardControl={true}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          itemClass="carousel-item-padding-40-px"
        >
          {events.map((event) => (
            <Card
              key={event.eventId}
              onClick={() => handleCardClick(event)}
              style={cardStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.borderRadius = "15px";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.borderRadius = "15px";
              }}
            >
              <CardMedia
                component="img"
                style={cardMediaStyle}
                image={event.imageUrl}
                alt={event.title}
              />
              {(category === "concert" || category === "event") &&
                event.venues[0].slots[0].date && (
                  <Box style={dateBannerStyle}>
                    {new Date(event.venues[0].slots[0].date).toLocaleString(
                      "default",
                      { day: "numeric", month: "short" }
                    )}
                  </Box>
                )}
              <CardContent
                style={{
                  height: "90px",
                  backgroundColor: "#820000",
                  color: "white",
                }}
              >
                <Typography variant="h5">{event.title}</Typography>
                <Typography variant="body2" color="white">
                  Language: {event.language}
                </Typography>
                <Typography variant="body2" color="white">
                  Genre: {event.genre}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default EventsByCategory;
