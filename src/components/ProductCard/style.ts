import styled from "styled-components";

export const CardContainer = styled.div`
  display: flex;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.spacing.md};
  position: relative;
  justify-content: flex-start;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const CardImage = styled.img`
  width: 54px;
  height: 54px;
  border-radius: ${({ theme }) => theme.radii.md};
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  width: 100%;

  overflow: hidden;
`;

export const CardTitle = styled.span`
  font-size: ${({ theme }) => theme.typography.body};
  color: ${({ theme }) => theme.colors.textPrimary};

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const CardDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.small};
  color: ${({ theme }) => theme.colors.textSecondary};

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  max-width: 85%;
`;

export const CardVoteContainer = styled.button`
  all: unset;

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  gap: ${({ theme }) => theme.spacing.xs};

  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.sm};
  padding-inline: ${({ theme }) => theme.spacing.md};

  border-radius: ${({ theme }) => theme.radii.lg};

  border: 1px solid ${({ theme }) => theme.colors.border};

  position: absolute;
  top: 50%;
  right: 0%;
  transform: translate(30%, -50%);

  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  min-width: 4%;

  &[aria-pressed="true"] {
    background-color: ${({ theme }) => theme.colors.upvote};
    color: ${({ theme }) => theme.colors.background};
    border-color: ${({ theme }) => theme.colors.upvote};
  }
`;

export const CardVoteCount = styled.span`
  font-size: ${({ theme }) => theme.typography.small};
  font-weight: ${({ theme }) => theme.typography.weightBold};
`;
