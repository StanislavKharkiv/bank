import { AppBar, Toolbar, Typography, Button, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";
import { routes } from "../../routes";

export function Header({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    fetch(api.auth, { method: "DELETE" }).then(() => {
      setUser(null)
      navigate(routes.home);
    });
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Super Bank
        </Typography>
        <Typography component="div">{user}</Typography>
        <Divider
          orientation="vertical"
          flexItem
          sx={{ background: "white", margin: "12px" }}
        />
        <Button color="inherit" variant="outlined" onClick={handleLogoutClick}>
          logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
