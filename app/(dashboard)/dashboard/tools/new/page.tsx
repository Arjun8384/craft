import ToolForm from "@/components/tools/ToolForm";

export default function NewToolPage() {
  return (
    <section className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Add New Tool
        </h1>

        <p className="text-grey-700">
          Fill in the details below.
        </p>
      </div>

      <div className="rounded-lg border bg-white border-gray-200 shadow-sm p-6">
        <ToolForm mode="create" />
      </div>
    </section>
  );
}