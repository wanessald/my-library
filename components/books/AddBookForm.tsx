"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Book, ReadingStatus, Genre } from "@/app/types/book";
import { API_BASE_URL } from "@/lib/api";

export default function AddBookForm() {
  const router = useRouter();
  const { userId: clerkUserId } = useAuth();

  const [genres, setGenres] = useState<Genre[]>([]);
  const [book, setBook] = useState<Omit<Book, "id">>({
    title: "",
    author: { id: "", name: "" },
    genre: { id: "", genre: "" },
    year: undefined,
    pages: undefined,
    rating: undefined,
    synopsis: "",
    cover: "",
    status: "QUERO LER",
    currentPage: 0,
    isbn: "",
    notes: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const [loading, setLoading] = useState(false);
  const [genreError, setGenreError] = useState("");

  const totalFields = 9;
  const filledFields = [
    book.title,
    book.author.name,
    book.genre.genre,
    book.cover,
    book.pages,
    book.rating,
    book.status,
    book.isbn,
    book.synopsis,
  ].filter(Boolean).length;
  const progress = Math.round((filledFields / totalFields) * 100);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/genres`);
        if (!res.ok) throw new Error("Erro ao carregar gêneros");
        const data = await res.json();
        setGenres(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Erro ao carregar gêneros:", err);
        setGenres([]);
      }
    };
    fetchGenres();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!book.genre.id) {
      toast.error("Selecione um gênero literário");
      setGenreError("Selecione um gênero literário");
      return;
    }

    if (!clerkUserId) {
      toast.error("Usuário não autenticado.");
      return;
    }

    setLoading(true);
    try {
      const authorRes = await fetch(`${API_BASE_URL}/authors`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: book.author.name }),
      });

      if (!authorRes.ok) {
        const errText = await authorRes.text();
        throw new Error(`Erro ao criar autor: ${errText}`);
      }

      const authorData = await authorRes.json();
      console.log("Author response status:", authorRes.status);
      console.log("Author response text:", authorData);

      const authorId = authorData.id;

      const bookData = {
        title: book.title,
        authorId,
        genreId: parseInt(book.genre.id),
        userId: clerkUserId,
        status: book.status || "QUERO LER",
        year: book.year || null,
        pages: book.pages || null,
        rating: book.rating || null,
        synopsis: book.synopsis || null,
        cover: book.cover || null,
        currentPage: book.currentPage || 0,
        isbn: book.isbn || null,
        notes: book.notes || null,
      };

      const res = await fetch(`${API_BASE_URL}/books`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookData),
      });

      if (!res.ok) throw new Error("Erro ao salvar livro");
      const newBook = await res.json();

      toast.success("Livro adicionado com sucesso!");
      router.push("/bookshelf");
    } catch (err) {
      console.error("Erro ao adicionar livro:", err);
      toast.error("Erro ao adicionar livro.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Adicionar Novo Livro</h1>   
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Título *</label>
            <Input
              required
              value={book.title}
              onChange={(e) => setBook({ ...book, title: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Autor *</label>
            <Input
              required
              value={book.author.name}
              onChange={(e) =>
                setBook({
                  ...book,
                  author: { ...book.author, name: e.target.value },
                })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Gênero *</label> 
            <Select
              value={book.genre.id}
              onValueChange={(val) => {
                const selectedGenre = genres.find(
                  (g) => g.id.toString() === val
                );
                if (selectedGenre) {
                  setBook({
                    ...book,
                    genre: {
                      id: selectedGenre.id.toString(),
                      genre: selectedGenre.genre,
                    },
                  });
                  setGenreError("");
                }
              }}
              disabled={genres.length === 0}
            >
              <SelectTrigger className={genreError ? "border-red-500" : ""}>
                <SelectValue
                  placeholder={
                    genres.length === 0
                      ? "Nenhum gênero disponível"
                      : "Selecione o gênero"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {genres.length > 0 ? (
                  genres.map((g) => (
                    <SelectItem key={g.id} value={g.id.toString()}>
                      {g.genre}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="none" disabled>
                    Nenhum gênero cadastrado                
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
            {genreError && (
              <p className="text-red-500 text-xs mt-1">{genreError}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Ano de publicação
            </label>
            <Input
              type="number"
              value={book.year ?? ""}
              onChange={(e) =>
                setBook({ ...book, year: Number(e.target.value) })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
                Total de páginas
            </label>
            <Input
              type="number"
              value={book.pages ?? ""}
              onChange={(e) =>
                setBook({ ...book, pages: Number(e.target.value) })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Avaliação (1-5)
            </label>
            <Input
              type="number"
              value={book.rating ?? ""}
              onChange={(e) =>
                setBook({ ...book, rating: Number(e.target.value) })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              URL da capa
            </label>
            <Input
              value={book.cover ?? ""}
              onChange={(e) => setBook({ ...book, cover: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">ISBN</label>
            <Input
              type="text"
              value={book.isbn ?? ""}
              onChange={(e) =>
                setBook({ ...book, isbn: String(e.target.value) })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Notas</label>
            <textarea
              className="w-full border rounded-md p-2"
              rows={3}
              value={book.notes ?? ""}
              onChange={(e) => setBook({ ...book, notes: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Status de leitura
            </label>
            <Select
              value={book.status}
              onValueChange={(val) =>
                setBook({ ...book, status: val as ReadingStatus })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="QUERO LER">Quero Ler</SelectItem>           
                <SelectItem value="LENDO">Lendo</SelectItem>
                <SelectItem value="PAUSADO">Pausado</SelectItem>
                <SelectItem value="ABANDONADO">Abandonado</SelectItem>         
              </SelectContent>
            </Select>
          </div>
        </div>
        {/* Preview da capa */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Preview da Capa
          </label>
          <Image
            src={book.cover || "/default-cover.png"}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt="Preview da Capa"
            width={120}
            height={180}
            className="w-40 h-60 object-contain border rounded"
          />
        </div>
        <div className="flex gap-4">
          <Button type="submit" disabled={loading}>
            {loading ? "Adicionando..." : "Adicionar"}
          </Button>
          <Button
            variant="outline"
            type="button"
            onClick={() => router.push("/bookshelf")}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}
