import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getGlobalData, getCurrentUser } from "../services/storageService";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import CustomAppBar from "../components/AppBar";

export default function Login() {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const current = getCurrentUser();
    if (current) {
      navigate("/home");
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    const users = getGlobalData("users") || [];
    const userExists = users.find(
      (user) => user.nome === nome && user.senha === senha
    );

    if (userExists) {
      localStorage.setItem("loggedUser", nome);
      alert("Login bem-sucedido!");
      navigate("/home");
    } else {
      alert("Usuário não encontrado ou senha incorreta.");
    }
  };

  const redirectToRegister = () => {
    navigate("/register");
  };

  return (
    <Container className="auth-container" maxWidth="sm">
      <Paper className="auth-card" elevation={5} sx={{
          width: "100%",
          p: { xs: 4, sm: 5 },
          borderRadius: 4,
          bgcolor: "rgba(255,255,255,0.96)",
          backdropFilter: "blur(12px)",
        }}
      >
        <CustomAppBar title="Entrar" showSettings={false} showBack={false} />
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ color: "#0f172a", fontWeight: 700 }}
          >
            Bem-vindo de volta
          </Typography>
          <Typography variant="body1" sx={{ color: "#475569" }}>
            Acesse suas informações do bebê de forma rápida e segura.
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleLogin} sx={{ display: "grid", gap: 2 }}>
          <TextField
            fullWidth
            label="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            variant="outlined"
            sx={{ bgcolor: "#f8fafc" }}
          />
          <TextField
            fullWidth
            label="Senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            variant="outlined"
            sx={{ bgcolor: "#f8fafc" }}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{
              bgcolor: "#22c55e",
              color: "#ffffff",
              fontWeight: 700,
              py: 1.5,
              borderRadius: 3,
              boxShadow: "0 12px 24px rgba(34, 197, 94, 0.18)",
              "&:hover": { bgcolor: "#16a34a" },
            }}
          >
            Entrar
          </Button>

          <Button
            type="button"
            variant="outlined"
            onClick={redirectToRegister}
            size="large"
            sx={{
              color: "#0f766e",
              borderColor: "#0f766e",
              py: 1.5,
              borderRadius: 3,
              fontWeight: 700,
              "&:hover": { bgcolor: "rgba(15, 118, 110, 0.08)" },
            }}
          >
            Criar Conta
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
