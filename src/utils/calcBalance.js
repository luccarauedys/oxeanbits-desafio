export const calcBalance = (transactions) => {
  const inflows = transactions
    .filter((transaction) => transaction.type === 'Entrada')
    .reduce((total, { value }) => total + Number(value), 0);

  const outflows = transactions
    .filter((transaction) => transaction.type === 'Saída')
    .reduce((total, { value }) => total + Number(value), 0);

  const balance = inflows - outflows;

  return { inflows, outflows, balance };
};
