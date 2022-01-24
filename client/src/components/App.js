import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import SignUpPage from "./pages/SignUpPage.js";
import Profile from "./pages/Profile.js";
import NewBet from "./modules/ComposeBet.js"; // import new bet into feed
import GlobalFeed from "./pages/GlobalFeed.js";
import FriendsFeed from "./pages/FriendsFeed.js";
import NavBar from "./modules/NavBar.js";

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);
  const [userName, setUserName] = useState("");
  const [userPoints, setUserPoints] = useState(500);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
        setUserName(user.name);
        setUserPoints(user.points);
      }
    });
  }, []);

  const handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };

  return (
    <>
      <NavBar handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />

      {userId ? (
        <Router>
          <GlobalFeed path="/" />
          <FriendsFeed path="/friends" />
          <Profile path="/profile" userName={userName} points={userPoints}/>
          <NewBet path="/bet" />
          <NotFound default />
        </Router>
      ) : (
        <Router>
          <SignUpPage path="/" />
          <NotFound default />
        </Router>
      )}
    </>
  );
};

export default App;
