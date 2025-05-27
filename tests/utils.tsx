import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router";

import { ThemeProvider } from "styled-components";
import { ClientProvider } from "../src/lib/client";
import { theme } from "../src/theme";

const clientMock = {} as never;

export const renderWithProviders = (ui: React.ReactElement, options = {}) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <BrowserRouter>
      <ClientProvider client={clientMock}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </ClientProvider>
    </BrowserRouter>
  );

  return {
    ...render(ui, { wrapper: Wrapper, ...options }),
  };
};
