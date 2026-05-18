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
  Snackbar,
  Alert,
} from "@mui/material";
import CustomAppBar from "../components/AppBar";
import "../styles/Login.css";

export default function Login() {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
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
      setSnackbarMessage("Login bem-sucedido!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setTimeout(() => navigate("/home"), 1500);
    } else {
      setSnackbarMessage("Usuário não encontrado ou senha incorreta.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const redirectToRegister = () => {
    navigate("/register");
  };

  return (
    <Container className="auth-container" maxWidth="sm">
      <Paper className="auth-card" elevation={5}>
        <CustomAppBar title="Entrar" showSettings={false} showBack={false} />
        <Box className="auth-header">
          <Typography variant="h4">
            Bem-vindo de volta
          </Typography>
          <Typography variant="body1">
            Acesse suas informações do bebê de forma rápida e segura.
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleLogin} className="auth-form">
          <TextField
            fullWidth
            label="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            variant="outlined"
            className="auth-textfield"
          />
          <TextField
            fullWidth
            label="Senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            variant="outlined"
            className="auth-textfield"
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            className="auth-btn-primary"
          >
            Entrar
          </Button>

          <Button
            type="button"
            variant="contained"
            onClick={redirectToRegister}
            size="large"
            className="auth-btn-secondary"
          >
            Criar Conta
          </Button>
        </Box>
      </Paper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          className="snackbar-alert"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}
