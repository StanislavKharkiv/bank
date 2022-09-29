import { Container, Paper, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { routes } from "../routes";

export default function Home({ user }) {
  return (
    <Container maxWidth="sm" sx={{ height: "100vh", display: "flex" }}>
      <Paper sx={{ padding: 10, margin: "auto" }} elevation={6}>
        <Typography variant="h5" align="center" gutterBottom>
          Super Bank
        </Typography>
        {user ? (
          <Link to={routes.rooms}>
            <Button variant="outlined">show rooms</Button>
          </Link>
        ) : (
          <Link to={routes.login}>
            <Button variant="outlined">go to personal account</Button>
          </Link>
        )}
      </Paper>
    </Container>
  );
}
