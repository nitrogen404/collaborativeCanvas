import React, {useState} from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import HomePage from "./components/HomePage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import CanvasPage from "./components/CanvasPage";

const App = () => {
  return (
    <GoogleOAuthProvider clientId="648378633323-71p6o6pujc5feh1m8l30qb11l97chv5t.apps.googleusercontent.com">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/canvas" element={<CanvasPage/>} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
