import { style } from "@vanilla-extract/css";

export const header = style({
  borderBottom: "1px solid #e5e7eb",
});

export const inner = style({
  maxWidth: "768px",
  margin: "0 auto",
  padding: "16px 24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const title = style({
  fontSize: "20px",
  fontWeight: 600,
});

export const nav = style({
  display: "flex",
  gap: "12px",
});

export const link = style({
  padding: "6px 12px",
  borderRadius: "8px",
  fontSize: "14px",
  textDecoration: "none",
  color: "#111827",

  selectors: {
    "&:hover": {
      backgroundColor: "#f3f4f6",
    },
  },
});
