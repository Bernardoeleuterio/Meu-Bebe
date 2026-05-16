import { useState } from "react";
import { getUserData, saveUserData, getCurrentUser } from "../services/storageService";

export default function FraldaForm() {
  const [status, setStatus] = useState("Limpa");
  const [horario, setHorario] = useState("");
  const [observacao, setObservacao] = useState("");

  const handleSalvar = (event) => {
    event.preventDefault();

    if (!getCurrentUser()) {
      alert("Faça login antes de salvar uma fralda.");
      return;
    }

    const fraldas = getUserData("fraldas") || [];
    const novaFralda = {
      status,
      horario,
      observacao,
      registroData: new Date().toISOString(),
    };

    saveUserData("fraldas", [novaFralda, ...fraldas]);
    alert("Registro de fralda salvo com sucesso!");
    setStatus("Limpa");
    setHorario("");
    setObservacao("");
  };

  return (
    <form onSubmit={handleSalvar}>
      <label>Status da Fralda</label>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option>Limpa</option>
        <option>Suja de Urina</option>
        <option>Suja de Fezes</option>
        <option>Ambas</option>
      </select>

      <input
        placeholder="Horário"
        value={horario}
        onChange={(e) => setHorario(e.target.value)}
      />
      <input
        placeholder="Observação"
        value={observacao}
        onChange={(e) => setObservacao(e.target.value)}
      />
      <button type="submit">Salvar Fralda</button>
    </form>
  );
}
