import { useState } from "react";
import { getCurrentUser, getUserData, saveUserData } from "../services/storageService";

export default function AmamentacaoForm() {
  const [horario, setHorario] = useState("");
  const [lado, setLado] = useState("Direito");
  const [observacao, setObservacao] = useState("");

  const handleSubmit = () => {
    if (!getCurrentUser()) {
      alert("Faça login antes de adicionar um registro de amamentação.");
      return;
    }

    const amamentacao = getUserData("amamentacao") || [];
    const novoRegistro = {
      horario,
      lado,
      observacao,
      registroData: new Date().toISOString(),
    };

    saveUserData("amamentacao", [...amamentacao, novoRegistro]);
    alert("Amamentação adicionada!");
  };

  return (
    <div>
      <label>Horário</label>
      <input type="time" onChange={(e) => setHorario(e.target.value)} />
      <label>Lado</label>
      <select onChange={(e) => setLado(e.target.value)}>
        <option>Direito</option>
        <option>Esquerdo</option>
        <option>Ambos</option>
      </select>
      <input
        placeholder="Observação"
        onChange={(e) => setObservacao(e.target.value)}
      />
      <button onClick={handleSubmit}>Adicionar Amamentação</button>
    </div>
  );
}
