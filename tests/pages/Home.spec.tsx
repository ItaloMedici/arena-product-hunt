import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Product } from "../../src/interfaces/products";
import { productsApi } from "../../src/lib/api";
import { Home } from "../../src/pages/Home";
import { renderWithProviders } from "../utils";

// Mock the API module
vi.mock("../../src/lib/api", () => ({
  productsApi: {
    fetchPopularProducts: vi.fn(),
    fetchNewestProducts: vi.fn(),
  },
}));

const mockProducts = [
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
    voted: true,
    slug: "test-product-2",
  },
] as Product[];

const mockProductsNewest = [
  {
    id: "1",
    title: "Test Newest Product 1",
    description: "Description 1",
    imageUrl: "https://example.com/image1.jpg",
    voteCount: 10,
    voted: false,
    slug: "test-newest-product-1",
  },
  {
    id: "2",
    title: "Test Newest Product 2",
    description: "Description 2",
    imageUrl: "https://example.com/image2.jpg",
    voteCount: 20,
    voted: true,
    slug: "test-newest-product-2",
  },
] as Product[];

type MockedProductsApi = {
  fetchPopularProducts: ReturnType<typeof vi.fn>;
  fetchNewestProducts: ReturnType<typeof vi.fn>;
};

const mockedProductsApi = productsApi as unknown as MockedProductsApi;

describe("Home Page", () => {
  const mockIntersectionObserver = vi.fn();
  const observe = vi.fn();
  const unobserve = vi.fn();
  const disconnect = vi.fn();

  let intersectionCallback: IntersectionObserverCallback;

  const createMockIntersectionObserverEntry = (
    isIntersecting: boolean
  ): IntersectionObserverEntry => ({
    isIntersecting,
    boundingClientRect: {} as DOMRectReadOnly,
    intersectionRatio: 0,
    intersectionRect: {} as DOMRectReadOnly,
    rootBounds: null,
    target: document.createElement("div"),
    time: 0,
  });

  mockIntersectionObserver.mockImplementation((callback) => {
    intersectionCallback = callback;
    return {
      observe,
      unobserve,
      disconnect,
    };
  });

  beforeEach(() => {
    vi.clearAllMocks();

    window.IntersectionObserver = mockIntersectionObserver;

    mockedProductsApi.fetchPopularProducts.mockResolvedValue({
      products: mockProducts,
      pageInfo: {
        nextCursor: "next-cursor",
        hasNextPage: true,
      },
    });
    mockedProductsApi.fetchNewestProducts.mockResolvedValue({
      products: mockProductsNewest,
      pageInfo: {
        nextCursor: "next-cursor",
        hasNextPage: true,
      },
    });
  });

  it("renders the home page with tabs", () => {
    renderWithProviders(<Home />);

    expect(screen.getByText("Popular")).toBeInTheDocument();
    expect(screen.getByText("Newest")).toBeInTheDocument();
  });

  it("loads and displays popular products", async () => {
    renderWithProviders(<Home />);

    intersectionCallback(
      [createMockIntersectionObserverEntry(true)],
      {} as IntersectionObserver
    );

    await waitFor(() => {
      expect(screen.getByText("Test Product 1")).toBeInTheDocument();
      expect(screen.getByText("Test Product 2")).toBeInTheDocument();
    });

    expect(mockedProductsApi.fetchPopularProducts).toHaveBeenCalledWith(null);
  });

  it("loads and displays newest products when switching tabs", async () => {
    renderWithProviders(<Home />);

    await userEvent.click(screen.getByText("Newest"));

    intersectionCallback(
      [createMockIntersectionObserverEntry(true)],
      {} as IntersectionObserver
    );

    await waitFor(() => {
      expect(screen.getByText("Test Newest Product 1")).toBeInTheDocument();
      expect(screen.getByText("Test Newest Product 2")).toBeInTheDocument();
    });

    expect(mockedProductsApi.fetchNewestProducts).toHaveBeenCalledWith(null);
  });

  it("handles voting on products", async () => {
    renderWithProviders(<Home />);

    intersectionCallback(
      [createMockIntersectionObserverEntry(true)],
      {} as IntersectionObserver
    );

    await waitFor(() => {
      expect(screen.getByText("Test Product 1")).toBeInTheDocument();
    });

    const voteButtons = screen.getAllByRole("button", {
      name: /click to vote/i,
    });
    const firstVoteButton = voteButtons[0];

    expect(screen.getByText("10")).toBeInTheDocument();

    await userEvent.click(firstVoteButton);

    await waitFor(() => {
      expect(screen.getByText("11")).toBeInTheDocument();
    });
  });
});
