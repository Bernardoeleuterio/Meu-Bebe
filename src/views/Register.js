import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveGlobalData, getGlobalData, setCurrentUser } from "../services/storageService";
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
import "../styles/Register.css";

export default function Register() {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nome || !senha) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const users = getGlobalData("users") || [];
    const userExists = users.some((user) => user.nome === nome);

    if (userExists) {
      alert("Este nome de usuário já existe. Escolha outro.");
      return;
    }

    const newUser = { nome, senha };
    saveGlobalData("users", [...users, newUser]);
    setCurrentUser(nome);

    setSnackbarMessage("Conta criada com sucesso!");
    setSnackbarOpen(true);
    setTimeout(() => navigate("/home"), 1500);
  };

  const redirectToLogin = () => {
    navigate("/");
  };

  return (
    <Container className="register-container" maxWidth="sm">
      <Paper className="register-card" elevation={5}>
        <CustomAppBar title="Criar Conta" showSettings={false} showBack={false} />
        <Box className="register-header">
          <Typography variant="h4">
            Crie sua conta
          </Typography>
          <Typography variant="body1">
            Registre-se para acompanhar o desenvolvimento do seu bebê.
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit} className="register-form">
          <TextField
            fullWidth
            label="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            variant="outlined"
            className="register-textfield"
          />
          <TextField
            fullWidth
            label="Senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            variant="outlined"
            className="register-textfield"
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            className="register-btn-submit"
          >
            Registrar
          </Button>

          <Button
            type="button"
            variant="contained"
            onClick={redirectToLogin}
            size="large"
            className="register-btn-back"
          >
            Voltar para Login
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
          severity="success"
          className="snackbar-alert"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}
