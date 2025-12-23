import { style } from "@vanilla-extract/css";

export const dayCell = style({
  position: "relative",
});

export const diaryDot = style({
  width: 6,
  height: 6,
  borderRadius: "50%",
  backgroundColor: "#ef4444",
  position: "absolute",
  bottom: 4,
  left: "50%",
  transform: "translateX(-50%)",
});
