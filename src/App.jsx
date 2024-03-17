import { useContext } from "react";
import { TransactionsContext } from "./contexts/TransactionsContext";
import TransactionsGrid from "./components/TransactionsGrid";
import TransactionForm from "./components/TransactionForm";
import Summary from "./components/Summary";

export default function App() {
  const { isLoading } = useContext(TransactionsContext);

  return (
    <div>
      {isLoading ? (
        <h1>Carregando...</h1>
      ) : (
        <div>
          <Summary />
          <TransactionForm />
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <TransactionsGrid />
          </div>
        </div>
      )}
    </div>
  );
}
