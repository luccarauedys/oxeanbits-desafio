import { useContext } from "react";
import { TransactionsContext } from "./contexts/TransactionsContext";
import TransactionsGrid from "./components/TransactionsGrid";
import TransactionForm from "./components/TransactionForm";

export default function App() {
  const { isLoading } = useContext(TransactionsContext);

  return (
    <div>
      {isLoading ? (
        <h1>Carregando...</h1>
      ) : (
        <>
          <TransactionForm />
          <TransactionsGrid />
        </>
      )}
    </div>
  );
}
