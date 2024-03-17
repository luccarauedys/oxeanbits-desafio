import { useContext } from "react";
import { Loader } from "@progress/kendo-react-indicators";
import { TransactionsContext } from "contexts/TransactionsContext";
import TransactionsGrid from "components/TransactionsGrid";
import TransactionForm from "components/TransactionForm";
import Summary from "components/Summary";
import styles from "App.module.css";

export default function App() {
  const { isLoading } = useContext(TransactionsContext);

  const SpinnerLoader = () => {
    return (
      <div className={styles.loader}>
        <Loader size="large" type="converging-spinner" />
      </div>
    );
  };

  const HomePage = () => {
    return (
      <>
        <Summary />
        <TransactionForm />
        <TransactionsGrid />
      </>
    );
  };

  return isLoading ? <SpinnerLoader /> : <HomePage />;
}
