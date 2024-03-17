import React from "react";
import { Card } from "@progress/kendo-react-layout";

export default function SummaryCard({ title, value, bgColor, children }) {
  return (
    <Card
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        width: "300px",
        background: bgColor || "#141414",
        color: "white",
        padding: "2rem 1rem",
      }}
    >
      <div style={{ flex: 1 }}>
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
      <div>{children}</div>
    </Card>
  );
}
