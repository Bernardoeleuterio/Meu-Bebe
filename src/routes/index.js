import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../views/Login";
import Register from "../views/Register";
import Settings from "../views/Settings";
import Home from "../views/Home";
import Formulario from "./views/Formulario";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/home" element={<Home />} />
        <Route path="/formulario" element={<Formulario />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
