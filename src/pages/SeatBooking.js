import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import Available from "../assets/available.png";
import Booked from "../assets/booked.png";
import Selected from "../assets/selected.png";
import Layout from "./Layout";
import "../styles/SeatBooking.css";

const SeatBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { venueId, slotTime, slotDate, slotId, venueName, event } =
    location.state || {};

  const [seats, setSeats] = useState([]);
  const [seatStatuses, setSeatStatuses] = useState({});
  const [selectedSeats, setSelectedSeats] = useState(new Set());
  const [openSlotDialog, setOpenSlotDialog] = useState(false);
  const [openDateDialog, setOpenDateDialog] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isSlotHovered, setIsSlotHovered] = useState(false);
  const [openTermsDialog, setOpenTermsDialog] = useState(false);

  useEffect(() => {
    if (!venueId) {
      console.error("Venue ID is missing");
      return;
    }

    const fetchSeats = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/event/seats?venueid=${venueId}`
        );
        setSeats(response.data);

        const seatIds = response.data.map((seat) => String(seat.seatId));
        const statusResponse = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/book/getstatus`,
          {
            seatIds,
            slotId: slotId,
          }
        );
        setSeatStatuses(statusResponse.data);
      } catch (error) {
        console.error("Error fetching seats or statuses:", error);
      }
    };

    fetchSeats();
  }, [venueId, slotId]);

  useEffect(() => {
    if (event && venueId) {
      const fetchSlotsForVenue = async () => {
        try {
          const slotforvenue = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/event/slots`,
            {
              params: { eventid: event.eventId, venueid: venueId },
            }
          );
          const slots = slotforvenue.data;
          setAvailableSlots(slots);
          const dates = slotforvenue.data.map((slot) => slot.date);
          setAvailableDates([...new Set(dates)]);
        } catch (error) {
          console.error("Error fetching slots for venue:", error);
        }
      };

      fetchSlotsForVenue();
    }
  }, [event, venueId]);

  useEffect(() => {
    if (selectedDate) {
      const slots = availableSlots.filter((slot) => slot.date === selectedDate);
      setAvailableSlots(slots);
      setOpenSlotDialog(true);
    }
  }, [selectedDate, event]);

  const handleSeatClick = (seatId) => {
    setSelectedSeats((prevSelectedSeats) => {
      const newSelectedSeats = new Set(prevSelectedSeats);
      if (newSelectedSeats.has(seatId)) {
        newSelectedSeats.delete(seatId);
      } else {
        newSelectedSeats.add(seatId);
      }
      return newSelectedSeats;
    });
  };

  const handleSlotClick = (slot) => {
    setSelectedSeats(new Set());
    setSelectedDate("");
    handleCloseSlotDialog();
    navigate("/seatbooking", {
      state: {
        venueId: venueId,
        slotId: slot.slotId,
        slotDate: selectedDate,
        slotTime: slot.time,
        venueName: venueName,
        event: event,
      },
    });
  };

  const handleOpenSlotDialog = () => {
    if (selectedDate) {
      const slots = event.slots.filter((slot) => slot.date === selectedDate);

      setAvailableSlots(slots);
    }
    setOpenSlotDialog(true);
  };

  const handleCloseSlotDialog = () => {
    setOpenSlotDialog(false);
  };

  const handleOpenDateDialog = () => {
    setOpenDateDialog(true);
  };

  const handleCloseDateDialog = () => {
    setOpenDateDialog(false);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setSelectedSeats(new Set());
    handleCloseDateDialog();
  };

  const handleBookSeats = async () => {
    setOpenTermsDialog(true);
  };

  const handleDialogClose = () => {
    setOpenTermsDialog(false);
  };

  const handleAccept = async () => {
    setOpenTermsDialog(false);
    const seatIds = Array.from(selectedSeats);
    const selectedSeatDetails = seatIds.map((seatId) => {
      const seat = seats.find((s) => s.seatId === seatId);
      return {
        seatId: seatId,
        seatNo: seat ? seat.seatNo : null,
        price: seat.price,
      };
    });

    const bookingData = {
      seatIds,
      slotId: slotId,
    };

    const totalAmount = seatIds.reduce((total, seatId) => {
      const seat = seats.find((s) => s.seatId === seatId);
      return total + (seat ? seat.price : 0);
    }, 0);
    navigate("/bookingsummary", {
      state: {
        event: event,
        bookingData: bookingData,
        seatDetails: selectedSeatDetails,
        venueName: venueName,
        slotTime: slotTime,
        slotDate: slotDate,
        amount: totalAmount,
      },
    });
  };

  const renderSeats = (seats, rowLabel) => {
    return (
      <div className="seat-row">
        <div className="row-label">{rowLabel}</div>
        {seats.map((seat) => {
          const status = seatStatuses[seat.seatId] || "unknown";
          let seatImage;

          if (selectedSeats.has(seat.seatId)) {
            seatImage = Selected;
          } else {
            switch (status) {
              case "available":
                seatImage = Available;
                break;
              case "locked":
              case "booked":
                seatImage = Booked;
                break;
              default:
                seatImage = Available;
                break;
            }
          }

          return (
            <div
              key={seat.seatId}
              className={`seat ${status}`}
              onClick={() =>
                status === "available" && handleSeatClick(seat.seatId)
              }
            >
              <img src={seatImage} alt={`Seat ${seat.seatNo}`} />
              <p className="seat-number">{seat.seatNo}</p>
            </div>
          );
        })}
      </div>
    );
  };

  const silverSeats = seats.filter((seat) => seat.price === 100);
  const goldSeats = seats.filter((seat) => seat.price === 200);

  return (
    <div>
      <div id="focus-element" tabIndex="-1"></div>
      <Layout />
      <div className="seat-booking-page">
        <div className="banner">
          <div className="movie-details">
            <h1>{event.title}</h1>
            <p>Genre: {event.genre}</p>
            <p>Language: {event.language}</p>
          </div>
        </div>
        <div className="date-slot-info">
          <Typography
            variant="h6"
            style={{ marginBottom: "10px", marginLeft: "20px" }}
          >
            {venueName}
          </Typography>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "640px",
            }}
          >
            <Typography variant="h6" style={{ marginRight: "10px" }}>
              Date:
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenDateDialog}
              style={{
                backgroundColor: isHovered ? "#1f2833" : "#820000",
                fontSize: "0.8rem",
                boxShadow: `0 4px 8px rgba(31, 40, 51, 0.5)`,
                transition: "background-color 0.3s ease", 
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {slotDate}
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "638px",
              marginTop: "10px",
            }}
          >
            <Typography variant="h6" style={{ marginRight: "17px" }}>
              Time:
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenSlotDialog}
              style={{
                backgroundColor: isSlotHovered ? "#1f2833" : "#820000",
                fontSize: "0.8rem",
                boxShadow: `0 4px 8px rgba(31, 40, 51, 0.5)`,
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={() => setIsSlotHovered(true)}
              onMouseLeave={() => setIsSlotHovered(false)}
            >
              {slotTime}
            </Button>
          </div>
        </div>

        <div className="seat-arrangement">
          <div className="screen">..........</div>
          <div className="seating-area">
            <div className="section-label">Silver</div>
            {renderSeats(silverSeats.slice(0, 5), "A")}
            <div className="section-label">Gold</div>
            {renderSeats(goldSeats.slice(0, 5), "B")}
            {renderSeats(goldSeats.slice(5, 10), "C")}
          </div>
        </div>
        <div className="booking-info">
          <div className="selected-seats">
            <p>
              Selected Seats:{" "}
              {Array.from(selectedSeats)
                .map(
                  (seatId) =>
                    seats.find((seat) => seat.seatId === seatId)?.seatNo
                )
                .join(", ")}
            </p>
          </div>
          <div className="total-amount">
            <p>
              Total Amount: ₹
              {Array.from(selectedSeats).reduce((total, seatId) => {
                const seat = seats.find((s) => s.seatId === seatId);
                return total + (seat ? seat.price : 0);
              }, 0)}
            </p>
          </div>
          <button onClick={handleBookSeats} className="book-button">
            Proceed to Payment
          </button>
        </div>
      </div>
      <Dialog
        onClose={handleCloseDateDialog}
        open={openDateDialog}
        PaperProps={{
          style: { borderRadius: "10px" },
        }}
      >
        <DialogTitle style={{ backgroundColor: "#820000", color: "white" }}>
          Select Date
        </DialogTitle>
        <DialogContent style={{ backgroundColor: "#555", color: "white" }}>
          <List autoFocus>
            {availableDates.map((date) => (
              <ListItem
                key={date}
                style={{ borderBottom: "1px solid #444" }}
                button
                onClick={() => handleDateClick(date)}
              >
                <ListItemText primary={date} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
      <Dialog
        onClose={handleCloseSlotDialog}
        open={openSlotDialog}
        PaperProps={{
          style: { borderRadius: "10px" },
        }}
      >
        <DialogTitle style={{ backgroundColor: "#820000", color: "white" }}>
          Available Slots for {selectedDate}
        </DialogTitle>
        <DialogContent style={{ backgroundColor: "#555", color: "white" }}>
          <List autoFocus>
            {availableSlots.map((slot) => (
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
      <Dialog open={openTermsDialog} onClose={handleDialogClose}>
        <DialogTitle align="center">Terms and Conditions</DialogTitle>
        <DialogContent sx={{ padding: "30px" }}>
          <DialogContentText>
            Please read and accept our terms and conditions to proceed with the
            payment.
            <br />
            1. Patrons under the age of 18 are strictly prohibited entry to A
            rated movies by law Please note tickets once booked for underaged
            patrons will not be refunded under any circumstances.
            <br />
            2. Please carry proof of age for movies certified `A`.
            <br />
            3. Tickets once purchased cannot be cancelled, exchanged or
            refunded.
            <br />
            4. Tickets purchased online are not eligible for discounts, schemes
            or promotions of any kind.
            <br />
            5. To collect tickets from the Box Office, it is mandatory for the
            cardholder to be present in person with the card used for the
            transaction, along with the booking confirmation (SMS/computer
            printout) to help minimize the risk of fraud.
            <br />
            6. Online bookings on our site are carried out over a secure payment
            gateway.
            <br />
            7. Tickets purchased online for a particular multiplex are valid for
            that multiplex only.
            <br />
            8. Please purchase tickets for children 3 years and above.
            <br />
            9. To counter unforeseen delays, please collect your tickets half an
            hour before show time.
            <br />
            10. Outside food and beverages are not allowed inside the cinema
            premises.
            <br />
            11. A convenience fee per ticket is levied on all tickets booked
            online.
            <br />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              mr: "40%",
              ml: "10px",
              mb: "20px",
              boxShadow: "5",
              padding: "10px",
              diplay: "flex",
              width: "50%",
            }}
            variant="outlined"
            onClick={handleDialogClose}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            sx={{
              mr: "10px",
              mb: "20px",
              boxShadow: "5",
              padding: "10px",
              diplay: "flex",
              width: "50%",
            }}
            variant="contained"
            onClick={handleAccept}
            color="error"
          >
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SeatBooking;
