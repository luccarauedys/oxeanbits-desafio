import { DatePicker } from "@progress/kendo-react-dateinputs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Input } from "@progress/kendo-react-inputs";
import React, { useState } from "react";
import { createTransaction } from "../services/api";

export default function TransactionForm() {
  const [transactionData, setTransactionData] = useState({
    description: "",
    value: "",
    type: "",
    date: new Date(),
  });

  const handleInputChange = (key, value) => {
    setTransactionData({ ...transactionData, [key]: value });
    console.log(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { description, value, type, date } = transactionData;

    if (description && type && value && date) {
      transactionData.value = Number(value);

      try {
        createTransaction(transactionData);
        alert("Transação registrada com sucesso!");
        window.location.reload();
      } catch (error) {
        console.log(error);
        alert(
          "Ocorreu um erro inesperado. Por favor, tente novamente mais tarde."
        );
      }
    }
  };

  return (
    <div className="transaction-form-container">
      <div className="transaction-form-header">
        <h3>Registre uma nova transação:</h3>
      </div>
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
            format={"dd/MM/yyyy"}
          />
        </div>
        <button type="submit" className="transaction-form-item">
          Registrar
        </button>
      </form>
    </div>
  );
}
