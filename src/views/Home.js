import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "./Home.css";

export default function Home() {
  const [historico, setHistorico] = useState([]);
  const [informacoesBebe, setInformacoesBebe] = useState({
    nome: "",
    peso: "",
    tamanho: "",
  });

  const navigate = useNavigate();

  const carregarHistorico = () => {
    const fraldas = JSON.parse(localStorage.getItem("fraldas")) || [];
    const sono = JSON.parse(localStorage.getItem("sono")) || [];
    const amamentacao = JSON.parse(localStorage.getItem("amamentacao")) || [];

    const allData = [
      ...fraldas.map((item) => ({
        ...item,
        type: "Fralda",
      })),
      ...sono.map((item) => ({
        ...item,
        type: "Sono",
        horarioInicio: item.horarioInicio,
        horarioFim: item.horarioFim,
        observacao: item.observacao,
      })),
      ...amamentacao.map((item) => ({
        ...item,
        type: "Amamentação",
        horarioInicio: item.horarioInicio,
        horarioFim: item.horarioFim,
        lado: item.lado,
        observacao: item.observacao,
      })),
    ];

    allData.sort((a, b) => new Date(b.registroData) - new Date(a.registroData));

    setHistorico(allData);
  };

  const carregarInformacoesBebe = () => {
    const informacoes = JSON.parse(localStorage.getItem("informacoesBebe")) || {
      nomeBebe: "",
      pesoBebe: "",
      comprimentoBebe: "",
    };
    setInformacoesBebe({
      nome: informacoes.nomeBebe,
      peso: informacoes.pesoBebe,
      tamanho: informacoes.comprimentoBebe,
    });
  };

  const excluirRegistro = (type, registroData) => {
    if (type === "Fralda") {
      const fraldas = JSON.parse(localStorage.getItem("fraldas")) || [];
      const updatedFraldas = fraldas.filter(
        (item) => item.registroData !== registroData
      );
      localStorage.setItem("fraldas", JSON.stringify(updatedFraldas));
    } else if (type === "Sono") {
      const sono = JSON.parse(localStorage.getItem("sono")) || [];
      const updatedSono = sono.filter(
        (item) => item.registroData !== registroData
      );
      localStorage.setItem("sono", JSON.stringify(updatedSono));
    } else if (type === "Amamentação") {
      const amamentacao = JSON.parse(localStorage.getItem("amamentacao")) || [];
      const updatedAmamentacao = amamentacao.filter(
        (item) => item.registroData !== registroData
      );
      localStorage.setItem("amamentacao", JSON.stringify(updatedAmamentacao));
    }
    carregarHistorico();
  };

  const editarRegistro = (type, registroData) => {
    navigate("/formulario", { state: { type, registroData } });
  };

  useEffect(() => {
    carregarHistorico();
    carregarInformacoesBebe();

    const handleStorageChange = () => {
      carregarHistorico();
      carregarInformacoesBebe();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="home-container" style={{ backgroundColor: "#f4f6f8" }}>
      <AppBar position="static" sx={{ bgcolor: "#2ecc71" }}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1, color: "#ffffff" }}>
            Informações do Bebê
          </Typography>
          <Link to="/settings" style={{ textDecoration: "none" }}>
            <Button sx={{ color: "#ffffff", "&:hover": { color: "#dff0d8" } }}>
              Configurações
            </Button>
          </Link>
        </Toolbar>
      </AppBar>

      <div className="informacoes-bebe" style={{ padding: "20px" }}>
        <h3>Informações do Bebê</h3>
        <p>
          <strong>Nome:</strong> {informacoesBebe.nome}
        </p>
        <p>
          <strong>Peso:</strong> {informacoesBebe.peso} kg
        </p>
        <p>
          <strong>Tamanho:</strong> {informacoesBebe.tamanho} cm
        </p>
      </div>

      <div
        className="add-button"
        style={{ padding: "16px", textAlign: "center" }}
      >
        <Button
          component={Link}
          to="/formulario"
          variant="contained"
          sx={{
            bgcolor: "#2ecc71",
            color: "#ffffff",
            fontWeight: "bold",
            padding: "12px 24px",
            "&:hover": { bgcolor: "#27ae60" },
          }}
        >
          Adicionar Registro
        </Button>
      </div>

      <div className="history-section" style={{ padding: "20px" }}>
        <h3>Histórico de Registros</h3>
        {historico.map((item, index) => (
          <div
            key={index}
            className="history-card"
            style={{
              marginBottom: "20px",
              padding: "15px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              backgroundColor: "#ffffff",
            }}
          >
            <p>
              <strong>Tipo:</strong> {item.type}
            </p>
            {item.type === "Fralda" && (
              <p>
                <strong>Estado:</strong> {item.estado}
              </p>
            )}
            {item.type === "Sono" && (
              <>
                <p>
                  <strong>Horário de Início:</strong> {item.horarioInicio}
                </p>
                <p>
                  <strong>Horário de Fim:</strong> {item.horarioFim}
                </p>
              </>
            )}
            {item.type === "Amamentação" && (
              <>
                <p>
                  <strong>Horário de Início:</strong> {item.horarioInicio}
                </p>
                <p>
                  <strong>Horário de Fim:</strong> {item.horarioFim}
                </p>
                <p>
                  <strong>Lado:</strong> {item.lado}
                </p>
              </>
            )}
            <p>
              <strong>Observação:</strong> {item.observacao}
            </p>

            <div className="buttons">
              <Button
                onClick={() => editarRegistro(item.type, item.registroData)}
                sx={{ color: "#2ecc71" }}
              >
                Editar
              </Button>
              <Button
                onClick={() => excluirRegistro(item.type, item.registroData)}
                sx={{ color: "#e74c3c" }}
              >
                Excluir
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
