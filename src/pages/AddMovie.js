import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from "@mui/material/Alert";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";

function AddMovie() {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [language, setLanguage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [venueName, setVenueName] = useState("");
  const [date, setDate] = useState(null);
  const [slot, setSlot] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAddMovie = async (e) => {
    e.preventDefault();
    let errorMessage = "";

    if (!title || !genre || !language || !imageUrl || !description || !location || !venueName || !date || !slot) {
      errorMessage = "Fill in all the required details";
    } else {
      try {
        const result = await axios.post(
          process.env.REACT_APP_BACKEND_URL + "/movies",
          {
            title,
            genre,
            language,
            imageUrl,
            description,
            location,
            venueName,
            date,
            slot,
          }
        );

        if (result.data.status === 200) {
          navigate("/movies");
        } else {
          errorMessage = "Failed to add movie";
        }
      } catch (error) {
        console.error(error);
        errorMessage = "An error occurred while adding the movie";
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
        onSubmit={handleAddMovie}
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
            Add Movies
          </Typography>
          <Grid item xs={11.5}>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              sx={{ boxShadow: 3, borderRadius: 1, backgroundColor: "white" }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              InputProps={{ style: { color: "black" } }}
              InputLabelProps={{ style: { color: "grey" } }}
            />
          </Grid>
          <Grid item xs={11.5}>
            <TextField
              label="Genre"
              variant="outlined"
              fullWidth
              sx={{ boxShadow: 3, borderRadius: 1, backgroundColor: "white" }}
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              InputProps={{ style: { color: "black" } }}
              InputLabelProps={{ style: { color: "grey" } }}
            />
          </Grid>
          <Grid item xs={11.5}>
            <TextField
              label="Language"
              variant="outlined"
              fullWidth
              sx={{ boxShadow: 3, borderRadius: 1, backgroundColor: "white" }}
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              InputProps={{ style: { color: "black" } }}
              InputLabelProps={{ style: { color: "grey" } }}
            />
          </Grid>
          <Grid item xs={11.5}>
            <TextField
              label="Image URL"
              variant="outlined"
              fullWidth
              sx={{ boxShadow: 3, borderRadius: 1, backgroundColor: "white" }}
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              InputProps={{ style: { color: "black" } }}
              InputLabelProps={{ style: { color: "grey" } }}
            />
          </Grid>
          <Grid item xs={11.5}>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              sx={{ boxShadow: 3, borderRadius: 1, backgroundColor: "white" }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              InputProps={{ style: { color: "black" } }}
              InputLabelProps={{ style: { color: "grey" } }}
            />
          </Grid>
          <Grid item xs={11.5}>
            <TextField
              label="Location"
              variant="outlined"
              fullWidth
              sx={{ boxShadow: 3, borderRadius: 1, backgroundColor: "white" }}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              InputProps={{ style: { color: "black" } }}
              InputLabelProps={{ style: { color: "grey" } }}
            />
          </Grid>
          <Grid item xs={11.5}>
            <TextField
              label="Venue Name"
              variant="outlined"
              fullWidth
              sx={{ boxShadow: 3, borderRadius: 1, backgroundColor: "white" }}
              value={venueName}
              onChange={(e) => setVenueName(e.target.value)}
              InputProps={{ style: { color: "black" } }}
              InputLabelProps={{ style: { color: "grey" } }}
            />
          </Grid>
          <Grid item xs={11.5}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date"
                value={date}
                onChange={(newValue) => setDate(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    sx={{ boxShadow: 3, borderRadius: 1, backgroundColor: "white" }}
                    InputProps={{ style: { color: "black" } }}
                    InputLabelProps={{ style: { color: "grey" } }}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={11.5}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                label="Slot"
                value={slot}
                onChange={(newValue) => setSlot(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    sx={{ boxShadow: 3, borderRadius: 1, backgroundColor: "white" }}
                    InputProps={{ style: { color: "black" } }}
                    InputLabelProps={{ style: { color: "grey" } }}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={11.5}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2, width: "50%", boxShadow: 5, borderRadius: 1 }}
            >
              Add Movie
            </Button>
          </Grid>
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

export default AddMovie;
