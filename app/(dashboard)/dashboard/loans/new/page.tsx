import LoanForm from "@/components/loans/LoanForm";
import Tool from "@/models/Tool";
import { connectDB } from "@/lib/mongodb";

export default async function NewLoanPage() {
  await connectDB();

  const tools = await Tool.find({
    availableQuantity: { $gt: 0 },
  }).lean();

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <h1 className="text-2xl font-bold">
        Borrow Tool
      </h1>

      <LoanForm tools={JSON.parse(JSON.stringify(tools))} />
    </div>
  );
}