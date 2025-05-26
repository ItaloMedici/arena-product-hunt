import { gql } from "@apollo/client";

export const GET_POPULAR_PRODUCTS = gql`
  query Posts($after: String) {
    posts(after: $after, order: VOTES) {
      totalCount
      nodes {
        id
        slug
        thumbnail {
          url
        }
        votesCount
        tagline
        name
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

export const GET_NEWEST_PRODUCTS = gql`
  query Posts($after: String) {
    posts(after: $after, order: NEWEST) {
      totalCount
      nodes {
        id
        slug
        thumbnail {
          url
        }
        votesCount
        tagline
        name
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

export const GET_PRODUCT_BY_SLUG = gql`
  query Post($slug: String!) {
    post(slug: $slug) {
      name
      tagline
      description
      media {
        url(width: 1200)
      }
    }
  }
`;
