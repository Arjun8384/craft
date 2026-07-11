"use client";

import {
  ClipboardList,
  CheckCircle2,
  AlertTriangle,
  Package,
} from "lucide-react";

interface Props {
  active: number;
  returned: number;
  overdue: number;
  borrowedItems: number;
}

export default function LoanStats({
  active,
  returned,
  overdue,
  borrowedItems,
}: Props) {
  const cards = [
    {
      title: "Active Loans",
      value: active,
      icon: ClipboardList,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Returned",
      value: returned,
      icon: CheckCircle2,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "Overdue",
      value: overdue,
      icon: AlertTriangle,
      color: "text-red-600",
      bg: "bg-red-50",
    },
    {
      title: "Borrowed Items",
      value: borrowedItems,
      icon: Package,
      color: "text-violet-600",
      bg: "bg-violet-50",
    },
  ];

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-xl border bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  {card.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  {card.value}
                </h2>
              </div>

              <div
                className={`rounded-lg p-3 ${card.bg}`}
              >
                <Icon
                  className={`h-6 w-6 ${card.color}`}
                />
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
}