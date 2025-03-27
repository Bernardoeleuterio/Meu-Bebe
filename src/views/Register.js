import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveData, getData } from "../services/storageService";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";

export default function Register() {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (nome && senha) {
      const users = getData("users") || [];
      const newUser = { nome, senha };

      saveData("users", [...users, newUser]);

      saveData("fraldas", []);
      saveData("sono", []);
      saveData("amamentacao", []);

      alert("Conta criada com sucesso!");
      navigate("/");
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  };

  const redirectToLogin = () => {
    navigate("/");
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
          Registro
        </Typography>
        <form onSubmit={handleSubmit}>
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
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
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
              Registrar
            </Button>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="outlined"
              onClick={redirectToLogin}
              size="large"
              sx={{
                color: "#2ecc71",
                borderColor: "#2ecc71",
                "&:hover": { borderColor: "#27ae60", color: "#27ae60" },
              }}
            >
              Voltar para Login
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}
