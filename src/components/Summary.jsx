import { SvgIcon } from "@progress/kendo-react-common";
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

  console.log(transactions);

  return (
    <div className="summary-container">
      <SummaryCard
        title={"Entradas"}
        value={formatCurrency(inflows)}
        bgColor={"#14bc6e"}
      >
        <SvgIcon icon={caretAltUpIcon} />
      </SummaryCard>

      <SummaryCard
        title={"Saídas"}
        value={formatCurrency(outflows)}
        bgColor={"#ea4856"}
      >
        <SvgIcon icon={caretAltDownIcon} />
      </SummaryCard>

      <SummaryCard
        title={"Saldo"}
        value={formatCurrency(balance)}
        bgColor={negativeBalance ? "#960c0c" : "#0a6d3f"}
      >
        {negativeBalance ? (
          <SvgIcon icon={caretAltDownIcon} />
        ) : (
          <SvgIcon icon={caretAltUpIcon} />
        )}
      </SummaryCard>
    </div>
  );
}
