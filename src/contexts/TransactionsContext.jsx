import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { getTransactions } from "../services/api";

export const TransactionsContext = createContext([]);

export const TransactionsProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getTransactions();
        setTransactions(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <TransactionsContext.Provider
      value={{ isLoading, transactions, setTransactions }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};
