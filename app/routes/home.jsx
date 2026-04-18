import { useState, useEffect } from "react";
import { IoInformationCircle, IoCalculator, IoCheckmarkCircle, IoWarning } from "react-icons/io5";
import ImcForm from "../components/ImcForm";
import Bar from "../components/Bar";
import Info from "../components/Info";

export function meta() {
  return [
    { title: "IMC Tracker do Fernando" },
    { name: "description", content: "IMC (Índice de Massa Corporal) avalia se seu peso está adequado à sua altura. É calculado dividindo o peso pela altura ao quadrado. Indica baixo peso, normal, sobrepeso ou obesidade. Não substitui avaliação médica." },
  ];
}

export default function Home() {
  const [historico, setHistorico] = useState(() => {
    try {
      const saved = localStorage.getItem("imc-tracker-historico");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [anterior, setAnterior] = useState(null);

  const [ultimaAltura, setUltimaAltura] = useState(() => {
    try {
      const saved = localStorage.getItem("imc-tracker-ultima-altura");
      return saved ? saved : "";
    } catch {
      return "";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("imc-tracker-historico", JSON.stringify(historico));
    } catch {
      console.warn("LocalStorage indisponível.");
    }
  }, [historico]);

  useEffect(() => {
    try {
      localStorage.setItem("imc-tracker-ultima-altura", ultimaAltura);
    } catch {
      console.warn("LocalStorage indisponível.");
    }
  }, [ultimaAltura]);

  function handleAdd({ weight, height, date }) {
    const imc = parseFloat((weight / (height * height)).toFixed(2));
    const novoRegistro = {
      id: crypto.randomUUID(),
      weight: parseFloat(weight),
      height: parseFloat(height),
      imc,
      date,
    };
    setHistorico((prev) => [...prev, novoRegistro].slice(-7));
    setUltimaAltura(height);
    setAnterior(null);
  }

  function handleDelete(id) {
    setAnterior(historico);
    setHistorico((prev) => prev.filter((item) => item.id !== id));
  }

  function handleUndo() {
    if (anterior !== null) {
      setHistorico(anterior);
      setAnterior(null);
    }
  }

  const historicoOrdenado = [...historico].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">IMC Tracker do Fernando</h1>
        <div className="app-subtitle">
          <ul className="sub-list">
            <li className="sub-item">
              <div className="sub-icon" style={{ background: "#ebf4ff" }}>
                <IoInformationCircle size={20} color="#3182ce" />
              </div>
              <span className="sub-text">Avalia se seu peso está adequado à sua altura.</span>
            </li>
            <li className="sub-divider" />
            <li className="sub-item">
              <div className="sub-icon" style={{ background: "#f0f4f8", border: "0.5px solid var(--border)" }}>
                <IoCalculator size={20} color="#718096" />
              </div>
              <span className="sub-text">
                Calculado dividindo o <strong>peso (kg)</strong> pela <strong>altura² (m)</strong>.
              </span>
            </li>
            <li className="sub-divider" />
            <li className="sub-item">
              <div className="sub-icon" style={{ background: "#f0fff4" }}>
                <IoCheckmarkCircle size={20} color="#38a169" />
              </div>
              <span className="sub-text">
                Indica <strong>baixo peso, normal, sobrepeso</strong> ou <strong>obesidade</strong>.
              </span>
            </li>
            <li className="sub-warning">
              <IoWarning size={18} color="#dd6b20" />
              <span className="sub-warning-text">Não substitui avaliação médica profissional.</span>
            </li>
          </ul>
        </div>
      </header>

      <main className="app-main">
        <section className="form-section">
          <ImcForm onAdd={handleAdd} ultimaAltura={ultimaAltura} />
        </section>

        {historico.length > 0 && (
          <>
            <section className="chart-section">
              <h2 className="section-title">Histórico (últimos 7 registros)</h2>
              <Bar historico={historicoOrdenado} />
            </section>

            <section className="cards-section">
              {anterior !== null && (
                <button className="btn-undo" onClick={handleUndo}>
                  ↩ Desfazer exclusão
                </button>
              )}
              <div className="cards-grid">
                {historicoOrdenado.map((item) => (
                  <Info
                    key={item.id}
                    id={item.id}
                    weight={item.weight}
                    height={item.height}
                    imc={item.imc}
                    date={item.date}
                    deleteCard={handleDelete}
                  />
                ))}
              </div>
            </section>
          </>
        )}

        {historico.length === 0 && (
          <div className="empty-state">
            <p>Nenhum registro ainda. Adicione seu primeiro IMC acima!</p>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>IMC Tracker do Fernando &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}