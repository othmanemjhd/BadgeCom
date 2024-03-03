import React from "react";

import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Entree from "./pages/entree/Entree";
import Sortie from "./pages/sortie/Sortie";
import Add from "./pages/add/add";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/entree" element={<Entree />}></Route>
          <Route path="/add" element={<Add />}></Route>
          <Route path="/sortie" element={<Sortie />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
