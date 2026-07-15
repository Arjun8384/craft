import {
  Package,
  Archive,
  RotateCcw,
  ClipboardList,
} from "lucide-react";

import type { DashboardStats } from "@/types/dashboard";

interface StatsCardsProps {
  stats: DashboardStats;
}

export default function StatsCards({
  stats,
}: StatsCardsProps) {
  const cards = [
    {
      title: "Total Tools",
      value: stats.totalTools,
      icon: Package,
    },
    {
      title: "Available",
      value: stats.availableTools,
      icon: Archive,
    },
    {
      title: "Borrowed",
      value: stats.borrowedTools,
      icon: ClipboardList,
    },
    {
      title: "Returned",
      value: stats.returnedTools,
      icon: RotateCcw,
    },
    {
      title: "Active Loans",
      value: stats.activeLoans,
      icon: ClipboardList,
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-grey-700">
                  {card.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  {card.value}
                </h2>
              </div>

              <div className="rounded-full bg-blue-600/10 p-3">
                <Icon className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}