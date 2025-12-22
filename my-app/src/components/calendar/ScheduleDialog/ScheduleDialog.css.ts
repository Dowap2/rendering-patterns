import { style } from "@vanilla-extract/css";

export const overlay = style({
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.4)",
});

export const content = style({
  position: "fixed",
  inset: 0,
  margin: "auto",
  width: "min(520px, calc(100vw - 24px))",
  height: "fit-content",
  background: "#fff",
  borderRadius: 12,
  padding: 16,
  outline: "none",
});

export const header = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
  marginBottom: 12,
});

export const title = style({
  fontSize: 18,
  fontWeight: 700,
});

export const closeButton = style({
  border: "1px solid #e5e7eb",
  background: "transparent",
  padding: "6px 10px",
  borderRadius: 8,
  cursor: "pointer",
});
