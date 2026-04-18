import PropTypes from "prop-types";
import "./Info.css";

function getImcClassification(imc) {
  if (imc < 18.5) return { label: "Abaixo do peso", color: "#3b82f6" };
  if (imc < 25) return { label: "Peso normal", color: "#22c55e" };
  if (imc < 30) return { label: "Sobrepeso", color: "#f59e0b" };
  if (imc < 35) return { label: "Obesidade Grau I", color: "#f97316" };
  if (imc < 40) return { label: "Obesidade Grau II", color: "#ef4444" };
  return { label: "Obesidade Grau III", color: "#991b1b" };
}

export default function Info({ id, weight, height, imc, date, deleteCard }) {
  const classification = getImcClassification(imc);

  function handleDelete() {
    deleteCard(id);
  }

  const formattedDate = new Date(date + "T12:00:00").toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className="info-card">
      <div className="info-date">{formattedDate}</div>
      <div className="info-imc" style={{ color: classification.color }}>
        {imc}
      </div>
      <div
        className="info-classification"
        style={{ backgroundColor: classification.color }}
      >
        {classification.label}
      </div>
      <div className="info-details">
        <span>Peso: {weight} kg</span>
        <span>Altura: {height} m</span>
      </div>
      <button className="btn-delete" onClick={handleDelete}>
        Remover
      </button>
    </div>
  );
}

Info.propTypes = {
  id: PropTypes.string.isRequired,
  weight: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  imc: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  deleteCard: PropTypes.func.isRequired,
};