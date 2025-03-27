import { useState, useEffect } from "react";

export default function FraldaForm() {
  const [status, setStatus] = useState("Limpa");
  const [horario, setHorario] = useState("");
  const [observacao, setObservacao] = useState("");

  useEffect(() => {
    const fraldas = JSON.parse(localStorage.getItem("fraldas")) || [];
    const novaFralda = { status, horario, observacao };
    localStorage.setItem("fraldas", JSON.stringify([...fraldas, novaFralda]));
  }, [status, horario, observacao]);

  return (
    <div>
      <label>Status da Fralda</label>
      <select onChange={(e) => setStatus(e.target.value)}>
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
    </div>
  );
}
