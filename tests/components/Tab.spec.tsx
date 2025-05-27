import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { Tab, type TabItem } from "../../src/components/Tab";
import { renderWithProviders } from "../utils";

const tabItems: TabItem[] = [
  { label: "Tab 1", content: <div>Content 1</div>, key: "tab1" },
  { label: "Tab 2", content: <div>Content 2</div>, key: "tab2" },
  { label: "Tab 3", content: <div>Content 3</div>, key: "tab3" },
];

describe("Tab", () => {
  beforeEach(() => {
    renderWithProviders(<Tab items={tabItems} />);
  });
  it("renders all tab headers", () => {
    expect(screen.getByRole("tab", { name: "Tab 1" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Tab 2" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Tab 3" })).toBeInTheDocument();
  });

  it("shows the content of the first tab by default", () => {
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Content 1");
  });

  it("changes content when another tab is clicked", async () => {
    const user = userEvent.setup();

    await user.click(screen.getByRole("tab", { name: "Tab 2" }));
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Content 2");

    await user.click(screen.getByRole("tab", { name: "Tab 3" }));
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Content 3");
  });

  it("sets aria-selected correctly", async () => {
    const user = userEvent.setup();

    const tab1 = screen.getByRole("tab", { name: "Tab 1" });
    const tab2 = screen.getByRole("tab", { name: "Tab 2" });

    expect(tab1).toHaveAttribute("aria-selected", "true");
    expect(tab2).toHaveAttribute("aria-selected", "false");

    await user.click(tab2);

    expect(tab1).toHaveAttribute("aria-selected", "false");
    expect(tab2).toHaveAttribute("aria-selected", "true");
  });
});
