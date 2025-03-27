import { useState, useEffect } from "react";
import { saveData, getData } from "../services/storageService";

export default function SonoForm() {
  const [inicio, setInicio] = useState("");
  const [fim, setFim] = useState("");
  const [observacao, setObservacao] = useState("");

  const handleSubmit = () => {
    const sonos = getData("sono") || [];
    const novoSono = { inicio, fim, observacao };

    saveData("sono", [...sonos, novoSono]);
    alert("Sono adicionado com sucesso!");
  };

  return (
    <div>
      <label>Horário de Início</label>
      <input type="time" onChange={(e) => setInicio(e.target.value)} />
      <label>Horário de Fim</label>
      <input type="time" onChange={(e) => setFim(e.target.value)} />
      <input
        placeholder="Observação"
        onChange={(e) => setObservacao(e.target.value)}
      />
      <button onClick={handleSubmit}>Adicionar Sono</button>
    </div>
  );
}
