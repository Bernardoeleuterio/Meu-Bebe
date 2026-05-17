import { useNavigate } from "react-router-dom";
import "../styles/AppBar.css";

const AppBar = ({ title, showSettings = true, showBack = false, onBack }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }
    navigate(-1);
  };

  return (
    <div className="app-bar">
      <div className="app-bar-left">
        {showBack && (
          <button className="app-bar-icon-btn" onClick={handleBack} aria-label="Voltar">
            ←
          </button>
        )}
        <span className="title">{title}</span>
      </div>
      <div className="app-bar-actions">
        {showSettings && (
          <button className="settings-btn" onClick={() => navigate("/settings") }>
            Configurações
          </button>
        )}
      </div>
    </div>
  );
};

export default AppBar;
