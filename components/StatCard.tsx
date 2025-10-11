"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NumberTicker } from "@/components/ui/number-ticker";
import { ReadingStatus } from "../app/types/book";

interface StatCardProps {
  label: string;
  value: number | null;
  change?: string;
  status?: ReadingStatus;
}

const statusColors: Record<ReadingStatus, string> = {
  LIDO: "border-t-chart-2",
  LENDO: "border-t-chart-3",
  PAUSADO: "border-t-chart-4",
  ABANDONADO: "border-t-chart-1",
  "QUERO LER": "border-t-chart-5",
};

const statusColorsInactive: Record<ReadingStatus, string> = {
  LIDO: "border-t-green-200",
  LENDO: "border-t-blue-200",
  PAUSADO: "border-t-amber-200",
  ABANDONADO: "border-t-red-200",
  "QUERO LER": "border-t-purple-200",
};

export default function StatCard({
  label,
  value,
  change,
  status,
}: StatCardProps) {
  const isActive = value !== null && value > 0;
  const statusColorClass =
    status && isActive
      ? statusColors[status]
      : status
      ? statusColorsInactive[status]
      : "border-t-gray-300";

  const displayValue = value ?? 0;

  return (
    <Card
      className={`glass-effect hover:shadow-md transition-all border-t-4 ${statusColorClass} ${
        !isActive ? "opacity-50 pointer-events-none select-none grayscale" : ""
      }`}
    >
      <CardHeader>
        <CardTitle
          className={`flex items-center text-sm justify-center ${
            isActive ? "text-primary" : "text-muted-foreground"
          }`}
        >
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center mx-auto">
          <NumberTicker
            value={displayValue}
            delay={0.2}
            className={`text-3xl font-bold ${
              isActive ? "text-primary" : "text-muted-foreground"
            }`}
          />
          {change && (
            <p className="text-xs text-muted-foreground mt-1">{change}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
