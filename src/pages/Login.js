import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from "@mui/material/Alert";

function LoginInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    let errorMessage = "";

    if (!email || !password) {
      errorMessage = "Fill in the required details";
    } else {
      try {
        const result = await axios.post(
          process.env.REACT_APP_BACKEND_URL + "/auth/login",
          {
            email,
            password,
          }
        );

        if (result.data.status === 200) {
          localStorage.setItem("token", result.data.token);
          localStorage.setItem("name", result.data.name);
          navigate("/");
        } else {
          errorMessage = "Invalid password and email";
        }
      } catch (error) {
        console.error(error);
        errorMessage = "An error occurred during login";
      }
    }
    setError(errorMessage);
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
        onSubmit={handleLogin}
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
            marginLeft={12}
            sx={{ fontFamily: "-apple-system" }}
            style={{ color: "black" }}
          >
            Welcome back!
          </Typography>
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
              Login
            </Button>
          </Grid>
          <Typography
            variant="P"
            marginLeft={8}
            marginTop={1}
            style={{ color: "grey" }}
          >
            Don't have an account?{" "}
            <Link to="/register" style={{ textDecorationLine: "none" }}>
              SignUp
            </Link>
          </Typography>
        </Grid>
        {error && (
          <Alert sx={{ mt: 2, mr: 9.5, ml: 7 }} severity="error">
            {error}
          </Alert>
        )}
      </form>
    </div>
  );
}

export default LoginInForm;
