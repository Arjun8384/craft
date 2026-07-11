"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { IUser } from "@/types/user";

import {
  getMe,
  logout,
} from "@/services/authService";

export function useAuth() {
  const [user, setUser] =
    useState<IUser | null>(null);

  const [loading, setLoading] =
    useState(true);

  const loadUser =
    useCallback(async () => {
      try {
        const currentUser =
          await getMe();

        setUser(currentUser);
      } catch (error) {
        console.error(error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }, []);

  const handleLogout =
    useCallback(async () => {
      try {
        await logout();
      } catch (error) {
        console.error(error);
      } finally {
        setUser(null);
        window.location.href = "/login";
      }
    }, []);

useEffect(() => {
  queueMicrotask(() => {
    void loadUser();
  });
}, [loadUser]);

  return {
    user,
    loading,
    refresh: loadUser,
    logout: handleLogout,
    isAuthenticated: !!user,
    role: user?.role ?? null,
  };
}