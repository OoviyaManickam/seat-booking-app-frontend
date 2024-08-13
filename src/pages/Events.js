import { useState } from "react";
import Layout from "./Layout.js";
import EventsByCategory from "../Components/EventsByCategory.js";
import Footer from "../Components/Footer.js";
import Lottie from "lottie-react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LanguageIcon from "@mui/icons-material/Language";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PlaceIcon from "@mui/icons-material/Place";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import discoAnimation from "../assets/disco-animation.json";

const Events = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("");
  const [date, setDate] = useState("");
  const [venueName, setVenueName] = useState("");
  const [location, setLocation] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchInitiated, setSearchInitiated] = useState(false);
  const [titleError, setTitleError] = useState("");
  const [locationError, setLocationError] = useState("");

  const navigate = useNavigate();

  const handleCardClick = (event) => {
    navigate(`/event/${event.title}`, { state: { event } });
  };

  const handleFilter = async () => {
    setSearchInitiated(true);
    setTitleError(""); 
    setLocationError("");

    if (!title) {
      setTitleError("Title is required");
    }

    if (!location) {
      setLocationError("Location is required");
    }


    if (!title || !location) {
      return; 
    }

    const filterData = {
      title: title || null,
      language: language || null,
      date: date || null,
      venueName: venueName || null,
      location: location || null,
      categoryName: "event",
    };

    try {
      console.log(filterData);
      const response = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/event/filter",
        filterData
      );
      setFilteredEvents(response.data);
    } catch (error) {
      console.error("Error fetching filtered events:", error);
    }
  };

  const TextFieldStyles = {
    minWidth: "150px",
    "& .MuiOutlinedInput-root": {
      borderRadius: "20px",
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
    "& .MuiInputLabel-root": {
      color: "white",
    },
    "& .MuiInputBase-input": {
      color: "white",
    },
  };

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

  const containerStyle1 = {
    textAlign: "center",
    padding: "20px",
    marginTop: "-80px",
    display: "flex",
    alignItems: "center", 
    justifyContent: "center", 
    flexDirection: "column", 
  };

  const headingStyle1 = {
    display: "flex",
    alignItems: "center", 
    color: "white",
    fontSize: "2rem",
    fontWeight: "bold",
  };

  const colorThemeStyle = {
    color: "#ff5722",
  };

  const textStyle = {
    marginTop: "50px", 
  };

  return (
    <div className="Movies">
      <Layout />
      <div style={containerStyle1}>
        <h1 style={headingStyle1}>
          <Lottie
            animationData={discoAnimation}
            loop
            style={{ width: "150px", height: "160px" }} 
          />
          <span style={textStyle}>
            Book your tickets for <span style={colorThemeStyle}>Events</span>
          </span>
        </h1>
      </div>
      <div>
        <Box
          sx={{
            background: "linear-gradient(to right, #1f2833, #820000, #1f2833)",
            padding: "20px",
            borderRadius: "50px",
            color: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            style={{ color: "white", fontWeight: "bold", padding: "10px" }}
          >
            What are you looking for!
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              flexWrap: "wrap",
              marginBottom: "15px",
              width: "100%",
              maxWidth: "100%",
              justifyContent: "center",
            }}
          >
            <TextField
              label="Search for Title"
              variant="outlined"
              sx={{ ...TextFieldStyles, width: "200px" }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              InputProps={{
                startAdornment: (
                  <SearchIcon sx={{ marginRight: "8px", color: "white" }} />
                ),
              }}
              error={!!titleError}
              helperText={titleError}
            />

            <TextField
              label="Language"
              variant="outlined"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              sx={{ ...TextFieldStyles, width: "200px" }}
              InputProps={{
                startAdornment: (
                  <LanguageIcon sx={{ marginRight: "8px", color: "white" }} />
                ),
              }}
            />
            <TextField
              label="Date"
              type="date"
              variant="outlined"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              sx={TextFieldStyles}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Venue Name"
              variant="outlined"
              value={venueName}
              onChange={(e) => setVenueName(e.target.value)}
              sx={{ ...TextFieldStyles, width: "200px" }}
              InputProps={{
                startAdornment: (
                  <PlaceIcon sx={{ marginRight: "8px", color: "white" }} />
                ),
              }}
            />
            <TextField
              label="Location"
              variant="outlined"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              sx={{ ...TextFieldStyles, width: "200px" }}
              InputProps={{
                startAdornment: (
                  <LocationCityIcon
                    sx={{ marginRight: "8px", color: "white" }}
                  />
                ),
              }}
              error={!!locationError}
              helperText={locationError}
            />
            <Button
              variant="contained"
              color="primary"
              style={{
                borderRadius: 13,
                backgroundColor: isHovered ? "#1f2833" : "#820000",
                boxShadow: `0 4px 8px rgba(31, 40, 51, 0.5)`,
                transition: "background-color 0.3s ease",
                height: "56px",
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              startIcon={<SearchIcon />}
              onClick={handleFilter}
            >
              Search
            </Button>
          </Box>
        </Box>

        {searchInitiated && (
          <Box sx={{ marginTop: "20px", padding: "20px", marginLeft: "75px" }}>
            <Typography variant="h4" style={headingStyle} gutterBottom>
              Results
            </Typography>
            {filteredEvents.length === 0 ? (
              <Typography>No events found</Typography>
            ) : (
              <div>
                {filteredEvents.map((event) => (
                  <Card
                    key={event.eventId}
                    style={cardStyle}
                    onClick={() => handleCardClick(event)}
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
                    {event.venues[0].slots[0].date && (
                      <Box style={dateBannerStyle}>
                        {new Date(event.venues[0].slots[0].date).toLocaleString(
                          "default",
                          { day: "numeric", month: "short" }
                        )}
                      </Box>
                    )}
                    <CardContent
                      style={{ backgroundColor: "#820000", color: "white" }}
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
              </div>
            )}
          </Box>
        )}
      </div>
      <EventsByCategory category="event" />
      <Footer />
    </div>
  );
};

export default Events;
