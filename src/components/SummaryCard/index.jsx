import { Card } from "@progress/kendo-react-layout";
import { SvgIcon } from "@progress/kendo-react-common";
import styles from "components/SummaryCard/SummaryCard.module.css";

export default function SummaryCard({ title, value, bgColor, icon }) {
  return (
    <Card className={`${styles.container} ${styles[bgColor]} `}>
      <div>
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
      <div>
        <SvgIcon icon={icon} />
      </div>
    </Card>
  );
}
