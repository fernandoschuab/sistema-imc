import { useState, useEffect } from "react";
import ImcForm from "../components/ImcForm";
import Bar from "../components/Bar";
import Info from "../components/Info";

export function meta() {
  return [
    { title: "Sistema IMC" },
    { name: "description", content: "Monitore seu Índice de Massa Corporal" },
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

  useEffect(() => {
    try {
      localStorage.setItem("imc-tracker-historico", JSON.stringify(historico));
    } catch {
      console.warn("LocalStorage indisponível.");
    }
  }, [historico]);

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

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">IMC Tracker</h1>
        <p className="app-subtitle">Monitore seu Índice de Massa Corporal</p>
      </header>

      <main className="app-main">
        <section className="form-section">
          <ImcForm onAdd={handleAdd} />
        </section>

        {historico.length > 0 && (
          <>
            <section className="chart-section">
              <h2 className="section-title">Histórico (últimos 7 registros)</h2>
              <Bar historico={historico} />
            </section>

            <section className="cards-section">
              {anterior !== null && (
                <button className="btn-undo" onClick={handleUndo}>
                  ↩ Desfazer exclusão
                </button>
              )}
              <div className="cards-grid">
                {historico.map((item) => (
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
        <p>IMC Tracker &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}