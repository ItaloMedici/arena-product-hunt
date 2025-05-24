import { BrowserRouter } from "react-router";
import { ThemeProvider } from "styled-components";
import { Routes } from "./routes";
import { theme } from "./theme";

export const Providers = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={{ theme }}>
        <Routes />
      </ThemeProvider>
    </BrowserRouter>
  );
};
