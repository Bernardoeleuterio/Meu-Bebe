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
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        py: 6,
      }}
    >
      <Box className="settings-card" sx={{ width: "100%" }}>
        <CustomAppBar title="Configurações" showSettings={false} showBack={true} />

        <Box
          className="settings-hero"
          sx={{
            p: 3,
            borderRadius: 3,
            background: "linear-gradient(135deg, #22c55e, #0f766e)",
            color: "#fff",
            mb: 4,
          }}
        >
          <Typography variant="h4" align="center" sx={{ fontWeight: 700 }}>
            Configurações do Bebê
          </Typography>
          <Typography variant="body1" align="center" sx={{ mt: 1, color: "rgba(255,255,255,0.9)" }}>
            Atualize os dados do bebê e mantenha o app personalizado para você.
          </Typography>
        </Box>

        <Box className="settings-info" sx={{ mb: 3 }}>
          <Box className="settings-stat">
            <Typography variant="subtitle2" color="#64748b">
              Nome do bebê
            </Typography>
            <Typography variant="h6" sx={{ color: "#0f172a" }}>
              {babyData.nomeBebe || "Não informado"}
            </Typography>
          </Box>
          <Box className="settings-stat">
            <Typography variant="subtitle2" color="#64748b">
              Peso
            </Typography>
            <Typography variant="h6" sx={{ color: "#0f172a" }}>
              {babyData.pesoBebe ? `${babyData.pesoBebe} kg` : "Não informado"}
            </Typography>
          </Box>
          <Box className="settings-stat">
            <Typography variant="subtitle2" color="#64748b">
              Comprimento
            </Typography>
            <Typography variant="h6" sx={{ color: "#0f172a" }}>
              {babyData.comprimentoBebe ? `${babyData.comprimentoBebe} cm` : "Não informado"}
            </Typography>
          </Box>
        </Box>

        <Box className="settings-actions">
          <Button
            variant="contained"
            sx={{
              bgcolor: "#16a34a",
              color: "#ffffff",
              fontWeight: 700,
              py: 1.4,
              borderRadius: 3,
              minWidth: 140,
              "&:hover": { bgcolor: "#15803d" },
            }}
            onClick={handleEdit}
          >
            Editar
          </Button>
          <Button
            variant="outlined"
            sx={{
              color: "#ef4444",
              borderColor: "#ef4444",
              py: 1.4,
              borderRadius: 3,
              minWidth: 140,
              fontWeight: 700,
              "&:hover": { bgcolor: "rgba(239, 68, 68, 0.08)" },
            }}
            onClick={handleLogout}
          >
            Sair
          </Button>
          <Button
            variant="outlined"
            sx={{
              color: "#0f172a",
              borderColor: "#0f172a",
              py: 1.4,
              borderRadius: 3,
              minWidth: 140,
              fontWeight: 700,
              "&:hover": { bgcolor: "rgba(15, 23, 42, 0.08)" },
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
              borderRadius: 3,
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
      </Box>
    </Container>
  );
}
