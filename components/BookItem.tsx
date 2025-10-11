"use client";

import type { Book } from "@/app/types/book";
import { Edit, Eye, Star, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface BookItemProps {
  book: Book;
  onDelete: (id: number) => void;
  isLoading?: boolean;
}

export default function BookItem({
  book,
  onDelete,
  isLoading = false,
}: BookItemProps) {
  const [imageError, setImageError] = useState(false);
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div
      className="group rounded-lg border border-secondary hover:border-muted shadow-sm hover:shadow-md transition-all duration-200 flex flex-col h-full overflow-hidden"
      role="article"
      aria-label={`Livro: ${book.title} por ${book.author}`}
    >
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-100 flex items-center justify-center">
        {" "}
        <Image
          src={imageError ? "/default-cover.png" : book.cover}
          alt={`Capa do livro ${book.title}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={handleImageError}
          loading="lazy"
        />
      </div>

      <div className="flex flex-col flex-1 p-2">
        <div className="flex-1 min-h-0">
          <h3 className="font-semibold text-sm leading-tight line-clamp-2 text-foreground mb-1">
            {book.title}
          </h3>
          <p className="text-xs text-gray-600 leading-tight line-clamp-1 mb-1">
            {book.author.name}
          </p>
          <p className="text-xs text-gray-500 leading-tight line-clamp-1">
            {book.year} • {book.genre.genre}
          </p>
        </div>

        <div className="flex items-center justify-between mt-2 pt-2 border-t border-muted">
          <span className="text-xs font-medium px-1.5 py-0.5 rounded capitalize">
            {book.status?.replace("_", " ") || "Não lido"}
          </span>

          <div
            className="flex items-center gap-0.5"
            role="img"
            aria-label={`Avaliação: ${book.rating} estrelas de 5`}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < (book.rating || 0)
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-1 mt-2 pt-2 border-t border-muted">
          <Button
            size="sm"
            variant="ghost"
            className="text-xs h-7 px-2 min-w-0 flex-1"
            onClick={() => router.push(`/estante/${book.id}`)}
            aria-label={`Visualizar detalhes do livro ${book.title}`}
            title="Visualizar"
          >
            <Eye size={12} aria-hidden="true" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-7 flex-1 text-xs"
            onClick={() => router.push(`/estante/${book.id}/edit`)}
            aria-label={`Editar informações do livro ${book.title}`}
            title="Editar livro"
          >
            <Edit size={12} aria-hidden="true" />
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 flex-1 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                aria-label={`Excluir livro ${book.title}`}
                title="Excluir livro"
              >
                <Trash size={12} aria-hidden="true" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-[95vw] rounded-lg sm:max-w-md">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-base">
                  Excluir "{book.title}"?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-sm">
                  Esta ação não pode ser desfeita. O livro será permanentemente
                  excluído da sua biblioteca.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                <AlertDialogCancel className="flex-1 h-9 text-sm">
                  Cancelar
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onDelete(book.id)}
                  disabled={isLoading}
                  className="flex-1 h-9 text-sm bg-red-600 hover:bg-red-700"
                >
                  {isLoading ? "Excluindo..." : "Excluir"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
