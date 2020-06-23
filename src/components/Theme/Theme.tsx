import React from "react";
import { ThemeProvider } from "styled-components";
import ThemeGlobalStyle from "./StyledTheme";

export const theme = {
  colorPrimary: "rgba(0,0,0,.65)",
  colorSecondary: "rgba(0,0,0,.45)",
  colorThirty: "rgba(0,0,0,.85)",
  colorRed: "rgb(255, 77, 79)",
  colorBlue: "#1890ff",
  colorBlueRgb: "24, 144, 255",
  bgColor: "#f0f2f5",
  fontPrimary: ["Open Sans", "sans-serif"],

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