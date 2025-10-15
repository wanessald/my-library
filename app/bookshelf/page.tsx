"use client";

import { useEffect, useState } from "react";
import { Book, Genre } from "@/app/types/book";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import BookItem from "@/components/BookItem";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { API_BASE_URL } from "@/lib/api";

export default function LibraryPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("all");
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  const router = useRouter();

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await fetch(`${API_BASE_URL}/books`);
      if (!result.ok) throw new Error("Falha ao carregar livros");
      const data = await result.json();
      setBooks(data);
    } catch (err) {
      console.error(err);
      setError("Erro ao conectar com o servidor");
    } finally {
      setLoading(false);
    }
  };

  const fetchGenres = async () => {
    try {
      const result = await fetch(`${API_BASE_URL}/genres`);
      if (!result.ok) throw new Error("Falha ao carregar gêneros");
      const data = await result.json();
      setGenres(data);
    } catch {
      setGenres([]);
    }
  };

  const deleteBook = async (id: number) => {
    try {
      setActionLoading(id);

      const result = await fetch(`${API_BASE_URL}/books/${id}`, {
        method: "DELETE",
      });

      if (!result.ok) throw new Error("Erro ao excluir livro");

      setBooks((prev) => prev.filter((b) => b.id !== id));
      toast.success("Livro excluído com sucesso!");
    } catch (err) {
      toast.error("Erro ao excluir o livro");
      setError("Erro ao excluir livro");
    } finally {
      setActionLoading(null);
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchGenres();
  }, []);

  const filteredBooks = books.filter((book: Book) => {
    const authorName = book.author?.name?.toLowerCase() || "";
    const genreValue = book.genre?.genre || "";

    const matchesSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      authorName.includes(search.toLowerCase());

    const matchesGenre = genre === "all" || genreValue === genre;
    const matchesStatus = status === "all" || book.status === status;

    return matchesSearch && matchesGenre && matchesStatus;
  });

  return (
    <div className="p-6 mx-10 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Biblioteca</h1>
        <Button
          onClick={() => router.push("/bookshelf/add")}
          variant="default"
          className="sm:w-auto flex items-center justify-center gap-2 text-sm sm:text-base bg-secondary hover:bg-secondary/50 text-foreground"
          aria-label="Adicionar um novo livro à biblioteca"
          title="Adicionar novo livro"
        >
          <Plus className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
          <span className="font-medium">Adicionar livro</span>
        </Button>
      </div>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Buscar por título ou autor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3"
        />

        <Select onValueChange={setGenre} defaultValue="all">
          <SelectTrigger className="w-full md:w-52">
            <SelectValue placeholder="Filtrar por gênero" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os gêneros</SelectItem>
            {genres.map((g) => (
              <SelectItem key={g.id} value={g.genre}>
                {g.genre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={setStatus} defaultValue="all">
          <SelectTrigger className="w-full md:w-52">
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os status</SelectItem>
            <SelectItem value="QUERO LER">Quero Ler</SelectItem>
            <SelectItem value="LENDO">Lendo</SelectItem>
            <SelectItem value="LIDO">Lido</SelectItem>
            <SelectItem value="PAUSADO">Pausado</SelectItem>
            <SelectItem value="ABANDONADO">Abandonado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Grid de livros */}
      {loading ? (
        <div>Carregando livros...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : filteredBooks.length === 0 ? (
        <div className="text-center text-muted-foreground mt-10">
          {books.length === 0
            ? "Sua biblioteca está vazia. Adicione um livro para começar!"
            : "Nenhum livro encontrado com os filtros aplicados."}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
          {filteredBooks.map((book) => (
            <BookItem
              key={book.id}
              book={book}
              onDelete={deleteBook}
              isLoading={actionLoading === book.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
