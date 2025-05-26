import { Loader } from "lucide-react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Icon = styled(Loader)`
  animation: ${spin} 0.8s linear infinite;
`;
