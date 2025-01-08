import React from "react";
import './App.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Gallery from "./components/gallery/Gallery";
import HitDetails from "./components/gallery/HitDetails";
import Navbar from "./components/layout/NavBar";
import Home from "./components/Home/Home";
import Meteo from "./components/Meteo/Meteo";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/hitDetails/:id" element={<HitDetails />} />
          <Route path="/meteo" element={<Meteo />} />
          <Route path="/" element={<Home />} /> {}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
