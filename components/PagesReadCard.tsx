"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { NumberTicker } from "@/components/ui/number-ticker";

type PagesReadCardProps = {
  pagesRead: number | null;
};

export function PagesReadCard({ pagesRead }: PagesReadCardProps) {
  const isActive = pagesRead !== null && pagesRead > 0;
  return (
    <Card
      className={`transition-opacity ${
        !isActive ? "opacity-50 pointer-events-none select-none" : ""
      }`}
    >
      <CardHeader>
        <CardTitle className="flex items-center text-sm justify-center text-primary">
          Você já leu
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          {isActive ? (
            <>
              <NumberTicker
                value={pagesRead ?? 0}
                delay={0.3}
                className="text-3xl font-bold text-primary"
              />
              <span className="text-xs text-muted-foreground mt-1">
                Páginas
              </span>
            </>
          ) : (
            <p className="text-xs text-muted-foreground mt-1">
              Métricas não disponíveis
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
