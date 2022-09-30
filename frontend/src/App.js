import React, { useEffect, useLayoutEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Rooms from "./pages/Rooms";
import RoomDetail from "./pages/RoomDetail";
import { routes } from "./routes";
import { Loader } from "./components/Loader";
import { api } from "./api";
import "./App.css";


function App() {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(api.auth)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        if (data.user) {
          setCurrentUser(data.user);
        }
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader />

  return (
    <BrowserRouter>
      {currentUser ? (
        <Routes>
          <Route path={routes.home} element={<Home user={currentUser} />} />
          <Route path={routes.rooms} element={<Rooms user={currentUser} setUser={setCurrentUser} />} />
          <Route path={routes.room('id')} element={<RoomDetail />} />
          <Route path="*" element={ <Navigate to={routes.rooms} />}  />
        </Routes>
      ) : (
        <Routes>
          <Route path={routes.home} element={<Home user={currentUser} />} />
          <Route path={routes.login} element={<Login setUser={setCurrentUser} />} />
          <Route path="*" element={ <Navigate to={routes.login} />}  />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
