import { useContext, useState } from "react";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { process } from "@progress/kendo-data-query";
import { ColumnMenu, ColumnMenuCheckboxFilter } from "./ColumnMenu";
import { TransactionsContext } from "../contexts/TransactionsContext";
import { formatCurrency } from "../utils/currencyFormatter";
import { formatDateFromInput } from "../utils/dateFormatter";

export default function TransactionsGrid() {
  const { transactions } = useContext(TransactionsContext);

  const createDataState = (dataState) => {
    return {
      result: process(transactions.slice(0), dataState),
      dataState: dataState,
    };
  };

  let initialState = createDataState({
    take: 10,
    skip: 0,
    sort: [
      {
        field: "date",
        dir: "desc",
      },
    ],
  });

  const [result, setResult] = useState(initialState.result);
  const [dataState, setDataState] = useState(initialState.dataState);
  const dataStateChange = (event) => {
    let updatedState = createDataState(event.dataState);
    setResult(updatedState.result);
    setDataState(updatedState.dataState);
  };

  const CustomValueCell = (props) => {
    return <td>{formatCurrency(props.dataItem.value)}</td>;
  };

  const CustomDateCell = (props) => {
    return <td>{formatDateFromInput(props.dataItem.date)}</td>;
  };

  return (
    <Grid
      data={result}
      {...dataState}
      onDataStateChange={dataStateChange}
      sortable
      pageable
      pageSize={10}
    >
      <GridColumn
        field="description"
        title="Descrição"
        columnMenu={ColumnMenu}
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
    </Grid>
  );
}
