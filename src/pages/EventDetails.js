import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Drawer,
  Box,
  Divider,
} from "@mui/material";
import Layout from "../pages/Layout";
import axios from "axios";

const EventDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const event = location.state?.event || {};

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedVenueName, setSelectedVenueName] = useState("");
  const [selectedVenueId, setSelectedVenueId] = useState("");
  const [slots, setSlots] = useState([]);
  const [allSlots, setAllSlots] = useState([]);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const promises = event.venues.map((venue) =>
          axios
            .get(process.env.REACT_APP_BACKEND_URL + "/event/slots", {
              params: { eventid: event.eventId, venueid: venue.venueId },
            })
            .then((response) =>
              response.data.map((slot) => ({ ...slot, venueId: venue.venueId }))
            )
        );
        const responses = await Promise.all(promises);
        const combinedSlots = responses.flat();
        setAllSlots(combinedSlots);
      } catch (error) {
        console.error("Error fetching slots:", error);
      }
    };

    if (event.venues && event.venues.length > 0) {
      fetchSlots();
    }
  }, [event.eventId, event.venues]);

  if (!event) {
    return <div>No event data available</div>;
  }

  const handleDateClick = (date, venueName, venueId) => {
    setSelectedVenueName(venueName);
    setSelectedDate(date);
    setSelectedVenueId(venueId);
    setOpenDialog(true);

    setSlots(
      allSlots.filter((slot) => slot.date === date && slot.venueId === venueId)
    );
  };

  const handleSlotClick = (slot) => {
    navigate("/seatbooking", {
      state: {
        slotId: slot.slotId,
        venueId: selectedVenueId,
        slotDate: slot.date,
        slotTime: slot.time,
        venueName: selectedVenueName,
        event: event,
      },
    });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpenDrawer(open);
  };

  const drawerList = () => (
    <Box
      sx={{ width: "auto" }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List sx={{ backgroundColor: "#1f2833" }}>
        {event.venues.map((venue) => (
          <div key={venue.venueId}>
            <Typography
              variant="h9"
              style={{
                color: "white",
                marginLeft: "20px",
                marginBottom: "10px",
                fontWeight: "bold",
              }}
            >
              {venue.venueName.toUpperCase()}
            </Typography>
            <Divider />
            <div
              style={{
                display: "flex",
                flexShrink: "0",
                marginLeft: "20px",
                margin: "8px",
              }}
            >
              {allSlots
                .filter((slot) => slot.venueId === venue.venueId)
                .filter(
                  (slot, index, self) =>
                    self.findIndex((s) => s.date === slot.date) === index
                )
                .map((slot) => (
                  <Button
                    key={slot.date}
                    onClick={() =>
                      handleDateClick(slot.date, venue.venueName, venue.venueId)
                    }
                    style={{
                      color: "white",
                      backgroundColor: "#555",
                      margin: "5px",
                      border: "none",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = "#820000")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = "#555")
                    }
                  >
                    {slot.date}
                  </Button>
                ))}
            </div>
            <Divider />
          </div>
        ))}
      </List>
    </Box>
  );

  return (
    <div className="Events">
      <Layout />
      <Grid
        container
        spacing={2}
        style={{ marginTop: "20px", justifyContent: "center" }}
      >
        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Card
            className="my-custom-card"
            style={{ backgroundColor: "#820000", maxWidth: 300 }}
          >
            <CardMedia
              component="img"
              image={event.imageUrl}
              alt={event.title}
              style={{ height: 350 }}
            />
            <CardContent>
              <Typography variant="h4" style={{ color: "white" }}>
                {event.title}
              </Typography>
              <Typography variant="h6" style={{ color: "#ddd" }}>
                Genre: {event.genre}
              </Typography>
              <Typography variant="body1" style={{ color: "#bbb" }}>
                Language: {event.language}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} style={{ textAlign: "center", marginTop: "20px" }}>
          <Typography
            variant="h5"
            style={{ color: "white", marginBottom: "10px" }}
          >
            About the movie...
          </Typography>
          <Typography variant="body1" style={{ margin: "10px", color: "#bbb" }}>
            {event.description}
          </Typography>
        </Grid>
      </Grid>
      <div style={{ textAlign: "center", padding: "30px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={toggleDrawer(true)}
          style={{ backgroundColor: "#820000" }}
        >
          Book Tickets
        </Button>
        <Drawer anchor="bottom" open={openDrawer} onClose={toggleDrawer(false)}>
          {drawerList()}
        </Drawer>
      </div>
      {selectedDate && (
        <Dialog
          onClose={handleCloseDialog}
          open={openDialog}
          PaperProps={{
            style: { borderRadius: "10px" },
          }}
        >
          <DialogTitle style={{ backgroundColor: "#820000", color: "white" }}>
            Available Slots for {selectedDate}
          </DialogTitle>
          <DialogContent style={{ backgroundColor: "#1f2833", color: "white" }}>
            <List autoFocus>
              {slots.map((slot) => (
                <ListItem
                  key={slot.slotId}
                  style={{ borderBottom: "1px solid #444" }}
                  button
                  onClick={() => handleSlotClick(slot)}
                >
                  <ListItemText primary={slot.time} />
                </ListItem>
              ))}
              <ListItem autoFocus />
            </List>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default EventDetails;
