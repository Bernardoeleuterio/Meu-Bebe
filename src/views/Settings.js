import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getData, saveData } from "../services/storageService";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Modal,
} from "@mui/material";
import "./Settings.css";

export default function Settings() {
  const navigate = useNavigate();

  const [babyData, setBabyData] = useState({
    nomeBebe: "",
    pesoBebe: "",
    comprimentoBebe: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const data = getData("informacoesBebe") || {};
    setBabyData({
      nomeBebe: data.nomeBebe || "",
      pesoBebe: data.pesoBebe || "",
      comprimentoBebe: data.comprimentoBebe || "",
    });
  }, []);

  const handleEdit = () => setIsEditing(true);

  const handleSave = () => {
    saveData("informacoesBebe", babyData);
    alert("Configurações salvas com sucesso!");
    setIsEditing(false);
    navigate("/home");
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    alert("Logout bem-sucedido.");
    navigate("/");
  };

  const handleBack = () => navigate(-1);

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 5,
        bgcolor: "#4caf50",
        color: "#fff",
        p: 3,
        borderRadius: 2,
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Configurações do Bebê
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">
          <strong>Nome:</strong> {babyData.nomeBebe}
        </Typography>
        <Typography variant="h6">
          <strong>Peso:</strong> {babyData.pesoBebe} kg
        </Typography>
        <Typography variant="h6">
          <strong>Comprimento:</strong> {babyData.comprimentoBebe} cm
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Button
          variant="contained"
          sx={{ bgcolor: "#388e3c", "&:hover": { bgcolor: "#2e7d32" } }}
          onClick={handleEdit}
        >
          Editar
        </Button>
        <Button
          variant="outlined"
          sx={{
            color: "#f44336",
            borderColor: "#f44336",
            "&:hover": { bgcolor: "#f44336", color: "#fff" },
          }}
          onClick={handleLogout}
        >
          Sair
        </Button>
        <Button
          variant="outlined"
          sx={{
            color: "#fff",
            borderColor: "#fff",
            "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
          }}
          onClick={handleBack}
        >
          Voltar
        </Button>
      </Box>

      <Modal open={isEditing} onClose={() => setIsEditing(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" align="center" gutterBottom>
            Editar Informações
          </Typography>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
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
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              <Button
                variant="contained"
                sx={{ bgcolor: "#388e3c", "&:hover": { bgcolor: "#2e7d32" } }}
                onClick={handleSave}
              >
                Salvar
              </Button>
              <Button
                variant="outlined"
                sx={{
                  color: "#f44336",
                  borderColor: "#f44336",
                  "&:hover": { bgcolor: "#f44336", color: "#fff" },
                }}
                onClick={() => setIsEditing(false)}
              >
                Cancelar
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
}
