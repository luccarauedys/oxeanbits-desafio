import { fireEvent, render, screen } from "@testing-library/react";
import { TransactionsContext } from "contexts/TransactionsContext";
import TransactionForm from "components/TransactionForm";

jest.mock("services/api.js", () => ({
  createTransaction: jest.fn(() => Promise.resolve()),
}));

describe("TransactionForm", () => {
  let loadTransactions;

  beforeEach(() => {
    loadTransactions = jest.fn();
  });

  it("should render correctly", () => {
    render(
      <TransactionsContext.Provider value={{ loadTransactions }}>
        <TransactionForm />
      </TransactionsContext.Provider>
    );
  });

  it("should handle input change", () => {
    render(
      <TransactionsContext.Provider value={{ loadTransactions }}>
        <TransactionForm />
      </TransactionsContext.Provider>
    );

    const input = screen.getByLabelText("Descrição:");
    fireEvent.change(input, { target: { value: "Compras" } });
    expect(input.value).toBe("Compras");
  });
});
