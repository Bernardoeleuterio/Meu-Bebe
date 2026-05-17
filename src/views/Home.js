import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { getCurrentUser, getUserData, saveUserData } from "../services/storageService";
import CustomAppBar from "../components/AppBar";
import "../styles/Home.css";

export default function Home() {
  const [historico, setHistorico] = useState([]);
  const [informacoesBebe, setInformacoesBebe] = useState({
    nome: "",
    peso: "",
    tamanho: "",
  });

  const navigate = useNavigate();

  const carregarHistorico = () => {
    const fraldas = getUserData("fraldas") || [];
    const sono = getUserData("sono") || [];
    const amamentacao = getUserData("amamentacao") || [];

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
    const informacoes = getUserData("informacoesBebe") || {
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
      const fraldas = getUserData("fraldas") || [];
      const updatedFraldas = fraldas.filter(
        (item) => item.registroData !== registroData
      );
      saveUserData("fraldas", updatedFraldas);
    } else if (type === "Sono") {
      const sono = getUserData("sono") || [];
      const updatedSono = sono.filter(
        (item) => item.registroData !== registroData
      );
      saveUserData("sono", updatedSono);
    } else if (type === "Amamentação") {
      const amamentacao = getUserData("amamentacao") || [];
      const updatedAmamentacao = amamentacao.filter(
        (item) => item.registroData !== registroData
      );
      saveUserData("amamentacao", updatedAmamentacao);
    }
    carregarHistorico();
  };

  const editarRegistro = (type, registroData) => {
    navigate("/formulario", { state: { type, registroData } });
  };

  const totalRegistros = historico.length;
  const ultimoRegistro = historico[0];
  const ultimoRegistroData = ultimoRegistro?.registroData
    ? new Date(ultimoRegistro.registroData).toLocaleString()
    : null;

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate("/");
      return;
    }

    carregarHistorico();
    carregarInformacoesBebe();

    const handleStorageChange = () => {
      carregarHistorico();
      carregarInformacoesBebe();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, [navigate]);

  return (
    <div className="home-container">
      <div className="home-wrapper">
        <CustomAppBar title="Informações do Bebê" />

        <div className="hero-card">
          <h3>Bem-vindo ao acompanhamento do bebê</h3>
          <p>
            Veja a última atividade e monitore os registros de fralda, sono e amamentação.
          </p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-label">Registros</span>
            <strong>{totalRegistros}</strong>
          </div>
          <div className="stat-card">
            <span className="stat-label">Último registro</span>
            <strong>{ultimoRegistro?.type || "Nenhum"}</strong>
            {ultimoRegistroData && <p>{ultimoRegistroData}</p>}
          </div>
          <div className="stat-card">
            <span className="stat-label">Nome do bebê</span>
            <strong>{informacoesBebe.nome || "Não informado"}</strong>
          </div>
        </div>

        <div className="info-grid">
          <div className="info-box">
            <p>
              <strong>Peso:</strong> {informacoesBebe.peso ? `${informacoesBebe.peso} kg` : "Não informado"}
            </p>
          </div>
          <div className="info-box">
            <p>
              <strong>Tamanho:</strong> {informacoesBebe.tamanho ? `${informacoesBebe.tamanho} cm` : "Não informado"}
            </p>
          </div>
        </div>

        <div className="add-section">
          <Button
            component={Link}
            to="/formulario"
            variant="contained"
            className="home-add-button"
          >
            Adicionar Registro
          </Button>
        </div>

        <div className="history-section">
          <h3 className="section-title">Histórico de Registros</h3>
          <div className="history-grid">
            {historico.length === 0 ? (
              <div className="empty-state">
                <p>Nenhum registro encontrado ainda. Adicione um registro para começar.</p>
              </div>
            ) : (
              historico.map((item, index) => (
                <div key={index} className="history-card">
                  <div className="history-header">
                    <span className="history-type">{item.type}</span>
                    {item.registroData && (
                      <small>{new Date(item.registroData).toLocaleString()}</small>
                    )}
                  </div>
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
                    <strong>Observação:</strong> {item.observacao || "Nenhuma"}
                  </p>
                  <div className="history-actions">
                    <Button
                      onClick={() => editarRegistro(item.type, item.registroData)}
                      className="history-btn history-btn-edit"
                    >
                      Editar
                    </Button>
                    <Button
                      onClick={() => excluirRegistro(item.type, item.registroData)}
                      className="history-btn history-btn-delete"
                    >
                      Excluir
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
