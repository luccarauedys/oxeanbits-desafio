import { useContext } from "react";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { TransactionsContext } from "../contexts/TransactionsContext";
import { formatCurrency } from "../utils/currencyFormatter";
import { formatDateFromInput } from "../utils/dateFormatter";

export default function TransactionsGrid() {
  const { transactions } = useContext(TransactionsContext);

  const CustomValueCell = (props) => {
    return <td>{formatCurrency(props.dataItem.value)}</td>;
  };

  const CustomDateCell = (props) => {
    return <td>{formatDateFromInput(props.dataItem.date)}</td>;
  };

  return (
    <Grid data={transactions}>
      <GridColumn field="description" title="Descrição" />
      <GridColumn field="value" title="Valor" cell={CustomValueCell} />
      <GridColumn field="type" title="Tipo" />
      <GridColumn
        field="date"
        title="Data da transação"
        cell={CustomDateCell}
      />
    </Grid>
  );
}
