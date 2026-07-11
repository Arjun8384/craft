import LoanForm from "@/components/loans/LoanForm";
import Tool from "@/models/Tool";
import { connectDB } from "@/lib/mongodb";

export default async function NewLoanPage() {
  await connectDB();

  const tools = await Tool.find({
    availableQuantity: { $gt: 0 },
  }).lean();

  return (
  <section className="mx-auto max-w-4xl space-y-6">

    <div>

      <h1 className="text-3xl font-bold">
        Borrow Tool
      </h1>

      <p className="text-slate-600 mt-2">
        Select a tool and borrow it.
      </p>

    </div>

    <div className="rounded-xl border bg-white p-8 shadow-sm">

      <LoanForm
        tools={JSON.parse(JSON.stringify(tools))}
      />

    </div>

  </section>
);
}