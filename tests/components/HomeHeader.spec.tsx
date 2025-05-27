import { describe, expect, it } from "vitest";
import { HomeHeader } from "../../src/components/HomeHeader";
import { renderWithProviders } from "../utils";

describe("HomeHeader", () => {
  it("should render the component successfully", () => {
    const { getByText, getByRole } = renderWithProviders(<HomeHeader />);

    const dateHeader = new Date().toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
    });

    expect(getByText(`Today, ${dateHeader}`)).toBeInTheDocument();
    expect(getByRole("img", { name: /User profile/i })).toBeInTheDocument();
    expect(
      getByRole("button", { name: /Search products/i })
    ).toBeInTheDocument();
  });
});
