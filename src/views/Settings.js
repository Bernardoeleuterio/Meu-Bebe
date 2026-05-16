import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCurrentUser,
  getUserData,
  saveUserData,
} from "../services/storageService";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Modal,
  Snackbar,
  Alert,
} from "@mui/material";
import CustomAppBar from "../components/AppBar";
import "./Settings.css";

export default function Settings() {
  const navigate = useNavigate();

  const [babyData, setBabyData] = useState({
    nomeBebe: "",
    pesoBebe: "",
    comprimentoBebe: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate("/");
      return;
    }

    const data = getUserData("informacoesBebe") || {};
    setBabyData({
      nomeBebe: data.nomeBebe || "",
      pesoBebe: data.pesoBebe || "",
      comprimentoBebe: data.comprimentoBebe || "",
    });
  }, [navigate]);

  const handleEdit = () => setIsEditing(true);

  const handleSave = () => {
    saveUserData("informacoesBebe", babyData);
    setSnackbarMessage("Configurações salvas com sucesso!");
    setSnackbarOpen(true);
    setIsEditing(false);
    setTimeout(() => navigate("/home"), 1500);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    setSnackbarMessage("Logout bem-sucedido.");
    setSnackbarOpen(true);
    setTimeout(() => navigate("/"), 1500);
  };

  const handleBack = () => navigate(-1);

  return (
    <Container maxWidth="sm" className="settings-container">
      <Box className="settings-card">
        <CustomAppBar title="Configurações" showSettings={false} />

        <Box className="settings-hero">
          <Typography variant="h4">
            Configurações do Bebê
          </Typography>
          <Typography variant="body1">
            Atualize os dados do bebê e mantenha o app personalizado para você.
          </Typography>
        </Box>

        <Box className="settings-info">
          <Box className="settings-stat">
            <Typography variant="subtitle2">
              Nome do bebê
            </Typography>
            <Typography variant="h6">
              {babyData.nomeBebe || "Não informado"}
            </Typography>
          </Box>
          <Box className="settings-stat">
            <Typography variant="subtitle2">
              Peso
            </Typography>
            <Typography variant="h6">
              {babyData.pesoBebe ? `${babyData.pesoBebe} kg` : "Não informado"}
            </Typography>
          </Box>
          <Box className="settings-stat">
            <Typography variant="subtitle2">
              Comprimento
            </Typography>
            <Typography variant="h6">
              {babyData.comprimentoBebe ? `${babyData.comprimentoBebe} cm` : "Não informado"}
            </Typography>
          </Box>
        </Box>

        <Box className="settings-actions">
          <Button
            variant="contained"
            className="settings-btn-edit"
            onClick={handleEdit}
          >
            Editar
          </Button>
          <Button
            variant="contained"
            className="settings-btn-logout"
            onClick={handleLogout}
          >
            Sair
          </Button>
          <Button
            variant="contained"
            className="settings-btn-back"
            onClick={handleBack}
          >
            Voltar
          </Button>
        </Box>

        <Modal open={isEditing} onClose={() => setIsEditing(false)}>
          <Box className="settings-modal-content">
            <Typography variant="h6" className="settings-modal-title">
              Editar Informações
            </Typography>
            <Box className="settings-form">
              <TextField
                fullWidth
                label="Nome do Bebê"
                value={babyData.nomeBebe}
                onChange={(e) =>
                  setBabyData({ ...babyData, nomeBebe: e.target.value })
                }
              />
              <TextField
                fullWidth
                label="Peso (kg)"
                type="number"
                value={babyData.pesoBebe}
                onChange={(e) =>
                  setBabyData({ ...babyData, pesoBebe: e.target.value })
                }
              />
              <TextField
                fullWidth
                label="Comprimento (cm)"
                type="number"
                value={babyData.comprimentoBebe}
                onChange={(e) =>
                  setBabyData({ ...babyData, comprimentoBebe: e.target.value })
                }
              />
              <Box className="settings-form-actions">
                <Button
                  variant="contained"
                  className="settings-btn-save"
                  onClick={handleSave}
                >
                  Salvar
                </Button>
                <Button
                  variant="outlined"
                  className="settings-btn-cancel"
                  onClick={() => setIsEditing(false)}
                >
                  Cancelar
                </Button>
              </Box>
            </Box>
          </Box>
        </Modal>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity="success"
            className="snackbar-alert"
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
}
