import {
  GridColumnMenuFilter,
  GridColumnMenuCheckboxFilter,
} from '@progress/kendo-react-grid';
import { useContext } from 'react';
import { TransactionsContext } from '../../contexts/TransactionsContext';

export const ColumnMenu = (props) => {
  return (
    <div>
      <GridColumnMenuFilter {...props} expanded={true} />
    </div>
  );
};

export const ColumnMenuCheckboxFilter = (props) => {
  const { transactions } = useContext(TransactionsContext);

  return (
    <div>
      <GridColumnMenuCheckboxFilter
        {...props}
        data={transactions}
        expanded={true}
      />
    </div>
  );
};
