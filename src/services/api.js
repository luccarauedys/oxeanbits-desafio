const URL = process.env.REACT_APP_API_URL;

export const getTransactions = async () => {
  const response = await fetch(`${URL}/transactions`);
  const transactions = await response.json();
  return transactions;
};

export const createTransaction = async (transactionData) => {
  const response = await fetch(`${URL}/transactions`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(transactionData),
  });
  return response;
};

export const deleteTransaction = async (transactionId) => {
  const response = await fetch(`${URL}/transactions/${transactionId}`, {
    method: 'DELETE',
  });
  return response;
};
