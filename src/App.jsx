import { useContext } from "react";
import { TransactionsContext } from "./contexts/TransactionsContext";

export default function App() {
  const { isLoading, transactions } = useContext(TransactionsContext);

  return (
    <div>
      {isLoading && <h1>Carregando...</h1>}
      {transactions.length > 0 && JSON.stringify(transactions)}
    </div>
  );
}
