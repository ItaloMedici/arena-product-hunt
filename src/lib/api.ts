import type { DocumentNode } from "graphql";
import type { PostsListClientResponse } from "../interfaces/api";
import type { FetchProductsResult, Product } from "../interfaces/products";
import { apiClient } from "./client";
import { GET_NEWEST_PRODUCTS, GET_POPULAR_PRODUCTS } from "./queries";

function mapProduct(
  item: PostsListClientResponse["posts"]["nodes"][number]
): Product {
  return {
    id: item.id,
    title: item.name,
    description: item.tagline,
    imageUrl: item.thumbnail.url,
    voteCount: item.votesCount,
    voted: false,
    slug: item.slug,
  };
}

function parseResponseList(data: PostsListClientResponse): FetchProductsResult {
  const { endCursor, hasNextPage } = data.posts.pageInfo;
  return {
    pageInfo: { nextCursor: endCursor, hasNextPage },
    products: data.posts.nodes.map(mapProduct),
  };
}

async function fetchProducts(
  query: DocumentNode,
  cursor: string | null = null
): Promise<FetchProductsResult> {
  const { data } = await apiClient.query({
    query,
    variables: { after: cursor },
  });

  return parseResponseList(data);
}

export const productsApi = {
  fetchPopularProducts: (cursor?: string | null) =>
    fetchProducts(GET_POPULAR_PRODUCTS, cursor ?? null),
  fetchNewestProducts: (cursor?: string | null) =>
    fetchProducts(GET_NEWEST_PRODUCTS, cursor ?? null),
};
