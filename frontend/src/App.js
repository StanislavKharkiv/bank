import React, { useEffect, useState, createContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Rooms from "./pages/Rooms";
import RoomDetail from "./pages/RoomDetail";
import { routes } from "./routes";
import { Loader } from "./components/Loader";
import { api } from "./api";

export const AppContext = createContext();

function App() {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);

  useEffect(() => {
    fetch(api.auth)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.user) {
          setCurrentUser(data.user);
        }
        setLoading(false);
      })
      .catch((error) => {
        setErr(true);
      });
  }, []);

  if (loading) return <Loader error={err} />;

  return (
    <AppContext.Provider value={{ currentUser, setCurrentUser }}>
      <BrowserRouter>
        {currentUser ? (
          <Routes>
            <Route path={routes.home} element={<Home user={currentUser} />} />
            <Route path={routes.rooms} element={<Rooms />} />
            <Route path={routes.room("id")} element={<RoomDetail />} />
            <Route path="*" element={<Navigate to={routes.rooms} />} />
          </Routes>
        ) : (
          <Routes>
            <Route path={routes.home} element={<Home user={currentUser} />} />
            <Route
              path={routes.login}
              element={<Login setUser={setCurrentUser} />}
            />
            <Route path="*" element={<Navigate to={routes.login} />} />
          </Routes>
        )}
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
