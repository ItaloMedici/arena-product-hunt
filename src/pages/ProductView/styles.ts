import styled from "styled-components";

export const MainContainer = styled.main`
  padding-top: ${({ theme }) => theme.spacing.lg};
`;

export const HeeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  margin-bottom: ${({ theme }) => theme.spacing.lg};

  a {
    all: unset;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    color: ${({ theme }) => theme.colors.gray[700]};

    &:hover {
      background-color: ${({ theme }) => theme.colors.gray[100]};
    }
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;

  border-radius: ${({ theme }) => theme.radii.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};

  box-shadow: ${({ theme }) => theme.shadows.card};
`;

export const ProductCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.radii.md};
`;

export const ProductTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.h1};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const ProductDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.body};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: ${({ theme }) => theme.spacing.sm};
`;
