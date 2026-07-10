"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { IUser } from "@/types/user";

import {
  getMe
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
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    void loadUser();
  }, [loadUser]);

  return {
    user,
    loading,
    refresh: loadUser,
    isAuthenticated:
      user !== null,
      role: user?.role || null,
  };
}