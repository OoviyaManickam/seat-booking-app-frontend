import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import EventDetails from "./pages/EventDetails";
import AboutUs from "./pages/AboutUs";
import SeatBooking from "./pages/SeatBooking";
import Movies from "./pages/Movies";
import Events from "./pages/Events";
import Concerts from "./pages/Concerts";
import BookingSummary from "./pages/BookingSummary";
import Payment from "./pages/Payment";
import Ticket from "./pages/Ticket";
import Profile from "./pages/Profile";
import AdminHome from "./pages/AdminHome";
import AddMovie from "./pages/AddMovie";
 
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/aboutus" element={<AboutUs />}></Route>
          <Route path="/event/:title" element={<EventDetails />}></Route>
          <Route path="/seatbooking" element={<SeatBooking />}></Route>
          <Route path="/movies" element={<Movies />}></Route>
          <Route path="/events" element={<Events />}></Route>
          <Route path="/concerts" element={<Concerts />}></Route>
          <Route path="/bookingsummary" element={<BookingSummary />}></Route>
          <Route path="/payment" element={<Payment />}></Route>
          <Route path="/ticket" element={<Ticket />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/admin" element={<AdminHome />}></Route>
          <Route path="/addmovies" element={<AddMovie />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
 
export default App;