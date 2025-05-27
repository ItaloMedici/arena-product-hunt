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

import FALLBACK_IMAGE from "../../../public/fallback-image.png";

type ProductCardProps = {
  voted: boolean;
  voteCount: number;
  imageUrl: string;
  title: string;
  description: string;
  onVote: () => void;
  slug: string;
};

export const ProductCard = ({
  voted,
  voteCount,
  imageUrl,
  title,
  description,
  onVote,
  slug,
}: ProductCardProps) => {
  const handleVote = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onVote();
  };

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
        onClick={handleVote}
        aria-label="Click to vote"
      >
        <Triangle size={16} />
        <CardVoteCount>{voteCount}</CardVoteCount>
      </CardVoteContainer>
    </CardContainer>
  );
};
