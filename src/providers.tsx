import { BrowserRouter } from "react-router";
import { ThemeProvider } from "styled-components";
import { Routes } from "./routes";
import { theme } from "./theme";
import { GlobalStyles } from "./theme/global";

export const Providers = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Routes />
      </ThemeProvider>
    </BrowserRouter>
  );
};
