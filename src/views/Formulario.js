import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Select,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";
import {
  getCurrentUser,
  getUserData,
  saveUserData,
} from "../services/storageService";
import "./Formulario.css";

export default function FormularioRegistro() {
  const [tipo, setTipo] = useState("Fralda");
  const [estado, setEstado] = useState("");
  const [horarioInicio, setHorarioInicio] = useState("");
  const [horarioFim, setHorarioFim] = useState("");
  const [observacao, setObservacao] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [lado, setLado] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [registroDataId, setRegistroDataId] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate("/");
      return;
    }

    if (location.state?.type && location.state?.registroData) {
      const { type, registroData } = location.state;
      const storageKey =
        type === "Fralda"
          ? "fraldas"
          : type === "Sono"
          ? "sono"
          : "amamentacao";
      const registros = getUserData(storageKey) || [];
      const registro = registros.find((item) => item.registroData === registroData);

      if (registro) {
        setTipo(type);
        setEstado(registro.estado || "");
        setHorarioInicio(registro.horarioInicio || "");
        setHorarioFim(registro.horarioFim || "");
        setObservacao(registro.observacao || "");
        setQuantidade(registro.quantidade || "");
        setLado(registro.lado || "");
        setIsEditing(true);
        setRegistroDataId(registroData);
      } else {
        alert("Registro não encontrado para edição.");
        navigate("/home");
      }
    }
  }, [location.state, navigate]);

  const handleSalvar = () => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate("/");
      return;
    }

    if (!tipo) {
      alert("Selecione um tipo de registro.");
      return;
    }

    const registroData = registroDataId || new Date().toISOString();
    const novoRegistro = {
      tipo,
      estado,
      horarioInicio,
      horarioFim,
      observacao,
      quantidade,
      lado,
      registroData,
      horario: new Date().toLocaleTimeString(),
    };

    const storageKey =
      tipo === "Fralda"
        ? "fraldas"
        : tipo === "Sono"
        ? "sono"
        : "amamentacao";

    const registros = getUserData(storageKey) || [];
    const updatedRegistros = isEditing
      ? registros.map((item) =>
          item.registroData === registroData ? novoRegistro : item
        )
      : [novoRegistro, ...registros];

    saveUserData(storageKey, updatedRegistros);

    alert("Registro salvo com sucesso!");
    navigate("/home");
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 5,
        backgroundColor: "#e8f5e9",
        borderRadius: "12px",
        padding: "20px",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom color="#4caf50">
        {isEditing ? "Editar Registro" : "Novo Registro"}
      </Typography>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Select
          fullWidth
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          sx={{ backgroundColor: "#ffffff" }}
          disabled={isEditing}
        >
          <MenuItem value="Fralda">Fralda</MenuItem>
          <MenuItem value="Sono">Sono</MenuItem>
          <MenuItem value="Amamentação">Amamentação</MenuItem>
        </Select>

        {tipo === "Fralda" && (
          <Select
            fullWidth
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            sx={{ backgroundColor: "#ffffff" }}
          >
            <MenuItem value="">Selecione</MenuItem>
            <MenuItem value="Limpa">Limpa</MenuItem>
            <MenuItem value="Suja de Urina">Suja de Urina</MenuItem>
            <MenuItem value="Suja de Fezes">Suja de Fezes</MenuItem>
            <MenuItem value="Ambas">Ambas</MenuItem>
          </Select>
        )}

        {tipo === "Sono" && (
          <>
            <TextField
              fullWidth
              type="time"
              label="Horário de Início"
              value={horarioInicio}
              onChange={(e) => setHorarioInicio(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ backgroundColor: "#ffffff" }}
            />
            <TextField
              fullWidth
              type="time"
              label="Horário de Fim"
              value={horarioFim}
              onChange={(e) => setHorarioFim(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ backgroundColor: "#ffffff" }}
            />
          </>
        )}

        {tipo === "Amamentação" && (
          <>
            <TextField
              fullWidth
              type="time"
              label="Horário de Início"
              value={horarioInicio}
              onChange={(e) => setHorarioInicio(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ backgroundColor: "#ffffff" }}
            />
            <TextField
              fullWidth
              type="time"
              label="Horário de Fim"
              value={horarioFim}
              onChange={(e) => setHorarioFim(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ backgroundColor: "#ffffff" }}
            />
            <Select
              fullWidth
              value={lado}
              onChange={(e) => setLado(e.target.value)}
              sx={{ backgroundColor: "#ffffff" }}
            >
              <MenuItem value="">Selecione</MenuItem>
              <MenuItem value="Direito">Seio Direito</MenuItem>
              <MenuItem value="Esquerdo">Seio Esquerdo</MenuItem>
              <MenuItem value="Ambos">Ambos</MenuItem>
            </Select>
          </>
        )}

        <TextField
          fullWidth
          label="Observação"
          multiline
          rows={4}
          value={observacao}
          onChange={(e) => setObservacao(e.target.value)}
          sx={{ backgroundColor: "#ffffff" }}
        />

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            onClick={handleSalvar}
            sx={{
              backgroundColor: "#4caf50",
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            Salvar
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate("/home")}
            sx={{ color: "#4caf50", borderColor: "#4caf50" }}
          >
            Voltar para Home
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
