import { SvgIcon } from "@progress/kendo-react-common";
import SummaryCard from "./SummaryCard";
import { caretAltDownIcon, caretAltUpIcon } from "@progress/kendo-svg-icons";

export default function Summary() {
  const saldoNegativo = false;

  return (
    <div className="summary-container">
      <SummaryCard title={"Entradas"} value={"R$ 1.500,00"} bgColor={"#14bc6e"}>
        <SvgIcon icon={caretAltUpIcon} />
      </SummaryCard>

      <SummaryCard title={"Saídas"} value={"R$ 500,00"} bgColor={"#ea4856"}>
        <SvgIcon icon={caretAltDownIcon} />
      </SummaryCard>

      <SummaryCard
        title={"Saldo"}
        value={`${saldoNegativo ? "-" : ""} R$ 1.000,00`}
      >
        {saldoNegativo ? (
          <SvgIcon icon={caretAltDownIcon} />
        ) : (
          <SvgIcon icon={caretAltUpIcon} />
        )}
      </SummaryCard>
    </div>
  );
}
