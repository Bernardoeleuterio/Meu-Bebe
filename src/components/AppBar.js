import React from "react";
import { useNavigate } from "react-router-dom";
import "./AppBar.css";

const AppBar = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div className="app-bar">
      <span className="title">{title}</span>
      <button className="settings-btn" onClick={() => navigate("/settings")}>
        Configurações
      </button>
    </div>
  );
};

export default AppBar;
