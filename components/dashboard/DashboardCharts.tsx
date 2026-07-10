"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface DashboardStats {
  inventoryChart: {
    name: string;
    value: number;
  }[];
}

interface DashboardChartsProps {
  stats: DashboardStats;
}

export default function DashboardCharts({
  stats,
}: DashboardChartsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Inventory Overview
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {stats.inventoryChart.map(
            (item) => (
              <div
                key={item.name}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <span className="font-medium">
                  {item.name}
                </span>

                <span className="text-lg font-bold">
                  {item.value}
                </span>
              </div>
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
}