import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getData } from "../services/storageService";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";

export default function Login() {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const users = getData("users") || [];
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
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, bgcolor: "#f4f6f8" }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ color: "#2c3e50" }}
        >
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              variant="outlined"
              sx={{ bgcolor: "#ffffff" }}
            />
          </Box>
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              variant="outlined"
              sx={{ bgcolor: "#ffffff" }}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                bgcolor: "#2ecc71",
                color: "#ffffff",
                "&:hover": { bgcolor: "#27ae60" },
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
                color: "#2ecc71",
                borderColor: "#2ecc71",
                "&:hover": { borderColor: "#27ae60", color: "#27ae60" },
              }}
            >
              Criar Conta
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}
