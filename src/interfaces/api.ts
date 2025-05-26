import type { Product } from "./products";

export interface FetchProductsResult {
  products: Product[];
  pageInfo: {
    nextCursor: string;
    hasNextPage: boolean;
  };
}

export interface PostsClientResponse {
  posts: {
    nodes: Array<{
      id: string;
      name: string;
      tagline: string;
      thumbnail: {
        url: string;
      };
      votesCount: number;
      url: string;
    }>;
    pageInfo: {
      endCursor: string;
      hasNextPage: boolean;
    };
  };
}
