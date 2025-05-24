import styled from "styled-components";

export const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const TabList = styled.ul`
  all: unset;
  display: flex;
  justify-content: stretch;
  align-items: stretch;
`;

export const TabHeader = styled.li`
  all: unset;
  position: relative;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-block: ${({ theme }) => theme.spacing.md};

  font-weight: ${({ theme }) => theme.typography.weightMedium};

  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textSecondary};

  transition: color 0.3s ease-in-out;

  :hover {
    color: ${({ theme }) => theme.colors.gray[700]};
  }

  cursor: pointer;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    border-radius: ${({ theme }) => theme.radii.sm};
    transition: all 0.3s ease-in-out;
    width: 0;
  }

  &[aria-selected="true"] {
    color: ${({ theme }) => theme.colors.primary[700]};

    :hover {
      color: ${({ theme }) => theme.colors.primary[900]};
    }

    &:after {
      content: "";
      background-color: ${({ theme }) => theme.colors.primary[500]};
      width: 100%;
    }
  }
`;

export const TabContent = styled.div`
  padding-top: ${({ theme }) => theme.spacing.lg};
`;
