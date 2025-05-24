import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  :root {
    font-family: ${({ theme }) => theme.typography.fontFamily};

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * {
    margin: 0;
    box-sizing: border-box;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }

  body {
    width: 100%;
    background-color: ${({ theme }) => theme.colors.gray[50]};
  }
  
`;
