import styled from "styled-components";

export const HeaderContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
`;

export const HeaderWrapper = styled.header`
  background-color: ${({ theme }) => theme.colors.background};
  padding-block: ${({ theme }) => theme.spacing.md};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const UserImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

export const DateHeader = styled.span`
  background-color: ${({ theme }) => theme.colors.gray[100]};
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  padding-block: ${({ theme }) => theme.spacing.sm};
  padding-inline: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.small};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: ${({ theme }) => theme.typography.weightMedium};
`;

export const SearchButton = styled.button`
  all: unset;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.gray[500]};
  border: none;
  border-radius: ${({ theme }) => theme.radii.sm};
  padding: ${({ theme }) => theme.spacing.md};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;
