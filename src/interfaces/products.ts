export interface FetchProductsResult {
  products: Product[];
  pageInfo: {
    nextCursor: string;
    hasNextPage: boolean;
  };
}
export interface Product {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  voteCount: number;
  voted: boolean;
  slug: string;
}

export interface ProductView {
  name: string;
  tagline: string;
  description: string;
  media: {
    url: string;
  }[];
}
