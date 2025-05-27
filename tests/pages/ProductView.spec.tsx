import { screen } from "@testing-library/react";
import { useParams } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useClientQuery } from "../../src/lib/client";
import { ProductView } from "../../src/pages/ProductView";
import { renderWithProviders } from "../utils";

// Mock modules
vi.mock("../../src/lib/client", async () => {
  const actual = await vi.importActual<typeof import("../../src/lib/client")>(
    "../../src/lib/client"
  );
  return {
    ...actual,
    useClientQuery: vi.fn(),
  };
});

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useParams: vi.fn(),
  };
});

const mockedUseParams = useParams as unknown as ReturnType<typeof vi.fn>;
const mockedClientQuery = useClientQuery as unknown as ReturnType<typeof vi.fn>;

describe("ProductView Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading state initially", () => {
    mockedUseParams.mockReturnValue({ slug: "my-product" });
    mockedClientQuery.mockReturnValue({
      loading: true,
      data: null,
    });
    renderWithProviders(<ProductView />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    // The loading icon is a component, not an <img>, so we don't check for role img here
  });

  it("renders product data when loaded", () => {
    mockedUseParams.mockReturnValue({ slug: "my-product" });
    mockedClientQuery.mockReturnValue({
      loading: false,
      data: {
        post: {
          name: "Test Product",
          description: "This is a test product.",
          media: [{ url: "https://example.com/image.jpg" }],
        },
      },
    });
    renderWithProviders(<ProductView />);
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      "https://example.com/image.jpg"
    );
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("This is a test product.")).toBeInTheDocument();
    expect(screen.getByLabelText("Go back")).toBeInTheDocument();
  });
});
