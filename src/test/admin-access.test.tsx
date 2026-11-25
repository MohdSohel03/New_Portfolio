import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import type { User } from "@supabase/supabase-js";

const { mockUseAuth, mockRpc } = vi.hoisted(() => ({
  mockUseAuth: vi.fn(),
  mockRpc: vi.fn(),
}));

vi.mock("@/contexts/AuthContext", () => ({ useAuth: mockUseAuth }));
vi.mock("@/integrations/supabase/client", () => ({
  supabase: { rpc: mockRpc },
}));

import ProtectedRoute from "@/components/ProtectedRoute";

const renderAdminRoute = () =>
  render(
    <MemoryRouter initialEntries={["/admin"]}>
      <Routes>
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <p>Admin dashboard</p>
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<p>Login page</p>} />
        <Route path="/" element={<p>Public homepage</p>} />
      </Routes>
    </MemoryRouter>,
  );

describe("administrator dashboard access", () => {
  beforeEach(() => {
    mockUseAuth.mockReturnValue({
      session: null,
      user: { id: "test-user" } as User,
      loading: false,
      signIn: vi.fn(),
      signOut: vi.fn(),
    });
    mockRpc.mockReset();
  });

  afterEach(() => cleanup());

  it("denies a signed-in non-admin", async () => {
    mockRpc.mockResolvedValue({ data: false, error: null });

    renderAdminRoute();

    expect(await screen.findByText("Public homepage")).toBeInTheDocument();
    expect(screen.queryByText("Admin dashboard")).not.toBeInTheDocument();
    expect(mockRpc).toHaveBeenCalledWith("is_current_user_admin");
  });

  it("denies access when the role check fails", async () => {
    mockRpc.mockResolvedValue({ data: null, error: { message: "Request failed" } });

    renderAdminRoute();

    expect(await screen.findByText("Public homepage")).toBeInTheDocument();
    expect(screen.queryByText("Admin dashboard")).not.toBeInTheDocument();
  });

  it("allows an administrator", async () => {
    mockRpc.mockResolvedValue({ data: true, error: null });

    renderAdminRoute();

    expect(await screen.findByText("Admin dashboard")).toBeInTheDocument();
  });
});