"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { ITool } from "@/types/tool";
import { ToolInput, toolSchema } from "@/lib/validators";

import {
  createTool,
  updateTool,
} from "@/services/toolService";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ToolFormProps {
  mode: "create" | "edit";
  initialData?: ITool;
}

export default function ToolForm({
  mode,
  initialData,
}: ToolFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm<ToolInput>({
    resolver: zodResolver(toolSchema),

    defaultValues: {
      name: initialData?.name ?? "",
      category: initialData?.category ?? "",
      description: initialData?.description ?? "",
      quantity: initialData?.quantity ?? 1,
      availableQuantity:
        initialData?.availableQuantity ?? 1,
      condition:
        initialData?.condition ?? "Excellent",
      location: initialData?.location ?? "",
      status: initialData?.status ?? "Available",
      image: initialData?.image ?? "",
    },
  });

  async function onSubmit(values: ToolInput) {
    try {
      setLoading(true);

      if (mode === "create") {
        await createTool(values);
        toast.success("Tool created successfully");
      } else {
        if (!initialData?._id) {
          throw new Error("Tool id missing");
        }

        await updateTool(initialData._id, values);
        toast.success("Tool updated successfully");
      }

      router.push("/dashboard/tools");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        className="space-y-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tool Name</FormLabel>

              <FormControl>
                <Input
                  placeholder="Cordless Drill"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>

              <FormControl>
                <Input
                  placeholder="Power Tools"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>

              <FormControl>
                <Textarea
                  rows={4}
                  placeholder="Enter description..."
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Quantity</FormLabel>

                <FormControl>
                  <Input
                    type="number"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="availableQuantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Available Quantity
                </FormLabel>

                <FormControl>
                  <Input
                    type="number"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="condition"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Condition</FormLabel>

                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    <SelectItem value="Excellent">
                      Excellent
                    </SelectItem>

                    <SelectItem value="Good">
                      Good
                    </SelectItem>

                    <SelectItem value="Fair">
                      Fair
                    </SelectItem>

                    <SelectItem value="Damaged">
                      Damaged
                    </SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>

                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    <SelectItem value="Available">
                      Available
                    </SelectItem>

                    <SelectItem value="Borrowed">
                      Borrowed
                    </SelectItem>

                    <SelectItem value="Maintenance">
                      Maintenance
                    </SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>

              <FormControl>
                <Input
                  placeholder="Warehouse A"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>

              <FormControl>
                <Input
                  placeholder="https://..."
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={loading}
          className="w-full"
        >
          {loading
            ? "Saving..."
            : mode === "create"
            ? "Create Tool"
            : "Update Tool"}
        </Button>
      </form>
    </Form>
  );
}