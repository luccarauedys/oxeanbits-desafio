import { useContext, useState } from 'react';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { process } from '@progress/kendo-data-query';
import { ColumnMenu, ColumnMenuCheckboxFilter } from 'components/ColumnMenu';
import { TransactionsContext } from 'contexts/TransactionsContext';
import { formatCurrency } from 'utils/currencyFormatter';
import { formatDateFromInput } from 'utils/dateFormatter';
import { Button } from '@progress/kendo-react-buttons';
import { SvgIcon } from '@progress/kendo-react-common';
import { trashIcon } from '@progress/kendo-svg-icons';
import { deleteTransaction } from 'services/api';
import styles from 'components/TransactionsGrid/TransactionsGrid.module.css';

export default function TransactionsGrid() {
  const { transactions, loadTransactions } = useContext(TransactionsContext);

  const createDataState = (dataState) => {
    return {
      result: process(transactions.slice(0), dataState),
      dataState: dataState,
    };
  };

  const initialState = createDataState({
    take: 10,
    skip: 0,
    sort: [
      {
        field: 'date',
        dir: 'desc',
      },
    ],
  });

  const [result, setResult] = useState(initialState.result);
  const [dataState, setDataState] = useState(initialState.dataState);

  const dataStateChange = (event) => {
    const updatedState = createDataState(event.dataState);
    setResult(updatedState.result);
    setDataState(updatedState.dataState);
  };

  const CustomValueCell = (props) => {
    return <td>{formatCurrency(props.dataItem.value)}</td>;
  };

  const CustomDateCell = (props) => {
    return <td>{formatDateFromInput(props.dataItem.date)}</td>;
  };

  const CustomDeleteIconCell = (props) => {
    const handleDelete = async () => {
      const confirmation = window.confirm(
        'Tem certeza que deseja deletar essa transação?'
      );

      if (confirmation === false) return;

      try {
        await deleteTransaction(props.dataItem.id);
        alert('Deletado com sucesso!');
        loadTransactions();
      } catch (error) {
        console.log(error);
        alert('Ocorreu um erro inesperado. Por favor, tente novamente.');
        loadTransactions();
      }
    };

    return (
      <td>
        <Button onClick={handleDelete}>
          <SvgIcon icon={trashIcon} color="#ea4856" />
        </Button>
      </td>
    );
  };

  return (
    <div className={styles.container}>
      <Grid
        data={result}
        {...dataState}
        onDataStateChange={dataStateChange}
        sortable
        pageable
      >
        <GridColumn
          field="description"
          title="Descrição"
          columnMenu={ColumnMenu}
          width={320}
        />
        <GridColumn
          field="value"
          title="Valor"
          columnMenu={ColumnMenu}
          cell={CustomValueCell}
        />
        <GridColumn
          field="type"
          title="Tipo"
          columnMenu={ColumnMenuCheckboxFilter}
        />
        <GridColumn
          field="date"
          title="Data da transação"
          cell={CustomDateCell}
        />
        <GridColumn
          title=""
          cell={CustomDeleteIconCell}
          width={60}
          filterable={false}
          sortable={false}
        />
      </Grid>
    </div>
  );
}
