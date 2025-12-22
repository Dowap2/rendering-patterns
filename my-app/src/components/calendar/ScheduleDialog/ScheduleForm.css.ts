import { style } from "@vanilla-extract/css";

export const form = style({
  display: "flex",
  flexDirection: "column",
  gap: 12,
});

export const field = style({
  display: "flex",
  flexDirection: "column",
  gap: 6,
});

export const label = style({
  fontSize: 13,
  fontWeight: 600,
});

export const input = style({
  border: "1px solid #e5e7eb",
  borderRadius: 8,
  padding: "10px 12px",
  fontSize: 14,
  outline: "none",
});

export const textarea = style([
  input,
  {
    minHeight: 96,
    resize: "vertical",
  },
]);

export const row = style({
  display: "flex",
  gap: 8,
  alignItems: "center",
  flexWrap: "wrap",
});

export const checkboxRow = style({
  display: "flex",
  alignItems: "center",
  gap: 8,
});

export const actions = style({
  display: "flex",
  justifyContent: "flex-end",
  gap: 8,
  marginTop: 4,
});

export const button = style({
  border: "1px solid #e5e7eb",
  background: "#fff",
  padding: "10px 12px",
  borderRadius: 8,
  cursor: "pointer",
});

export const primaryButton = style([
  button,
  {
    borderColor: "#111827",
    background: "#111827",
    color: "#fff",
  },
]);

export const helper = style({
  fontSize: 12,
  color: "#6b7280",
});
