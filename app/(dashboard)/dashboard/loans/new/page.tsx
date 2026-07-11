import LoanForm from "@/components/loans/LoanForm";
import Tool from "@/models/Tool";
import { connectDB } from "@/lib/mongodb";

interface Props {
  searchParams: Promise<{
    tool?: string;
  }>;
}

export default async function NewLoanPage({
  searchParams,
}: Props) {
  await connectDB();

  const tools = await Tool.find({
    availableQuantity: { $gt: 0 },
  }).lean();

  const { tool } = await searchParams;

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
        selectedToolId={tool}
      />
    </div>

  </section>
);
}