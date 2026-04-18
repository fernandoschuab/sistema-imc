import { useState } from "react";
import PropTypes from "prop-types";
import "./ImcForm.css";

const initialState = {
  weight: "",
  height: "",
  date: new Date().toISOString().slice(0, 10),
};

export default function ImcForm({ onAdd }) {
  const [formData, setFormData] = useState(initialState);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!formData.weight || !formData.height) return;
    onAdd(formData);
    setFormData(initialState);
  }

  const isDisabled = !formData.weight || !formData.height;

  return (
    <form className="imc-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Novo Registro</h2>

      <div className="form-group">
        <label htmlFor="weight">Peso (kg)</label>
        <input
          id="weight"
          name="weight"
          type="number"
          min="1"
          step="0.1"
          placeholder="Ex: 70.5"
          value={formData.weight}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="height">Altura (m)</label>
        <input
          id="height"
          name="height"
          type="number"
          min="0.5"
          max="3"
          step="0.01"
          placeholder="Ex: 1.75"
          value={formData.height}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="date">Data</label>
        <input
          id="date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
        />
      </div>

      <button className="btn-submit" type="submit" disabled={isDisabled}>
        Calcular e Adicionar
      </button>
    </form>
  );
}

ImcForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
};