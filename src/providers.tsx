import { BrowserRouter } from "react-router";
import { ThemeProvider } from "styled-components";
import { apiClient, ClientProvider } from "./lib/client";
import { Routes } from "./routes";
import { theme } from "./theme";
import { GlobalStyles } from "./theme/global";

export const Providers = () => {
  return (
    <BrowserRouter>
      <ClientProvider client={apiClient}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Routes />
        </ThemeProvider>
      </ClientProvider>
    </BrowserRouter>
  );
};
