import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GenreCardProps {
  genre: string | null;
  count: number;
}

export function GenreCard({ genre, count }: GenreCardProps) {
  const isActive = genre !== null && count > 0;

  return (
    <Card
      className={`glass-effect transition-all duration-300 ${
        !isActive ? "opacity-60 grayscale pointer-events-none select-none" : ""
      }`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium text-primary">
          Gênero mais lido
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isActive ? (
          <>
            <div className="text-2xl font-bold">{genre}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {count} {count === 1 ? "livro" : "livros"}
            </p>
          </>
        ) : (
          <div className="text-sm text-muted-foreground">
            Nenhum livro lido ainda
          </div>
        )}
      </CardContent>
    </Card>
  );
}
