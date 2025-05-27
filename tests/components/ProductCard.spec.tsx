import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ProductCard } from "../../src/components/ProductCard";
import { renderWithProviders } from "../utils";

describe("ProductCard", () => {
  const productProps = {
    voted: false,
    voteCount: 10,
    imageUrl: "https://example.com/image.png",
    title: "Test Product",
    description: "A cool product",
    onVote: vi.fn(),
    slug: "test-product",
  };

  beforeEach(() => {
    renderWithProviders(<ProductCard {...productProps} />);
  });

  it("renders product information", () => {
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("A cool product")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByAltText("Product Image")).toHaveAttribute(
      "src",
      productProps.imageUrl
    );
  });

  it("calls onVote when vote button is clicked", async () => {
    const voteButton = screen.getByRole("button", { name: /click to vote/i });

    const user = userEvent.setup();

    await user.click(voteButton);

    expect(productProps.onVote).toHaveBeenCalledTimes(1);
  });

  it("shows fallback image if image fails to load", () => {
    const img = screen.getByAltText("Product Image") as HTMLImageElement;

    fireEvent.error(img);

    expect(img.src).toContain("fallback-image.png");
  });

  it("renders as a link to the product page", () => {
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/test-product");
  });
});
