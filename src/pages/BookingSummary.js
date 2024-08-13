import React, { useState } from "react";
import Layout from "./Layout";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/BookingSummary.css";
import axios from "axios";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  CircularProgress,
} from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import Lottie from "lottie-react";
import trendAnimation from "../assets/trend-animation.json";

const mockFoodAndBeverages = [
  {
    id: 1,
    name: "French Fries",
    price: 160,
    image:
      "https://www.pngplay.com/wp-content/uploads/15/French-Fries-PNG-Photos.png",
    category: "SNACKS",
  },
  {
    id: 2,
    name: "Large Popcorn",
    price: 340,
    image:
      "https://clipart-library.com/images_k/popcorn-clipart-transparent/popcorn-clipart-transparent-20.png",
    category: "POPCORN",
  },
  {
    id: 3,
    name: "Regular coke",
    price: 180,
    image: "https://pluspng.com/img-png/coca-cola-355ml-2000.png",
    category: "BEVERAGES",
  },
  {
    id: 4,
    name: "Cold Coffee",
    price: 210,
    image:
      "https://www.pngarts.com/files/11/Sweet-Iced-Coffee-Transparent-Image.png",
    category: "BEVERAGES",
  },
  {
    id: 15,
    name: "Combo 1",
    price: 140,
    image: "https://www.magiquestpf.com/wp-content/uploads/popcorn-coke.png",
    category: "COMBOS",
  },
  {
    id: 12,
    name: "Lava cake",
    price: 110,
    image:
      "https://tse1.mm.bing.net/th/id/OIP.tSPOueJqtVqYXOlnekfXCAHaEG?rs=1&pid=ImgDetMain",
    category: "DESSERTS",
  },
  {
    id: 5,
    name: "Veg momos",
    price: 140,
    image:
      "https://tse2.mm.bing.net/th/id/OIP.frbGsq8WzqZ1KEaQoQtOMQAAAA?rs=1&pid=ImgDetMain",
    category: "SNACKS",
  },
  {
    id: 6,
    name: "Small Popcorn",
    price: 110,
    image:
      "https://www.freepnglogos.com/uploads/popcorn-png/popcorn-marketing-food-school-catalogue-healthy-kids-2.png",
    category: "POPCORN",
  },
  {
    id: 7,
    name: "Nachos",
    price: 160,
    image:
      "https://tse2.mm.bing.net/th/id/OIP.TnLHvuPfzfXhnHnlCBWr7QHaGe?rs=1&pid=ImgDetMain",
    category: "SNACKS",
  },
  {
    id: 13,
    name: "Glazed donut",
    price: 120,
    image:
      "https://tse4.mm.bing.net/th/id/OIP.7aCTRR5FpRBsdZAHximGyQAAAA?rs=1&pid=ImgDetMain",
    category: "DESSERTS",
  },
  {
    id: 8,
    name: "Chicken nuggs",
    price: 190,
    image:
      "https://tse1.mm.bing.net/th/id/OIP.HkcibOeGLav-hNeTjfaiQwHaE-?rs=1&pid=ImgDetMain",
    category: "SNACKS",
  },
  {
    id: 16,
    name: "Combo 2",
    price: 140,
    image:
      "https://tse2.mm.bing.net/th/id/OIP.UuL-XJPD_CT_TDIKbcPxowHaHa?rs=1&pid=ImgDetMain",
    category: "COMBOS",
  },
  {
    id: 9,
    name: "Regular Fanta",
    price: 180,
    image:
      "https://tse3.mm.bing.net/th/id/OIP.Q-GBxm8IaIB6QORipVvF2gHaHa?rs=1&pid=ImgDetMain",
    category: "BEVERAGES",
  },
  {
    id: 10,
    name: "Water 750ml",
    price: 60,
    image: "https://pngimg.com/uploads/water_bottle/water_bottle_PNG98933.png",
    category: "BEVERAGES",
  },
  {
    id: 14,
    name: "Ice cream scoop",
    price: 180,
    image:
      "https://tse2.mm.bing.net/th/id/OIP.NVsfwARyVWA19wyaKLawBQHaFB?rs=1&pid=ImgDetMain",
    category: "DESSERTS",
  },
  {
    id: 17,
    name: "French Fries L",
    price: 230,
    image:
      "https://www.pngplay.com/wp-content/uploads/15/French-Fries-PNG-Photos.png",
    category: "SNACKS",
  },
  {
    id: 11,
    name: "Veg sandwich",
    price: 190,
    image:
      "https://th.bing.com/th/id/R.572f792b69099501639b54fc2eab2a18?rik=vVyuN8anAOSgwA&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fsandwich-png-hd-sandwich-png-image-sandwich-hd-png-2594.png&ehk=dSTMF7esFkl%2f%2b0haR5OKf6zoWKZlxAOXu6OG5epyINU%3d&risl=1&pid=ImgRaw&r=0",
    category: "SNACKS",
  },
  {
    id: 18,
    name: "Pancakes",
    price: 190,
    image:
      "https://tse4.mm.bing.net/th/id/OIP.1Mv69IeZDnkvCYgDMZ2ytwHaFk?rs=1&pid=ImgDetMain",
    category: "DESSERTS",
  },
];

const BookingSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const {
    bookingData,
    slotTime,
    slotDate,
    amount,
    venueName,
    seatDetails,
    event,
  } = location.state || {};
  const [totalAmount, setTotalAmount] = useState(amount);
  const [openDialog, setOpenDialog] = useState(false);
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddItem = (item) => {
    setSelectedItems((prevItems) => [...prevItems, item]);
    setTotalAmount((prevAmount) => prevAmount + item.price);
  };

  const handleRemoveItem = (item) => {
    setSelectedItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
    setTotalAmount((prevAmount) => prevAmount - item.price);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleProceed = async () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (!localStorage.getItem("token")) {
        setOpenLoginDialog(true);
      } else {
        handleBookSeat();
      }
    }, 2000);
  };

  const handleBookSeat = async () => {
    const bookingResponse = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/book/bookseat`,
      bookingData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const { bookingId } = bookingResponse.data;
    navigate("/payment", {
      state: {
        selectedItems: selectedItems,
        bookingId: bookingId,
        event: event,
        seatDetails: seatDetails,
        venueName: venueName,
        slotTime: slotTime,
        slotDate: slotDate,
        amount: totalAmount,
      },
    });
  };

  const filteredItems =
    selectedCategory === "ALL"
      ? mockFoodAndBeverages
      : mockFoodAndBeverages.filter(
          (item) => item.category === selectedCategory
        );

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmProceed = () => {
    handleCloseDialog();
    handleProceed();
  };

  const handleLoginRedirect = () => {
    setOpenLoginDialog(false);
    navigate("/login");
  };

  return (
    <div className="Food-back">
      <Layout />
      <div className="booking-summary-page">
        <div className="food-and-beverage">
          <h2>Grab a bite!</h2>
          <p className="para">Prebook your meal and skip the line!</p>
          <div className="categories">
            <button onClick={() => handleCategoryChange("ALL")}>ALL</button>
            <button onClick={() => handleCategoryChange("COMBOS")}>
              COMBOS
            </button>
            <button onClick={() => handleCategoryChange("POPCORN")}>
              POPCORN
            </button>
            <button onClick={() => handleCategoryChange("SNACKS")}>
              SNACKS
            </button>
            <button onClick={() => handleCategoryChange("BEVERAGES")}>
              BEVERAGES
            </button>
            <button onClick={() => handleCategoryChange("DESSERTS")}>
              DESSERTS
            </button>
          </div>
          <div className="food-items-box">
            <div className="food-items">
              {filteredItems.map((item) => (
                <div key={item.id} className="food-item-card">
                  <img src={item.image} alt={item.name} />
                  <div className="food-details">
                    <p>{item.name}&nbsp;&nbsp;</p>
                    <p>₹{item.price}&nbsp;&nbsp;&nbsp;&nbsp;</p>
                    <button onClick={() => handleAddItem(item)}>Add</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="booking-summary">
          <div className="booking-summary-card">
            <h2>Booking Summary</h2>
            <hr />
            <h4>Movie Title: {event.title}</h4>
            <h4>Language: {event.language}</h4>
            <h4>Venue: {venueName}</h4>
            <h4>Date: {slotDate}</h4>
            <h4>Time: {slotTime}</h4>
            <hr color="grey" />
            <h3>
              Seats:{" "}
              {seatDetails
                .map((seat) => `${seat.seatNo} (₹${seat.price})`)
                .join(", ")}
            </h3>
            <hr color="grey" />
            {selectedItems.length > 0 && (
              <>
                <p>Food & Beverages:</p>
                <ul>
                  {selectedItems.map((item, index) => (
                    <li key={index}>
                      {item.name} - ₹{item.price}
                      <button
                        className="remove-button"
                        onClick={() => handleRemoveItem(item)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
            <br />
            <p className="consent-text">
              {" "}
              Inclusive of convenience charges and taxes{" "}
            </p>
            <h1>Total Amount: ₹{totalAmount.toFixed(2)}</h1>
            <p className="consent-text">
              <span className="caution-symbol">⚠️</span> By proceeding, I
              express my consent to complete this transaction.
            </p>
            <button className="proceed-button" onClick={handleOpenDialog}>
              TOTAL: ₹{totalAmount.toFixed(2)}{" "}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&emsp;&emsp;&emsp;&emsp;
              &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;PROCEED
            </button>
            {loading && (
              <div className="loading-overlay">
                <Lottie
                  animationData={trendAnimation}
                  loop
                  style={{ width: "150px", height: "150px" }} 
                />
                <p>Loading...</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle align="center">
          <WarningIcon color="error" sx={{ verticalAlign: "middle", mr: 1 }} />
          Proceed to Payment
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Proceeding further you cannot come back to select the seats. Do you
            want to continue?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              mr: "auto",
              ml: 1,
              mb: 2,
              padding: 1,
              width: 150,
            }}
            variant="outlined"
            onClick={handleCloseDialog}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            sx={{
              mr: 1,
              mb: 2,
              padding: 1,
              width: 150,
            }}
            variant="contained"
            onClick={handleConfirmProceed}
            color="error"
          >
            Accept
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openLoginDialog}
        onClose={() => setOpenLoginDialog(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle align="center">
          <WarningIcon color="error" sx={{ verticalAlign: "middle", mr: 1 }} />
          Login Required
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            You need to be logged in to proceed with the booking. Do you want to
            login now?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              mr: "auto",
              ml: 1,
              mb: 2,
              padding: 1,
              width: 150,
            }}
            variant="outlined"
            onClick={() => setOpenLoginDialog(false)}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            sx={{
              mr: 1,
              mb: 2,
              padding: 1,
              width: 150,
            }}
            variant="contained"
            onClick={handleLoginRedirect}
            color="error"
          >
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BookingSummary;
