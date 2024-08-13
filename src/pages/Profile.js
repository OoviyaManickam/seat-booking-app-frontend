import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Card,
  Typography,
  Button,
  TextField,
  DialogTitle,
  IconButton,
  Dialog,
  DialogContent,
  DialogActions,
  Link,
} from "@mui/material";
import { Edit, Save } from "@mui/icons-material";
import Layout from "./Layout";
import { styled } from "@mui/material/styles";
import QRCode from "qrcode.react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import ProfileAnimation from "../assets/profile-animation.json";

const MenuButton = styled(Button)({
  width: "80%",
  margin: "20px 32px",
  background: "#820000",
  color: "#fff",
  "&:hover": {
    background: "red",
  },
});

const Profile = () => {
  const [activeSection, setActiveSection] = useState("PersonalDetails");
  const [user, setUser] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [showTicketDialog, setShowTicketDialog] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const newDate = new Date();
  const date = newDate.getDate();
  console.log(newDate);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          process.env.REACT_APP_BACKEND_URL + "/auth/getdetails",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          process.env.REACT_APP_BACKEND_URL + "/book/user/bookings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBookings(response.data); // Set bookings data
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchUserDetails();
    fetchBookings(); // Call the function to fetch bookings
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    setIsEditing(false);
    try {
      await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/auth/updatedetails",
        user
      );
    } catch (error) {
      console.error("Error saving user details:", error);
    }
  };

  const handleBookingClick = (booking) => {
    setSelectedBooking(booking);
    setShowBookingDialog(true);
  };

  const handleTicketClick = () => {
    setShowTicketDialog(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/");
  };

  const handlePasswordChange = async () => {
    console.log(passwords);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/auth/changepassword",
        passwords,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === "success") {
        console.log(response.data.message);
        setIsEditing(false);
      } else {
        console.error(response.data.message);
      }

      setShowPasswordDialog(false);
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  const renderPersonalDetails = () => (
    <Card sx={{ padding: 2, background: "#1f2833", color: "#fff" }}>
      <Typography style={{ color: "#ad4545", marginLeft: "20px" }} variant="h6">
        Personal Details
      </Typography>
      {isEditing ? (
        <>
          <TextField
            error
            fullWidth
            margin="normal"
            label="Name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            variant="outlined"
            sx={{
              background: "#1f2833",
              borderRadius: 1,
              mt: "30px",
              input: { color: "white" },
            }}
          />
          <TextField
            error
            fullWidth
            margin="normal"
            label="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            variant="outlined"
            sx={{
              background: "#1f2833",
              borderRadius: 1,
              input: { color: "white" },
            }}
            disabled
          />
          <TextField
            error
            fullWidth
            margin="normal"
            label="Phone"
            value={user.phoneNumber}
            onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
            variant="outlined"
            sx={{
              background: "#1f2833",
              borderRadius: 1,
              input: { color: "white" },
            }}
          />
          <TextField
            error
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            value={"********************"}
            variant="outlined"
            sx={{
              background: "#1f2833",
              borderRadius: 1,
              input: { color: "white" },
            }}
            disabled
          />
          <Button
            onClick={() => setShowPasswordDialog(true)}
            variant="contained"
            startIcon={<Edit />}
            sx={{
              marginTop: 2,
              background: "#820000",
              "&:hover": { background: "red" },
            }}
          >
            Change Password
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            startIcon={<Save />}
            sx={{
              marginTop: 2,
              marginLeft: 4,
              background: "#820000",
              "&:hover": { background: "red" },
            }}
          >
            Save
          </Button>
        </>
      ) : (
        <>
          <Typography style={{ margin: "20px" }}>Name: {user.name}</Typography>
          <Typography style={{ margin: "20px" }}>
            Email: {user.email}
          </Typography>
          <Typography style={{ margin: "20px" }}>
            Phone: {user.phoneNumber}
          </Typography>
          <Typography style={{ margin: "20px" }}>
            Password: {"*********************"}
          </Typography>
          <Button
            onClick={handleEditToggle}
            variant="contained"
            startIcon={<Edit />}
            sx={{
              marginTop: 2,
              marginLeft: 2,
              background: "#820000",
              "&:hover": { background: "red" },
            }}
          >
            Edit
          </Button>
        </>
      )}
    </Card>
  );

  const renderMyBookings = () => (
    <Card sx={{ padding: 2, background: "#1f2833", color: "#fff" }}>
      <Typography variant="h6">My Bookings</Typography>
      {bookings.map((booking) => (
        <Card
          key={booking.bookingId} // Use bookingId as the key
          sx={{ margin: "10px 0", padding: 2, background: "#AAAAAA" }}
        >
          <Typography>Movie: {booking.title}</Typography>
          <Typography>Language: {booking.language}</Typography>
          <Typography>Venue: {booking.venueName}</Typography>
          <Typography>Date: {booking.date}</Typography>
          <Typography>Time: {booking.time.slice(0, 5)}</Typography>
          <Typography>Seats: {booking.seatNos.join(", ")}</Typography>
          <Button
            onClick={() => handleBookingClick(booking)} // Pass the booking object
            variant="contained"
            sx={{
              background: "#820000",
              "&:hover": { background: "red" },
              marginTop: "10px",
            }}
          >
            {new Date(booking.date) > new Date() ? "Upcoming" : "Finished"}{" "}
            {/* Adjust status display based on your booking status */}
          </Button>
        </Card>
      ))}
      {selectedBooking && (
        <Dialog
          open={showBookingDialog}
          onClose={() => setShowBookingDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogContent style={{ backgroundColor: "black" }}>
            <div style={{ color: "white" }} className="order-summary">
              <h2>Booking Summary</h2>
              <hr color="grey" />

              <h4>Movie Title: {selectedBooking.movieName}</h4>
              <h4>Language: {selectedBooking.language}</h4>
              <h4>Venue: {selectedBooking.venueName}</h4>
              <h4>Date: {selectedBooking.date}</h4>
              <h4>Time: {selectedBooking.time.slice(0, 5)}</h4>

              <hr color="grey" />
              <div className="order-items">
                <div className="seats-summary">
                  <h4>Seats:</h4>
                  <div>
                    {selectedBooking.seatNos.map((seat) => seat).join(", ")}
                  </div>
                </div>
              </div>
              <hr color="grey" />
              <div className="total-amount">
                <h3>Total Amount: ₹{selectedBooking.amount}</h3>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  onClick={handleTicketClick}
                  variant="contained"
                  sx={{
                    background: "#820000",
                    "&:hover": { background: "red" },
                  }}
                >
                  Ticket
                </Button>
                <Button
                  onClick={() => setShowBookingDialog(false)}
                  variant="contained"
                  sx={{
                    background: "#820000",
                    "&:hover": { background: "red" },
                  }}
                >
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
      {showTicketDialog && (
        <Dialog
          open={showTicketDialog}
          onClose={() => setShowTicketDialog(false)}
          maxWidth="xs"
          fullWidth={false}
          PaperProps={{
            style: {
              borderRadius: "15px",
              width: "500px",
              margin: "auto",
            },
          }}
        >
          <DialogContent style={{ background: "black" }}>
            <IconButton
              aria-label="close"
              onClick={() => setShowTicketDialog(false)}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <div style={{ marginRight: "36px" }} className="ticket">
              <div className="ticket-header">
                <span className="booking-id">
                  Booking ID: {selectedBooking.bookingId}
                </span>
              </div>
              <div className="ticket-poster">
                <img
                  src={selectedBooking.imageUrl}
                  alt="Movie Poster"
                  className="poster-image"
                />
              </div>
              <div className="ticket-details">
                <div className="movie-title">{selectedBooking.title}</div>
                <div className="movie-info">
                  <div className="date-time">
                    <div>Date</div>
                    <div>{selectedBooking.date}</div>
                    <div>Time</div>
                    <div>{selectedBooking.time.slice(0, 5)}</div>
                  </div>
                  <div className="venue-seats">
                    <div>Venue</div>
                    <div>{selectedBooking.venueName}</div>
                    <div>Seats</div>
                    <div>
                      {selectedBooking.seatNos.map((seat) => seat).join(", ")}
                    </div>
                  </div>
                </div>
                <div className="ticket-qr">
                  <QRCode value="123456" size={100} />
                  <div className="booking-code">
                    {selectedBooking.bookingId}
                  </div>
                </div>
              </div>
              <div className="ticket-footer">
                <div className="brand">
                  <b>Let's Book</b>
                </div>
                <div className="ticket-type">M-Ticket</div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );

  const renderHelpCenter = () => (
    <Card sx={{ padding: 2, background: "#1f2833", color: "#fff" }}>
      <Typography style={{ color: "#ad4545", marginLeft: "19px" }} variant="h6">
        Help Center
      </Typography>
      <Typography style={{ margin: "20px" }}>
        For any assistance, please contact our support team.
      </Typography>
      <Typography style={{ margin: "20px" }}>
        Email:
        <Link
          style={{ marginLeft: "10px" }}
          href="https://mail.google.com/mail/"
          target="_blank"
          color="#ad4545"
        >
          tickets.letsbook@gmail.com
        </Link>
      </Typography>
      <Typography style={{ margin: "20px" }}>Phone: +123 456 7890</Typography>
    </Card>
  );

  return (
    <div>
      <Layout />
      <Container>
        <Box sx={{ display: "flex", marginTop: 4 }}>
          <Box sx={{ width: "25%", padding: 2 }}>
            <Card sx={{ padding: 2, background: "#1f2833", color: "#fff" }}>
              <Box sx={{ textAlign: "center", padding: "10px" }}>
                <Lottie
                  animationData={ProfileAnimation}
                  loop
                  style={{
                    width: "150px",
                    height: "150px",
                    marginLeft: "60px",
                  }}
                />
                <Typography variant="h6">{user.name}</Typography>
                <Typography variant="body2">{user.email}</Typography>
              </Box>
              <MenuButton
                style={{ mt: "20px" }}
                onClick={() => setActiveSection("PersonalDetails")}
              >
                Personal Details
              </MenuButton>
              <MenuButton onClick={() => setActiveSection("MyBookings")}>
                My Bookings
              </MenuButton>
              <MenuButton onClick={() => setActiveSection("HelpCenter")}>
                Help Center
              </MenuButton>
              <MenuButton onClick={handleLogout}>Log Out</MenuButton>
            </Card>
          </Box>
          <Box sx={{ width: "70%", padding: 2 }}>
            {activeSection === "PersonalDetails" && renderPersonalDetails()}
            {activeSection === "MyBookings" && renderMyBookings()}
            {activeSection === "HelpCenter" && renderHelpCenter()}
          </Box>
        </Box>
      </Container>
      <Dialog
        open={showPasswordDialog}
        onClose={() => setShowPasswordDialog(false)}
        PaperProps={{
          style: {
            backgroundColor: "#AAAAAA",
          },
        }}
      >
        <DialogTitle sx={{ color: "#820000", fontWeight: "light" }}>
          Change Password
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Current Password"
            type="password"
            value={passwords.currentPassword}
            onChange={(e) =>
              setPasswords({ ...passwords, currentPassword: e.target.value })
            }
            variant="outlined"
            sx={{
              borderRadius: 1,
              input: { color: "#234" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "black",
                },
                "&:hover fieldset": {
                  borderColor: "black",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "black",
                },
              },
            }}
            InputLabelProps={{
              sx: {
                color: "#234",
                "&.Mui-focused": {
                  color: "#234",
                },
              },
            }}
          />

          <TextField
            fullWidth
            margin="normal"
            label="New Password"
            type="password"
            value={passwords.newPassword}
            onChange={(e) =>
              setPasswords({ ...passwords, newPassword: e.target.value })
            }
            variant="outlined"
            sx={{
              borderRadius: 1,
              input: { color: "#234" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "black",
                },
                "&:hover fieldset": {
                  borderColor: "black",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "black",
                },
              },
            }}
            InputLabelProps={{
              sx: {
                color: "#234",
                "&.Mui-focused": {
                  color: "#234",
                },
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handlePasswordChange}
            variant="contained"
            sx={{
              background: "#820000",
              "&:hover": { background: "red" },
            }}
          >
            Save
          </Button>
          <Button
            onClick={() => setShowPasswordDialog(false)}
            variant="contained"
            sx={{
              background: "#234",
              "&:hover": { background: "red" },
              marginRight: 2,
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Profile;
