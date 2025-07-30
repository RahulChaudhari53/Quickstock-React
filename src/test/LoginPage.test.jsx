import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "../pages/auth/LoginPage";
import { describe, expect, it, vi } from "vitest";
import AuthContextProvider from "../auth/AuthProvider";


vi.mock("../hooks/useAuth", () => ({
  useLoginUser: () => ({
    mutate: vi.fn(),
    isPending: false,
  }),
}));

describe("Login Page", () => {
  it("should render the main heading and the login form", () => {
    render(
      <BrowserRouter>
        <AuthContextProvider>
          <Login />
        </AuthContextProvider>
      </BrowserRouter>
    );

    const headingElement = screen.getByRole("heading", {
      name: /welcome back to quickstock/i,
    });
    const signInButton = screen.getByRole("button", { name: /sign in/i });

    expect(headingElement).toBeInTheDocument();
    expect(signInButton).toBeInTheDocument();
  });
});
