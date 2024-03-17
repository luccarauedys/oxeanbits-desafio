import SummaryCard from "components/SummaryCard";
import { caretAltDownIcon, caretAltUpIcon } from "@progress/kendo-svg-icons";
import { useContext } from "react";
import { TransactionsContext } from "contexts/TransactionsContext";
import { calcBalance } from "utils/calcBalance";
import { formatCurrency } from "utils/currencyFormatter";
import styles from "components/Summary/Summary.module.css";

export default function Summary() {
  const { transactions } = useContext(TransactionsContext);
  const { inflows, outflows, balance } = calcBalance(transactions);
  const negativeBalance = balance < 0;

  return (
    <div className={styles.container}>
      <SummaryCard
        title={"Entradas"}
        icon={caretAltUpIcon}
        value={formatCurrency(inflows)}
        bgColor={"green"}
      />
      <SummaryCard
        title={"Saídas"}
        icon={caretAltDownIcon}
        value={formatCurrency(outflows)}
        bgColor={"red"}
      />
      <SummaryCard
        title={"Saldo"}
        icon={negativeBalance ? caretAltDownIcon : caretAltUpIcon}
        value={formatCurrency(balance)}
        bgColor={negativeBalance ? "red" : "green"}
      />
    </div>
  );
}
