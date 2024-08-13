import axios from "axios";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Alert, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SignInForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role] = useState(0);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let tempErrors = {};
    let formIsValid = true;

    if (!name.trim()) {
      formIsValid = false;
      tempErrors["name"] = "Name is required";
    }

    if (!email) {
      formIsValid = false;
      tempErrors["email"] = "Email is required";
    } else if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
      formIsValid = false;
      tempErrors["email"] = "Email is not valid";
    }

    if (phone && !/^\d{10}$/.test(phone)) {
      formIsValid = false;
      tempErrors["phone"] = "Phone number is not valid";
    }

    if (!password) {
      formIsValid = false;
      tempErrors["password"] = "Password is required";
    } else if (password.length < 6) {
      formIsValid = false;
      tempErrors["password"] = "Password must have at least 6 characters";
    }

    setErrors(tempErrors);
    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("form submitted");
    if(!validateForm()){
      return;
    }
    try {
      const result= await axios
        .post(process.env.REACT_APP_BACKEND_URL + "/auth/register", {
          name,
          email,
          password,
          phoneNumber: phone,
          role,
        });
        
          if (result.data.status === 200) {
            navigate("/login");
          } else {
            setErrors({server:result.data.message});
          }
        
        }catch(error){
          console.log(error);
            setErrors({
              server:error.response?.data?.message || "Error occured",
            });
           
          }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
      className="App"
    >
      <form
        onSubmit={handleSubmit}
        style={{ color: "white", width: "60%", maxWidth: "400px" }}
      >
        <Grid
          container
          spacing={2}
          style={{
            backgroundColor: "#E2E2E2",
            padding: "35px",
            borderRadius: "20px",
            opacity: 10,
          }}
        >
          <Typography
            variant="h5"
            marginLeft={9}
            sx={{ fontFamily: "-apple-system" }}
            style={{ color: "black" }}
          >
            Never miss a show...
          </Typography>
          <Grid item xs={11.5}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={name}
              sx={{ boxShadow: 3, borderRadius: 1, backgroundColor: "white" }}
              onChange={(e) => setName(e.target.value)}
              InputProps={{ style: { color: "black" } }}
              InputLabelProps={{ style: { color: "grey" } }}
            />
          </Grid>
          <Grid item xs={11.5}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              sx={{ boxShadow: 3, borderRadius: 1, backgroundColor: "white" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{ style: { color: "black" } }}
              InputLabelProps={{ style: { color: "grey" } }}
            />
          </Grid>
          <Grid item xs={11.5}>
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              sx={{ boxShadow: 3, borderRadius: 1, backgroundColor: "white" }}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              InputProps={{ style: { color: "black" } }}
              InputLabelProps={{ style: { color: "grey" } }}
            />
          </Grid>
          <Grid item xs={11.5}>
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              sx={{ boxShadow: 3, borderRadius: 1, backgroundColor: "white" }}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{ style: { color: "black" } }}
              InputLabelProps={{ style: { color: "grey" } }}
            />
          </Grid>
          <Grid item xs={11.5}>
            <Button
              type="submit"
              variant="contained"
              color="error"
              sx={{ mt: 2, width: "50%", boxShadow: 5, borderRadius: 1 }}
            >
              Sign Up
            </Button>
          </Grid>
          <Typography
            variant="P"
            marginLeft={8}
            marginTop={2}
            style={{ color: "grey" }}
          >
            Already have an account?
            <Link to="/login" style={{ textDecorationLine: "none" }}>
              {" "}
              Login
            </Link>
          </Typography>
        </Grid>
        {Object.keys(errors).map((key) => {
          return (
            errors[key] && (
              <Alert key={key} severity="error" sx={{mt:2, mr:4.5, ml:3.9}}>
                {errors[key]}
              </Alert>
            )
          );
        })}
      </form>
    </div>
  );
}

export default SignInForm;
