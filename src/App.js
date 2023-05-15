import React from "react";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import AddNew from "./pages/AddNew";
import Edit from "./pages/Edit";


function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addnew" element={<AddNew />} />
        <Route path="/edit/:id" element={<Edit/>} />
      </Routes>

    </div>
  );
}

export default App;
