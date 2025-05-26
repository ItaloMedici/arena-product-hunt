import { useQuery } from "@apollo/client";
import { ChevronLeft } from "lucide-react";
import { NavLink, useParams } from "react-router";
import { LoadingIcon } from "../../components/LoadingIcon";
import { MaxContentWidth } from "../../components/MaxContentWidth";
import type { PostClientResponse } from "../../interfaces/api";
import { GET_PRODUCT_BY_SLUG } from "../../lib/queries";
import {
  HeeaderContainer,
  LoadingContainer,
  MainContainer,
  ProductCard,
  ProductDescription,
  ProductImage,
  ProductTitle,
} from "./styles";

export const ProductView = () => {
  const { slug } = useParams();
  const { data, loading } = useQuery<PostClientResponse>(GET_PRODUCT_BY_SLUG, {
    variables: { slug },
  });

  if (loading) {
    return (
      <LoadingContainer>
        <LoadingIcon />
        <p>Loading...</p>
      </LoadingContainer>
    );
  }

  return (
    <MainContainer>
      <MaxContentWidth>
        <HeeaderContainer>
          <NavLink to="/" aria-label="Go back">
            <ChevronLeft />
          </NavLink>
        </HeeaderContainer>
        <ProductImage src={data?.post.media[0].url} alt={data?.post.name} />
        <ProductCard>
          <ProductTitle>{data?.post.name}</ProductTitle>
          <ProductDescription>{data?.post.description}</ProductDescription>
        </ProductCard>
      </MaxContentWidth>
    </MainContainer>
  );
};
