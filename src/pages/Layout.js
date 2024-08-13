import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Lottie from "lottie-react";
import animationData from "../assets/logo-animation.json";
import { Button, Menu, MenuItem, IconButton, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import AccountCircle from "@mui/icons-material/AccountCircle"; 
 
const NavLink = styled(Link)({
  textDecoration: "none",
  color: "white",
  position: "relative",
  transition: "color 0.3s ease",
 
  "&::after": {
    content: '""',
    position: "absolute",
    width: 0,
    height: "2px",
    display: "block",
    marginTop: "5px",
    right: 0,
    background: "red",
    transition: "width 0.4s ease",
    webkitTransition: "width 0.4s ease",
  },
 
  "&:hover": {
    color: "red",
 
    "&::after": {
      width: "100%",
      left: 0,
      background: "red",
    },
  },
});
 
function Layout() {
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("name");
  const [anchorEl, setAnchorEl] = useState(null);
 
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
 
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
 
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    handleMenuClose();
    window.location.reload();
  };
 
  return (
    <div>
      <AppBar
        sx={{ height: "75px", backgroundColor: "black" }}
        position="sticky"
      >
        <Toolbar>
          <Lottie
            animationData={animationData}
            loop
            style={{ width: "120px", height: "80px",marginLeft:"22px"}}
          />
          <Typography variant="h7" component="div" marginLeft={33}>
            <NavLink to="/">HOME</NavLink>
          </Typography>
          <Typography variant="h7" component="div" marginLeft={10}>
            <NavLink to="/movies">MOVIES</NavLink>
          </Typography>
          <Typography variant="h7" component="div" marginLeft={10}>
            <NavLink to="/events">EVENTS</NavLink>
          </Typography>
          <Typography variant="h7" component="div" marginLeft={10}>
            <NavLink to="/concerts">CONCERTS</NavLink>
          </Typography>
          <Typography
            variant="h7"
            component="div"
            marginLeft={10}
            marginRight={30}
          >
            <NavLink to="/aboutus">ABOUT US</NavLink>
          </Typography>
 
          {userName != null ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                color: "red",
                cursor: "pointer",
              }}
              onClick={handleMenuClick}
            >
              <AccountCircle sx={{ color: "red" }} />
              <Typography
                variant="h6"
                component="div"
                marginRight={1}
                color="red"
                padding={1}
              >
                <Link
                    to="/profile"
                    style={{ textDecoration: "none", color: "red" }}
                  >
                    {userName}
                  </Link>
               
              </Typography>
              {/* <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>
                  <Link
                    to="/profile"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Profile
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
              </Menu> */}
            </Box>
          ) : (
            <Button  variant="contained" color="error" sx={{ boxShadow: 5,marginLeft:"30px" }}>
              <Link
                to="/register"
                style={{ textDecoration: "none", color: "white" }}
              >
                Sign Up
              </Link>
            </Button>
          )}
        </Toolbar>
        <Outlet />
      </AppBar>
    </div>
  );
}
 
export default Layout;