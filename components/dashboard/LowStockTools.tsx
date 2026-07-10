"use client";

import { ITool } from "@/models/Tool";
interface Props {
  tools: ITool[];
}

export default function LowStockTools({
  tools,
}: Props) {
  return (
    <div className="rounded-xl border bg-white shadow-sm">
      <div className="border-b p-4">
        <h2 className="font-semibold">
          Low Stock
        </h2>
      </div>

      <div className="divide-y">
        {tools.length === 0 ? (
          <div className="p-8 text-center text-green-600">
            All tools have sufficient stock.
          </div>
        ) : (
          tools.map((tool) => (
            <div
              key={String(tool._id)}
              className="flex items-center justify-between p-4"
            >
              <span>{tool.name}</span>

              <span className="rounded bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">
                {tool.availableQuantity} left
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}