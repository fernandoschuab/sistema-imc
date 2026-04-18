import { Link } from "react-router";
import { IoHome } from "react-icons/io5";
import "../components/NotFound.css";

export function meta() {
  return [
    { title: "404 - Página não encontrada | IMC Tracker" },
    { name: "description", content: "Página não encontrada" },
  ];
}

export default function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-code">404</h1>
        <h2 className="not-found-title">Página não encontrada</h2>
        <p className="not-found-message">
          A página que você está procurando não existe ou foi movida.
        </p>
        <Link to="/" className="not-found-button">
          <IoHome size={20} />
          Voltar para Home
        </Link>
      </div>
    </div>
  );
}