import { render } from "@testing-library/react";
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
});
