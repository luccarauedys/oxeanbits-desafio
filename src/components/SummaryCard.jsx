import { Card } from "@progress/kendo-react-layout";
import { SvgIcon } from "@progress/kendo-react-common";

export default function SummaryCard({ title, value, bgColor, icon }) {
  const cardStyles = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    background: bgColor || "#141414",
    color: "#FFFFFF",
    padding: "2rem 1rem",
  };

  return (
    <Card style={cardStyles}>
      <div style={{ flex: 1 }}>
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
      <div>
        <SvgIcon icon={icon} />
      </div>
    </Card>
  );
}
