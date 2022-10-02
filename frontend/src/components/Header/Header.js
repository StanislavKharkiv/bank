import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Divider } from "@mui/material";
import { api } from "../../api";
import { routes } from "../../routes";
import { AppContext } from "../../App";

export function Header() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(AppContext);

  const handleLogoutClick = () => {
    fetch(api.auth, { method: "DELETE" }).then((resp) => {
      if (resp.ok) {
        setCurrentUser(null);
        navigate(routes.home);
      }
    });
  };

  return (
    <AppBar position="static" sx={{mb: 4}}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Super Bank
        </Typography>
        <Typography component="div">{currentUser}</Typography>
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
