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
  Snackbar,
  Alert,
} from "@mui/material";
import {
  getCurrentUser,
  getUserData,
  saveUserData,
} from "../services/storageService";
import CustomAppBar from "../components/AppBar";
import "../styles/Formulario.css";

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
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

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

    setSnackbarMessage("Registro salvo com sucesso!");
    setSnackbarOpen(true);
    setTimeout(() => navigate("/home"), 1500);
  };

  return (
    <Container className="formulario-page" maxWidth="sm">
      <Box className="formulario-card">
        <CustomAppBar title={isEditing ? "Editar Registro" : "Novo Registro"} showSettings={false} />

        <Box className="formulario-hero">
          <Typography variant="h5">
            {isEditing ? "Editar registro existente" : "Crie um novo registro"}
          </Typography>
          <Typography variant="body1">
            Use este formulário para manter o histórico do bebê sempre atualizado.
          </Typography>
        </Box>

        <Box component="form" className="formulario-form">
          <Select
            fullWidth
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="formulario-select"
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
              className="formulario-select"
            >
              <MenuItem value="">Selecione</MenuItem>
              <MenuItem value="Limpa">Limpa</MenuItem>
              <MenuItem value="Suja de Urina">Suja de Urina</MenuItem>
              <MenuItem value="Suja de Fezes">Suja de Fezes</MenuItem>
              <MenuItem value="Ambas">Ambas</MenuItem>
            </Select>
          )}

          {tipo === "Sono" && (
            <Box className="formulario-row">
              <TextField
                fullWidth
                type="time"
                label="Início"
                value={horarioInicio}
                onChange={(e) => setHorarioInicio(e.target.value)}
                InputLabelProps={{ shrink: true }}
                className="formulario-textfield"
              />
              <TextField
                fullWidth
                type="time"
                label="Fim"
                value={horarioFim}
                onChange={(e) => setHorarioFim(e.target.value)}
                InputLabelProps={{ shrink: true }}
                className="formulario-textfield"
              />
            </Box>
          )}

          {tipo === "Amamentação" && (
            <>
              <Box className="formulario-row">
                <TextField
                  fullWidth
                  type="time"
                  label="Início"
                  value={horarioInicio}
                  onChange={(e) => setHorarioInicio(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  className="formulario-textfield"
                />
                <TextField
                  fullWidth
                  type="time"
                  label="Fim"
                  value={horarioFim}
                  onChange={(e) => setHorarioFim(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  className="formulario-textfield"
                />
              </Box>
              <Select
                fullWidth
                value={lado}
                onChange={(e) => setLado(e.target.value)}
                className="formulario-select"
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
            className="formulario-textfield"
          />

          <Box className="formulario-button-group">
            <Button
              variant="contained"
              onClick={handleSalvar}
              className="formulario-btn-save"
            >
              Salvar
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate("/home")}
              className="formulario-btn-back"
            >
              Voltar para Home
            </Button>
          </Box>
        </Box>
      </Box>
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
