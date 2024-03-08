import React from "react";

import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Entree from "./pages/entree/Entree";
import Sortie from "./pages/sortie/Sortie";
import Add from "./pages/add/add";
const App = () => {
  const url = "https://badgecom.onrender.com";
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path={url + "/"} element={<Home />}></Route>
          <Route path={url + "/entree"} element={<Entree />}></Route>
          <Route path={url + "/add"} element={<Add />}></Route>
          <Route path={url + "/sortie"} element={<Sortie />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
