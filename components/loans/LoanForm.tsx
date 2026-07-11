"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { createLoan } from "@/services/loanService";
import { LoanPayload } from "@/types/loan";
import { ITool } from "@/models/Tool";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LoanFormProps {
  tools: ITool[];
  selectedToolId?: string;
}

export default function LoanForm({
  tools,
  selectedToolId,
}: LoanFormProps) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
      useState<LoanPayload>({
      toolId: selectedToolId ?? "",
      borrowerName: "",
      borrowerEmail: "",
      borrowerPhone: "",
      quantity: 1,
      borrowDate: new Date()
        .toISOString()
        .split("T")[0],
      expectedReturnDate: "",
      status: "Borrowed",
    });

    const selectedTool = tools.find(
  (tool) =>
    tool._id.toString() ===
    form.toolId
);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "quantity"
          ? Number(value)
          : value,
    }));
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      await createLoan(form);

      console.log(
        "[Analytics] User interacted with Feature Complete CRUD"
      );

      toast.success(
        `Tool borrowed successfully.
      Return it before ${new Date(
          form.expectedReturnDate
        ).toLocaleDateString()}.`
      );

      router.push("/dashboard/loans");
      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to borrow tool."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="toolId">
            Tool
          </Label>

          <select
            id="toolId"
            name="toolId"
            value={form.toolId}
            onChange={handleChange}
            className="w-full rounded-md border p-2"
            required
            aria-label="Select Tool"
          >
            <option value="">
              Select Tool
            </option>

            {tools
              .filter(
                (tool) =>
                  tool.availableQuantity > 0
              )
              .map((tool) => (
                <option
                  key={tool._id.toString()}
                  value={tool._id.toString()}
                >
                  {tool.name}
                  {" • "}
                  {tool.availableQuantity}
                  available
                </option>
              ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="quantity">
            Quantity
          </Label>

          <Input
            id="quantity"
            name="quantity"
            type="number"
            min={1}
            max={selectedTool?.availableQuantity ?? 1}
            value={form.quantity}
            onChange={handleChange}
            required
            aria-label="Quantity"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="borrowerName">
            Borrower Name
          </Label>

          <Input
            id="borrowerName"
            name="borrowerName"
            value={form.borrowerName}
            onChange={handleChange}
            required
            aria-label="Borrower Name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="borrowerEmail">
            Borrower Email
          </Label>

          <Input
            id="borrowerEmail"
            name="borrowerEmail"
            type="email"
            value={form.borrowerEmail}
            onChange={handleChange}
            required
            aria-label="Borrower Email"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="borrowerPhone">
            Borrower Phone
          </Label>

          <Input
            id="borrowerPhone"
            name="borrowerPhone"
            value={form.borrowerPhone}
            onChange={handleChange}
            required
            aria-label="Borrower Phone"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="expectedReturnDate">
            Expected Return Date
          </Label>

          <Input
            id="expectedReturnDate"
            name="expectedReturnDate"
            type="date"
            value={
              form.expectedReturnDate
            }
            onChange={handleChange}
            required
            aria-label="Expected Return Date"
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Borrowing..."
          : "Borrow Tool"}
      </Button>
    </form>
  );
}