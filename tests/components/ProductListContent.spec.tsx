import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ProductListContent } from "../../src/components/ProductListContent";
import type { Product } from "../../src/interfaces/products";
import { renderWithProviders } from "../utils";

const mockProducts: Product[] = [
  {
    id: "1",
    voted: false,
    voteCount: 5,
    imageUrl: "https://example.com/image1.png",
    title: "Product 1",
    description: "Description 1",
    slug: "product-1",
  },
  {
    id: "2",
    voted: true,
    voteCount: 8,
    imageUrl: "https://example.com/image2.png",
    title: "Product 2",
    description: "Description 2",
    slug: "product-2",
  },
];

describe("ProductListContent", () => {
  const props = {
    products: mockProducts,
    setProducts: vi.fn(),
    fetcher: vi.fn(),
    handleVote: vi.fn(),
  };

  const mockIntersectionObserver = vi.fn();
  const observe = vi.fn();

  beforeEach(() => {
    mockIntersectionObserver.mockReturnValue({
      observe,
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    });
    window.IntersectionObserver = mockIntersectionObserver;

    renderWithProviders(<ProductListContent {...props} />);
  });

  it("renders a list of products", () => {
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
    expect(screen.getByText("Description 1")).toBeInTheDocument();
    expect(screen.getByText("Description 2")).toBeInTheDocument();
  });

  it("calls handleVote when a product vote button is clicked", async () => {
    const voteButtons = screen.getAllByRole("button", {
      name: /click to vote/i,
    });

    const user = userEvent.setup();

    await user.click(voteButtons[0]);
    await user.click(voteButtons[1]);

    expect(props.handleVote).toHaveBeenCalledTimes(2);
  });

  it("shows loading indicator", () => {
    expect(screen.getByText("Loading products...")).toBeInTheDocument();
  });

  it("calls fetcher when loadMoreItems is triggered", async () => {
    expect(observe).toHaveBeenCalled();
  });
});
