import styled from "styled-components";

export const MaxContentWidth = styled.div`
  margin: 0 auto;
  padding: 0 24px;

  @media (max-width: 768px) {
    max-width: 100%;
  }

  @media (min-width: 768px) and (max-width: 1200px) {
    max-width: 90%;
  }

  @media (min-width: 1200px) {
    max-width: 70%;
  }
`;
