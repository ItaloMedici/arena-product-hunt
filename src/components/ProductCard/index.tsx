import { Triangle } from "lucide-react";
import {
  CardContainer,
  CardContent,
  CardDescription,
  CardImage,
  CardTitle,
  CardVoteContainer,
  CardVoteCount,
} from "./style";

type ProductCardProps = {
  voted: boolean;
  voteCount: number;
  imageUrl: string;
  title: string;
  description: string;
  onVote: () => void;
  slug: string;
};

const FALLBACK_IMAGE = "https://via.placeholder.com/100";

export const ProductCard = ({
  voted,
  voteCount,
  imageUrl,
  title,
  description,
  onVote,
  slug,
}: ProductCardProps) => {
  return (
    <CardContainer to={`/${slug}`}>
      <CardImage
        src={imageUrl ?? FALLBACK_IMAGE}
        alt="Product Image"
        onError={(event) => (event.currentTarget.src = FALLBACK_IMAGE)}
      />
      <CardContent>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardVoteContainer
        type="button"
        aria-pressed={voted}
        onClick={onVote}
        aria-label="Click to vote"
      >
        <Triangle size={16} />
        <CardVoteCount>{voteCount}</CardVoteCount>
      </CardVoteContainer>
    </CardContainer>
  );
};
