import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Header from "../Header";

// Mock next/navigation
const mockUsePathname = vi.fn();
vi.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}));

// Mock next/link
vi.mock("next/link", () => ({
  default: ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

describe("Header", () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue("/");
  });

  it("renders all navigation links", () => {
    render(<Header />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Todos")).toBeInTheDocument();
    expect(screen.getByText("Guide")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("renders links with correct hrefs", () => {
    render(<Header />);

    expect(screen.getByText("Home").closest("a")).toHaveAttribute("href", "/");
    expect(screen.getByText("Todos").closest("a")).toHaveAttribute("href", "/todos");
    expect(screen.getByText("Guide").closest("a")).toHaveAttribute("href", "/guide");
    expect(screen.getByText("Login").closest("a")).toHaveAttribute("href", "/login");
  });

  it("applies active styles to the current route link", () => {
    mockUsePathname.mockReturnValue("/todos");
    render(<Header />);

    const todosLink = screen.getByText("Todos").closest("a");
    const homeLink = screen.getByText("Home").closest("a");

    expect(todosLink?.className).toContain("underline");
    expect(homeLink?.className).not.toContain("underline");
  });

  it("applies inactive styles to non-current route links", () => {
    mockUsePathname.mockReturnValue("/");
    render(<Header />);

    const todosLink = screen.getByText("Todos").closest("a");
    const guideLink = screen.getByText("Guide").closest("a");

    expect(todosLink?.className).toContain("text-black/50");
    expect(guideLink?.className).toContain("text-black/50");
  });

  it("renders a header element", () => {
    render(<Header />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("renders a nav element", () => {
    render(<Header />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });
});
