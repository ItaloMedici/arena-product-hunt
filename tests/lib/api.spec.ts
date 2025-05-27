import { beforeEach, describe, expect, it, vi } from "vitest";
import { productsApi } from "../../src/lib/api";
import { apiClient } from "../../src/lib/client";
import {
  GET_NEWEST_PRODUCTS,
  GET_POPULAR_PRODUCTS,
} from "../../src/lib/queries";

// Mock the API client
vi.mock("../../src/lib/client", () => ({
  apiClient: {
    query: vi.fn(),
  },
}));

const mockedApiClient = apiClient as unknown as {
  query: ReturnType<typeof vi.fn>;
};

const mockApiResponse = {
  data: {
    posts: {
      nodes: [
        {
          id: "1",
          name: "Test Product 1",
          tagline: "Description 1",
          thumbnail: {
            url: "https://example.com/image1.jpg",
          },
          votesCount: 10,
          slug: "test-product-1",
        },
        {
          id: "2",
          name: "Test Product 2",
          tagline: "Description 2",
          thumbnail: {
            url: "https://example.com/image2.jpg",
          },
          votesCount: 20,
          slug: "test-product-2",
        },
      ],
      pageInfo: {
        endCursor: "next-cursor",
        hasNextPage: true,
      },
    },
  },
};

describe("API Module", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("fetchPopularProducts", () => {
    it("fetches popular products without cursor", async () => {
      mockedApiClient.query.mockResolvedValue(mockApiResponse);

      const result = await productsApi.fetchPopularProducts();

      expect(mockedApiClient.query).toHaveBeenCalledWith({
        query: GET_POPULAR_PRODUCTS,
        variables: { after: null },
      });

      expect(result).toEqual({
        products: [
          {
            id: "1",
            title: "Test Product 1",
            description: "Description 1",
            imageUrl: "https://example.com/image1.jpg",
            voteCount: 10,
            voted: false,
            slug: "test-product-1",
          },
          {
            id: "2",
            title: "Test Product 2",
            description: "Description 2",
            imageUrl: "https://example.com/image2.jpg",
            voteCount: 20,
            voted: false,
            slug: "test-product-2",
          },
        ],
        pageInfo: {
          nextCursor: "next-cursor",
          hasNextPage: true,
        },
      });
    });

    it("fetches popular products with cursor", async () => {
      mockedApiClient.query.mockResolvedValue(mockApiResponse);

      const result = await productsApi.fetchPopularProducts("some-cursor");

      expect(mockedApiClient.query).toHaveBeenCalledWith({
        query: GET_POPULAR_PRODUCTS,
        variables: { after: "some-cursor" },
      });

      expect(result.pageInfo.nextCursor).toBe("next-cursor");
    });

    it("handles API errors", async () => {
      const error = new Error("API Error");
      mockedApiClient.query.mockRejectedValue(error);

      await expect(productsApi.fetchPopularProducts()).rejects.toThrow(
        "API Error"
      );
    });
  });

  describe("fetchNewestProducts", () => {
    it("fetches newest products without cursor", async () => {
      mockedApiClient.query.mockResolvedValue(mockApiResponse);

      const result = await productsApi.fetchNewestProducts();

      expect(mockedApiClient.query).toHaveBeenCalledWith({
        query: GET_NEWEST_PRODUCTS,
        variables: { after: null },
      });

      expect(result).toEqual({
        products: [
          {
            id: "1",
            title: "Test Product 1",
            description: "Description 1",
            imageUrl: "https://example.com/image1.jpg",
            voteCount: 10,
            voted: false,
            slug: "test-product-1",
          },
          {
            id: "2",
            title: "Test Product 2",
            description: "Description 2",
            imageUrl: "https://example.com/image2.jpg",
            voteCount: 20,
            voted: false,
            slug: "test-product-2",
          },
        ],
        pageInfo: {
          nextCursor: "next-cursor",
          hasNextPage: true,
        },
      });
    });

    it("fetches newest products with cursor", async () => {
      mockedApiClient.query.mockResolvedValue(mockApiResponse);

      const result = await productsApi.fetchNewestProducts("some-cursor");

      expect(mockedApiClient.query).toHaveBeenCalledWith({
        query: GET_NEWEST_PRODUCTS,
        variables: { after: "some-cursor" },
      });

      expect(result.pageInfo.nextCursor).toBe("next-cursor");
    });

    it("handles API errors", async () => {
      const error = new Error("API Error");
      mockedApiClient.query.mockRejectedValue(error);

      await expect(productsApi.fetchNewestProducts()).rejects.toThrow(
        "API Error"
      );
    });
  });
});
