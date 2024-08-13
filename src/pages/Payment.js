import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "./Layout";
import "../styles/Payment.css";
import Lottie from "lottie-react";
import paymentAnimation from "../assets/payment-animation.json";
import axios from "axios";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const {
    slotTime,
    slotDate,
    amount,
    venueName,
    seatDetails,
    selectedItems,
    bookingId,
    event,
  } = location.state || {};
  const [totalAmount, setTotalAmount] = useState(amount);

  console.log(amount, bookingId);

  const handlePayment = async () => {
    try {
      const paymentData = {
        amount,
        bookingId,
      };

      const paymentResponse = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/book/payment`,
        paymentData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (paymentResponse.status === 200) {
        setShowConfirmation(true);
      }
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  const handleGenerate = () => {
    navigate("/ticket", {
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

  const containerStyle = {
    textAlign: "center",
    marginTop: "-30px",
    display: "flex",
    marginLeft: "600px",
  };

  const headingStyle = {
    display: "flex",
    alignItems: "center", // Align items vertically centered
    color: "white",
    fontSize: "2rem",
    fontWeight: "bold",
  };

  const colorThemeStyle = {
    color: "#ff5722",
  };

  const textStyle = {
    marginTop: "40px", // Adjust the value as needed to move the text down
  };

  return (
    <div>
      <Layout />
      {/* <div style={containerStyle}>
        <h1 style={headingStyle}>
          <Lottie
            animationData={paymentAnimation}
            loop
            style={{ width: "120px", height: "120px" }} // Add margin to the right of the animation
          />
          <span style={textStyle}>
            <span style={colorThemeStyle}>Payment</span>
          </span>
        </h1>
      </div> */}
      <div className="payment-page">
        <div className="left-section">
          <div className="payment-options">
            <h2>Payment Options</h2>
            <hr color="grey" />
            <div className="options">
              <label>
                <input
                  type="radio"
                  value="UPI"
                  checked={selectedPaymentMethod === "UPI"}
                  onChange={handlePaymentMethodChange}
                />
                UPI
              </label>
              <label>
                <input
                  type="radio"
                  value="DebitCreditCard"
                  checked={selectedPaymentMethod === "DebitCreditCard"}
                  onChange={handlePaymentMethodChange}
                />
                Debit/Credit Card
              </label>
              <label>
                <input
                  type="radio"
                  value="NetBanking"
                  checked={selectedPaymentMethod === "NetBanking"}
                  onChange={handlePaymentMethodChange}
                />
                Net Banking
              </label>
              <label>
                <input
                  type="radio"
                  value="MobileWallets"
                  checked={selectedPaymentMethod === "MobileWallets"}
                  onChange={handlePaymentMethodChange}
                />
                Mobile Wallets
              </label>
              <label>
                <input
                  type="radio"
                  value="GiftVoucher"
                  checked={selectedPaymentMethod === "GiftVoucher"}
                  onChange={handlePaymentMethodChange}
                />
                Gift Voucher
              </label>
              <label>
                <input
                  type="radio"
                  value="RedeemPoints"
                  checked={selectedPaymentMethod === "RedeemPoints"}
                  onChange={handlePaymentMethodChange}
                />
                Redeem Points
              </label>
            </div>
          </div>
          <div className="payment-details">
            {selectedPaymentMethod === "UPI" && (
              <div className="payment-card">
                <h3>UPI</h3>
                <input type="text" placeholder="Enter UPI ID" />
                <button onClick={handlePayment}>Verify and Pay</button>
              </div>
            )}
            {selectedPaymentMethod === "DebitCreditCard" && (
              <div className="payment-card">
                <h3>Debit/Credit Card</h3>
                <input type="text" placeholder="Enter your card number" />
                <div className="card-details">
                  <input type="text" placeholder="MM" />
                  <input type="text" placeholder="YY" />
                  <input type="text" placeholder="CVV" />
                </div>
                <input type="text" placeholder="Name on the Card" />
                <button onClick={handlePayment}>Verify and Pay</button>
              </div>
            )}
            {selectedPaymentMethod === "NetBanking" && (
              <div className="payment-card">
                <h3>Net Banking</h3>
                <select>
                  <option>Select Bank</option>
                  <option>Bank 1</option>
                  <option>Bank 2</option>
                  <option>Bank 3</option>
                </select>
                <button onClick={handlePayment}>Pay</button>
              </div>
            )}
            {selectedPaymentMethod === "MobileWallets" && (
              <div className="payment-card">
                <h3>Mobile Wallets</h3>
                <div className="wallet-options">
                  <button>Amazon Wallet</button>
                  <button>Paytm Wallet</button>
                </div>
              </div>
            )}
            {selectedPaymentMethod === "GiftVoucher" && (
              <div className="payment-card">
                <h3>Gift Voucher</h3>
                <input type="text" placeholder="Enter Promo Code" />
                <button onClick={handlePayment}>Apply</button>
              </div>
            )}
            {selectedPaymentMethod === "RedeemPoints" && (
              <div className="payment-card">
                <h3>Redeem Points</h3>
                <p style={{ marginLeft: "20px" }}>
                  You have X points remaining
                </p>
                <button onClick={handlePayment}>Redeem</button>
              </div>
            )}
          </div>
        </div>
        <div className="order-summary">
          <h2>Booking Summary</h2>
          <hr color="grey" />

          <h4>Movie Title: {event.title}</h4>
          <h4>Language: {event.language}</h4>
          <h4>Venue: {venueName}</h4>
          <h4>Date: {slotDate}</h4>
          <h4>Time: {slotTime}</h4>

          <hr color="grey" />
          <div className="order-items">
            <div className="seats-summary">
              <h4>Seats:</h4>
              <ul>
                {seatDetails.map((seat) => (
                  <li key={seat.seatId}>
                    <span>{seat.seatNo}</span>
                    <span className="item-price">₹{seat.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="food-summary">
              <h4>Food & Beverages:</h4>
              <ul>
                {selectedItems.map((item) => (
                  <li key={item.id}>
                    <span>{item.name}</span>
                    <span className="item-price">₹{item.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <hr color="grey" />
          <div className="total-amount">
            <h3>Total Amount: ₹{totalAmount.toFixed(2)}</h3>
          </div>
        </div>
      </div>

      {showConfirmation && (
        <div className="confirmation-popup">
          <div className="popup-content">
            <div className="sprinkler-animation"></div>
            <div className="confirmation-message">
              <h2>Booking Confirmed</h2>
              <button onClick={handleGenerate}>Generate Ticket</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
