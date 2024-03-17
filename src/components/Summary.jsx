import SummaryCard from "./SummaryCard";
import { caretAltDownIcon, caretAltUpIcon } from "@progress/kendo-svg-icons";
import { useContext } from "react";
import { TransactionsContext } from "../contexts/TransactionsContext";
import { calcBalance } from "../utils/calcBalance";
import { formatCurrency } from "../utils/currencyFormatter";

export default function Summary() {
  const { transactions } = useContext(TransactionsContext);
  const { inflows, outflows, balance } = calcBalance(transactions);
  const negativeBalance = balance < 0;

  return (
    <div className="summary-container">
      <SummaryCard
        title={"Entradas"}
        icon={caretAltUpIcon}
        value={formatCurrency(inflows)}
        bgColor={"#14bc6e"}
      />
      <SummaryCard
        title={"Saídas"}
        icon={caretAltDownIcon}
        value={formatCurrency(outflows)}
        bgColor={"#ea4856"}
      />
      <SummaryCard
        title={"Saldo"}
        icon={negativeBalance ? caretAltDownIcon : caretAltUpIcon}
        value={formatCurrency(balance)}
        bgColor={negativeBalance ? "#960c0c" : "#0a6d3f"}
      />
    </div>
  );
}
