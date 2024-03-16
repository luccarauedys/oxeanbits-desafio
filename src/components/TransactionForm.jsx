import { DatePicker } from "@progress/kendo-react-dateinputs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Input } from "@progress/kendo-react-inputs";
import React, { useState } from "react";

export default function TransactionForm() {
  const [transactionData, setTransactionData] = useState({
    description: "",
    value: "",
    type: "",
    date: new Date(),
  });

  const handleInputChange = (key, value) => {
    setTransactionData({ ...transactionData, [key]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { description, value, type, date } = transactionData;

    if (description && type && value && date) {
      const URL = process.env.REACT_APP_API_URL;

      fetch(URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(transactionData),
      })
        .then((res) => {
          if (res.ok) return alert("Transação registrada com sucesso!");

          alert("Ocorreu um erro inesperado. Por favor, tente novamente.");
        })
        .catch((err) => {
          alert("Ocorreu um erro inesperado. Por favor, tente novamente.");
        });
    }
  };

  return (
    <div className="transaction-form-container">
      <form onSubmit={handleSubmit} className="transaction-form">
        <div>
          <label htmlFor="description">Descrição:</label>
          <Input
            id="description"
            type="text"
            value={transactionData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            className="transaction-form-item"
          />
        </div>
        <div>
          <label htmlFor="value">Valor:</label>
          <Input
            id="value"
            type="number"
            value={transactionData.value}
            onChange={(e) => handleInputChange("value", e.target.value)}
            className="transaction-form-item"
          />
        </div>
        <div>
          <label htmlFor="type">Tipo:</label>
          <DropDownList
            id="type"
            data={["Entrada", "Saída"]}
            value={transactionData.type}
            onChange={(e) => handleInputChange("type", e.target.value)}
            className="transaction-form-item"
          />
        </div>
        <div>
          <label htmlFor="date">Data:</label>
          <DatePicker
            id="date"
            value={transactionData.date}
            onChange={(e) => handleInputChange("date", e.target.value)}
            className="transaction-form-item"
          />
        </div>
        <button type="submit" className="transaction-form-item">
          Registrar
        </button>
      </form>
    </div>
  );
}