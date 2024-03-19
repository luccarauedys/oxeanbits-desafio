import { useContext, useState } from 'react';
import { DatePicker } from '@progress/kendo-react-dateinputs';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Input } from '@progress/kendo-react-inputs';
import { TransactionsContext } from 'contexts/TransactionsContext';
import { createTransaction } from 'services/api';
import styles from 'components/TransactionForm/TransactionForm.module.css';

export default function TransactionForm() {
  const { loadTransactions } = useContext(TransactionsContext);

  const [transactionData, setTransactionData] = useState({
    description: '',
    value: '',
    type: '',
    date: new Date(),
  });

  const handleInputChange = (key, value) => {
    setTransactionData({ ...transactionData, [key]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { description, value, type, date } = transactionData;

    if (!description || !value || !type || !date) {
      return alert(
        'Preencha todos os campos para registrar uma nova transação.'
      );
    }

    transactionData.value = Number(value);
    try {
      await createTransaction(transactionData);
      alert('Transação registrada com sucesso!');
      loadTransactions();
    } catch (error) {
      console.log(error);
      alert('Ocorreu um erro. Por favor, tente novamente mais tarde.');
      loadTransactions();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Registre uma nova transação:</h3>
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label htmlFor="description">Descrição:</label>
          <Input
            id="description"
            type="text"
            value={transactionData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className={styles.input}
          />
        </div>
        <div>
          <label htmlFor="value">Valor:</label>
          <Input
            id="value"
            type="number"
            value={transactionData.value}
            onChange={(e) => handleInputChange('value', e.target.value)}
            className={styles.input}
          />
        </div>
        <div>
          <label htmlFor="type">Tipo:</label>
          <DropDownList
            id="type"
            data={['Entrada', 'Saída']}
            value={transactionData.type}
            onChange={(e) => handleInputChange('type', e.target.value)}
            className={styles.input}
          />
        </div>
        <div>
          <label htmlFor="date">Data:</label>
          <DatePicker
            id="date"
            value={transactionData.date}
            onChange={(e) => handleInputChange('date', e.target.value)}
            className={styles.input}
            format={'dd/MM/yyyy'}
          />
        </div>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}
