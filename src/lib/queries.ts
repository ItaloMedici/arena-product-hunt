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
        url
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
        url
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
