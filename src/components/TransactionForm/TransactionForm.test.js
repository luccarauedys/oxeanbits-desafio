import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { TransactionsContext } from "contexts/TransactionsContext";
import TransactionForm from "components/TransactionForm";

const renderComponent = (loadTransactions) => {
  return render(
    <TransactionsContext.Provider value={{ loadTransactions }}>
      <TransactionForm />
    </TransactionsContext.Provider>
  );
};

const writeDescription = () => {
  const descriptionInput = screen.getByLabelText("Descrição:");
  fireEvent.change(descriptionInput, { target: { value: "Compras" } });
  return { descriptionInput };
};

const writeValue = () => {
  const valueInput = screen.getByLabelText("Valor:");
  fireEvent.change(valueInput, { target: { value: 100 } });
  return { valueInput };
};

const selectType = () => {
  const typeSelectButton = screen.getByLabelText(/select/);
  fireEvent.click(typeSelectButton);
  const typeOption = screen.getByText("Saída");
  fireEvent.click(typeOption);
  return { typeSelectButton, typeOption };
};

const selectDate = () => {
  const dateInput = screen.getByLabelText("Data:");
  fireEvent.change(dateInput, { target: { value: new Date() } });
  return { dateInput };
};

const submitForm = () => {
  const submitButton = screen.getByText("Registrar");
  fireEvent.click(submitButton);
  return { submitButton };
};

jest.mock("services/api.js", () => ({
  createTransaction: jest.fn(() => Promise.resolve()),
}));

describe("TransactionForm", () => {
  let loadTransactions;

  beforeEach(() => {
    loadTransactions = jest.fn();
  });

  it("should render correctly", () => {
    renderComponent(loadTransactions);
  });

  it("should handle input change", () => {
    renderComponent(loadTransactions);

    const { descriptionInput } = writeDescription();

    expect(descriptionInput.value).toBe("Compras");
  });

  it("should not submit form when description field is empty", async () => {
    jest.spyOn(global, "alert").mockImplementation(() => {});

    renderComponent(loadTransactions);

    writeValue();
    selectType();
    selectDate();
    submitForm();

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(
        "Preencha todos os campos para registrar uma nova transação."
      );
    });

    expect(loadTransactions).not.toHaveBeenCalled();
  });

  it("should not submit form when value field is empty", async () => {
    jest.spyOn(global, "alert").mockImplementation(() => {});

    renderComponent(loadTransactions);

    writeDescription();
    selectType();
    selectDate();
    submitForm();

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(
        "Preencha todos os campos para registrar uma nova transação."
      );
    });

    expect(loadTransactions).not.toHaveBeenCalled();
  });
});
