"use client";

import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { login } from "@/services/authService";

import type { LoginPayload } from "@/types/auth";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>();

  async function onSubmit(
    data: LoginPayload
  ) {
    try {
      setLoading(true);

      await login(data);

      toast.success(
        "Login successful."
      );

      router.replace("/dashboard");
      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error(
        "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md p-8">
      <h1 className="mb-6 text-center text-3xl font-bold">
        Tool Lending System
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <div>
          <Label htmlFor="email">
            Email
          </Label>

          <Input
            id="email"
            type="email"
            aria-label="Email"
            {...register("email", {
              required:
                "Email is required",
            })}
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="password">
            Password
          </Label>

          <Input
            id="password"
            type="password"
            aria-label="Password"
            {...register("password", {
              required:
                "Password is required",
            })}
          />

          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading
            ? "Signing In..."
            : "Sign In"}
        </Button>

        <p className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium underline"
          >
            Register
          </Link>
        </p>
      </form>
    </Card>
  );
}