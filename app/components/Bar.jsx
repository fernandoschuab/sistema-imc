import PropTypes from "prop-types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "./Bar.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function Bar({ historico }) {
  const labels = historico.map((item) =>
    new Date(item.date + "T12:00:00").toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
    })
  );

  const data = {
    labels,
    datasets: [
      {
        label: "IMC",
        data: historico.map((item) => item.imc),
        borderColor: "#4a90e2",
        backgroundColor: "rgba(74, 144, 226, 0.15)",
        tension: 0.4,
        pointBackgroundColor: "#4a90e2",
        pointRadius: 5,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: false },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 10,
        title: { display: true, text: "IMC" },
      },
      x: {
        title: { display: true, text: "Data" },
      },
    },
  };

  return (
    <div className="chart-wrapper">
      <Line data={data} options={options} />
    </div>
  );
}

Bar.propTypes = {
  historico: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      imc: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
};