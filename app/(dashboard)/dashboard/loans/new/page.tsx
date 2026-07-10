import LoanForm from "@/components/loans/LoanForm";

import { getTools } from "@/services/toolService";

export default async function NewLoanPage() {
  const response = await getTools();

  const tools = response.data.filter(
    (tool: {
      availableQuantity: number;
    }) => tool.availableQuantity > 0
  );

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <h1 className="text-2xl font-bold">
        Borrow Tool
      </h1>

      <LoanForm tools={tools} />
    </div>
  );
}