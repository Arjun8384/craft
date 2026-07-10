"use client";

import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { register as registerUser } from "@/services/authService";

import type { RegisterPayload } from "@/types/auth";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterForm() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterPayload>();

  async function onSubmit(
    data: RegisterPayload
  ) {
    try {
      setLoading(true);

      await registerUser(data);

      toast.success(
        "Registration successful."
      );

      router.replace("/login");
    } catch (error) {
      console.error(error);

      toast.error(
        "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md p-8">
      <h1 className="mb-6 text-center text-3xl font-bold">
        Create Account
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <div>
          <Label htmlFor="name">
            Name
          </Label>

          <Input
            id="name"
            aria-label="Name"
            {...register("name", {
              required: "Name is required",
            })}
          />

          {errors.name && (
            <p className="mt-1 text-sm text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="email">
            Email
          </Label>

          <Input
            id="email"
            type="email"
            aria-label="Email"
            {...register("email", {
              required: "Email is required",
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
          className="w-full"
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Creating..."
            : "Create Account"}
        </Button>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium underline"
          >
            Login
          </Link>
        </p>
      </form>
    </Card>
  );
}