import React, { useRef } from "react";
import "../styles/Ticket.css";
import Layout from "./Layout";
import { useLocation } from "react-router-dom";
import Typewriter from "typewriter-effect";
import Lottie from "lottie-react";
import ticketAnimation from "../assets/ticket-animation.json";
import QRCode from "qrcode.react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import DownloadIcon from "@mui/icons-material/Download";
import { IconButton } from "@mui/material";
import { red } from "@mui/material/colors";

const Ticket = () => {
  const location = useLocation();
  const { slotTime, slotDate, venueName, seatDetails, bookingId, event } =
    location.state || {};

  const ticketRef = useRef();

  const handleDownloadPDF = () => {
    const input = ticketRef.current;
    html2canvas(input, { useCORS: true })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");

        const scaleFactor = 0.5;
        const pdfWidth = canvas.width * scaleFactor;
        const pdfHeight = canvas.height * scaleFactor;

        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "px",
          format: [pdfWidth, pdfHeight],
          putOnlyUsedFonts: true,
          floatPrecision: 16,
        });

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("ticket.pdf");
      })
      .catch((err) => {
        console.error("Error generating PDF: ", err);
      });
  };

  const handleImageLoad = () => {
    handleDownloadPDF();
  };

  const titleStyle = {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "white",
  };

  const colorThemeStyle = {
    color: "#ff5722",
  };

  const paragraphStyle = {
    fontSize: "1.2rem",
    color: "red",
  };

  const title = event.title;

  return (
    <div className="Tickets">
      <Layout />
      <div className="confirmation-page">
        <div className="confirmation-message">
          <div>
            <Lottie
              animationData={ticketAnimation}
              loop
              style={{ width: "200px", height: "200px" }}
            />
            <h1 style={titleStyle}>
              <span className="d-block">Your booking is confirmed. </span> We
              appreciate your choice of entertainment!
              <span style={colorThemeStyle}>
                <Typewriter
                  options={{
                    strings: [
                      "Experience the excitement of your show",
                      title,
                      `within the iconic ${venueName}`,
                      `on ${slotDate} at ${slotTime.slice(0, 5)}`,
                    ],
                    autoStart: true,
                    loop: true,
                    delay: 75,
                  }}
                />
              </span>
            </h1>
            <p style={paragraphStyle}>
              Safe, secure, reliable ticketing. Your ticket to live
              entertainment!
            </p>
          </div>
        </div>
        <div ref={ticketRef} className="ticket">
          <div className="ticket-header">
            <span className="booking-id">Booking ID: {bookingId}</span>
          </div>
          <div className="ticket-poster">
            <img
              src={event.imageUrl}
              alt="Movie Poster"
              className="poster-image"
              crossOrigin="anonymous"
              onLoad={handleImageLoad}
            />
          </div>
          <div className="ticket-details">
            <div className="movie-title">{title}</div>
            <div className="movie-info">
              <div className="date-time">
                <div>Date</div>
                <div>{slotDate}</div>
                <div>Time</div>
                <div>{slotTime.slice(0, 5)}</div>
              </div>
              <div className="venue-seats">
                <div>Venue</div>
                <div>{venueName}</div>
                <div>Seats</div>
                <div>{seatDetails.map((seat) => seat.seatNo).join(", ")}</div>
              </div>
            </div>
            <div className="ticket-qr">
              <QRCode value={bookingId} size={100} />
              <div className="booking-code">{bookingId}</div>
            </div>
          </div>
          <div className="ticket-footer">
            <div className="brand">
              <b>Let's Book</b>
            </div>
            <div className="ticket-type">M-Ticket</div>
          </div>
        </div>
        <IconButton sx={{ top: 10 }} onClick={handleDownloadPDF}>
          <DownloadIcon sx={{ color: red[500] }} />
        </IconButton>
      </div>
    </div>
  );
};

export default Ticket;
