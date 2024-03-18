import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { TransactionsContext } from "contexts/TransactionsContext";
import TransactionForm from "components/TransactionForm";

describe("Transaction Form", () => {
  it("should register a transaction successfully when all form fields are filled", async () => {
    const loadTransactionsMock = jest.fn();
    jest.spyOn(global, "alert").mockImplementation(() => {});
    jest.spyOn(global, "fetch").mockResolvedValueOnce({});

    render(
      <TransactionsContext.Provider
        value={{ loadTransactions: loadTransactionsMock }}
      >
        <TransactionForm />
      </TransactionsContext.Provider>
    );

    const descriptionInput = screen.getByLabelText("Descrição:");
    fireEvent.change(descriptionInput, { target: { value: "Compras" } });

    const valueInput = screen.getByLabelText("Valor:");
    fireEvent.change(valueInput, { target: { value: 100 } });

    const typeSelectButton = screen.getByLabelText(/select/);
    fireEvent.click(typeSelectButton);
    const typeOption = screen.getByText("Saída");
    fireEvent.click(typeOption);

    const dateInput = screen.getByLabelText("Data:");
    fireEvent.change(dateInput, { target: { value: new Date() } });

    const submitButton = screen.getByText("Registrar");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(
        "Transação registrada com sucesso!"
      );
    });

    expect(loadTransactionsMock).toHaveBeenCalled();
  });
});
