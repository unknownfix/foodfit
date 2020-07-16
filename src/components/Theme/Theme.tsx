import React from "react";
import { ThemeProvider } from "styled-components";
import ThemeGlobalStyle from "./StyledTheme";

export const theme = {
  menuHeight: "6rem",
  colorPrimary: "#0B285F", // dark blue
  colorSecondary: "#65A6F2", // white blue
  colorTertiary: "#9FB2BC", // gray
  colorGray: "#F5F7F9",
  colorGreen: "#6FE2B2",
  colorRed: "rgb(255, 77, 79)",
  colorBlue: "#1890ff",
  colorBlueRgb: "24, 144, 255",
  bgColor: "#fff",
  colorButton: {},
  fontPrimary: ["Montserrat", "sans-serif"],

  // RESPONSIVE BREAKPOINTS
  bpHuge: "112.5em", // 1800px
  bpLargest: "75em", // 1200px
  bpLarge: "62.5em", // 1000px
  bpMedium: "50em", // 800px
  bpSmall: "37.5em", // 600px
};

const Theme: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <ThemeGlobalStyle />
      {children}
    </ThemeProvider>
  );
};

export default Theme;
