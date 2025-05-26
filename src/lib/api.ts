import type { DocumentNode } from "graphql";
import type { PostsClientResponse } from "../interfaces/api";
import type { Product } from "../interfaces/products";
import { apiClient } from "./client";
import { GET_NEWEST_PRODUCTS, GET_POPULAR_PRODUCTS } from "./queries";

export interface FetchProductsResult {
  products: Product[];
  pageInfo: {
    nextCursor: string;
    hasNextPage: boolean;
  };
}

const parseResponse = (data: PostsClientResponse) => {
  const products = data.posts.nodes.map<Product>((item) => ({
    description: item.tagline,
    imageUrl: item.thumbnail.url,
    title: item.name,
    voteCount: item.votesCount,
    voted: false,
    url: item.url,
    id: item.id,
  }));

  return {
    pageInfo: {
      nextCursor: data.posts.pageInfo.endCursor,
      hasNextPage: data.posts.pageInfo.hasNextPage,
    },
    products,
  };
};

const fetcher = async (
  query: DocumentNode,
  cursor: string | null = null
): Promise<FetchProductsResult> => {
  const { data } = await apiClient.query({
    query,
    variables: {
      after: cursor,
    },
  });

  return parseResponse(data);
};

export const productsApi = {
  fetchPopularProducts: (cursor: string | null = null) =>
    fetcher(GET_POPULAR_PRODUCTS, cursor),
  fetchNewestProducts: (cursor: string | null = null) =>
    fetcher(GET_NEWEST_PRODUCTS, cursor),
};
