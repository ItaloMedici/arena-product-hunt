export interface PostsListClientResponse {
  posts: {
    nodes: Array<{
      id: string;
      name: string;
      tagline: string;
      thumbnail: {
        url: string;
      };
      votesCount: number;
      slug: string;
    }>;
    pageInfo: {
      endCursor: string;
      hasNextPage: boolean;
    };
  };
}

export interface PostClientResponse {
  post: {
    name: string;
    tagline: string;
    description: string;
    media: Array<{
      url: string;
    }>;
  };
}
