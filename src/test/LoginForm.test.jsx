// src/test/LoginForm.test.jsx

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import LoginForm from "../components/auth/loginForm";
import AuthContextProvider from "../auth/AuthProvider";
import { describe, expect, it, vi } from "vitest";

vi.mock("../hooks/useAuth", () => ({
  useLoginUser: () => ({
    mutate: vi.fn(),
    isPending: false,
  }),
}));

describe("LoginForm Component", () => {
  it("should toggle password visibility when the eye icon is clicked", async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <AuthContextProvider>
          <LoginForm />
        </AuthContextProvider>
      </BrowserRouter>
    );

    const passwordInput = screen.getByPlaceholderText(/enter your password/i);
    const toggleButton = screen.getByRole("button", { name: /show password/i });

    expect(passwordInput).toHaveAttribute("type", "password");

    await user.click(toggleButton);

    expect(passwordInput).toHaveAttribute("type", "text");
    expect(
      screen.getByRole("button", { name: /hide password/i })
    ).toBeInTheDocument();

    await user.click(toggleButton);

    expect(passwordInput).toHaveAttribute("type", "password");
  });
});
