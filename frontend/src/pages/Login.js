import { Button, Container, Paper, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import { routes } from "../routes";

export default function Login({ setUser }) {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [err, setErr] = useState();
  const inputStyle = { width: "100%", marginBottom: 2 };

  const handleButtonClick = (e) => {
    e.preventDefault();
    const userEmail = inputValue.trim();
    if (userEmail) {
      fetch(api.auth, {
        method: "POST",
        body: JSON.stringify({ user: userEmail }),
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.user) {
            setUser(data.user);
            navigate(routes.rooms);
          } else if (data.error) {
            setErr(data.error);
          }
        });
    }
  };

  return (
    <Container maxWidth="md">
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{ height: "90vh" }}
      >
        <Paper style={{ padding: 100 }} elevation={6}>
          <form onSubmit={handleButtonClick}>
            <TextField
              required
              type="email"
              label="your email"
              value={inputValue}
              sx={inputStyle}
              onChange={(e) => setInputValue(e.target.value)}
              helperText={err ? err : ""}
              error={Boolean(err)}
            />
            <Button variant="outlined" sx={inputStyle} type="submit">
              sing in
            </Button>
          </form>
        </Paper>
      </Grid>
    </Container>
  );
}
