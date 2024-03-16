import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const TransactionsContext = createContext([]);

export const TransactionsProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const URL = process.env.REACT_APP_API_URL;

    setIsLoading(true);

    fetch(URL)
      .then((res) => res.json())
      .then((json) => {
        setTransactions(json);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <TransactionsContext.Provider
      value={{ isLoading, transactions, setTransactions }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};
