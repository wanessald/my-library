import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Book } from "@/app/types/book";
import { BookOpen } from "lucide-react";

interface CurrentReadingCardProps {
  book?: Book;
  isActive?: boolean;
}

export function CurrentReadingCard({
  book,
  isActive = true,
}: CurrentReadingCardProps) {
  if (!isActive || !book || !book.currentPage) {
    return (
      <Card className="glass-effect opacity-50 grayscale pointer-events-none select-none transition-all duration-300">
        <CardContent className="flex items-center justify-center h-full min-h-[180px] p-6">
          <div className="text-center space-y-2">
            <BookOpen className="w-8 h-8 mx-auto text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Nenhuma leitura em andamento
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const progress = Math.round((book.currentPage / book.pages) * 100);
  const pagesRemaining = book.pages - book.currentPage;

  return (
    <Card className="glass-effect transition-all duration-300 hover:shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium text-primary">
          Leitura atual
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold text-lg leading-tight mb-1">
            {book.title}
          </h3>
          <p className="text-sm text-muted-foreground">{book.author}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progresso</span>
            <span className="font-medium">
              {book.currentPage}/{book.pages}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-muted-foreground">
            {pagesRemaining} páginas restantes ({progress}%)
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
