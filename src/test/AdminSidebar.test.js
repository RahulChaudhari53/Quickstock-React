// // src/components/admin/AdminSidebar.test.jsx

// import { screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import AdminSidebar from "../components/admin/AdminSidebar";
// import { renderWithProviders } from "../../utils/test-utils";
// import { describe, expect, it, vi } from "vitest";

// describe("AdminSidebar", () => {
//   it("should call the logout function when the logout button is clicked", async () => {
//     const user = userEvent.setup();
//     const mockLogout = vi.fn();

//     const providerProps = {
//       user: { role: "admin", firstName: "Test" },
//       logout: mockLogout,
//     };

//     renderWithProviders(<AdminSidebar />, { providerProps });

//     const logoutButton = screen.getByRole("button", { name: /logout/i });
//     await user.click(logoutButton);

//     expect(mockLogout).toHaveBeenCalledTimes(1);
//   });
// });
