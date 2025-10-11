"use client";

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
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

interface EditBookClientProps {
  id: string;
}

export default function EditBookClient({ id }: EditBookClientProps) {
  const router = useRouter();
  const [book, setBook] = useState<Omit<Book, "id"> | null>(null);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Busca o livro e os gêneros da API
    const fetchData = async () => {
      try {
        const [bookRes, genresRes] = await Promise.all([
          fetch(`${"/api/books"}/${id}`),
          fetch("/api/genres"),
        ]);
        const bookData = (await bookRes.json()).data as Book;
        const genresData = (await genresRes.json()) as Genre[];
         setBook({
          title: bookData.title || "",
          author: bookData.author || { id: "", name: "" },
          genre: bookData.genre || { id: "", genre: "" },
          year: bookData.year || 0,
          pages: bookData.pages || 0,
          rating: bookData.rating || 0,
          synopsis: bookData.synopsis || "",
          cover: bookData.cover || "",
          status: bookData.status || "QUERO LER",
          currentPage: bookData.currentPage || 0,
          isbn: bookData.isbn || "",
          notes: bookData.notes || "",
          createdAt: bookData.createdAt || new Date(),
          updatedAt: bookData.updatedAt || new Date(),
        });
        setGenres(genresData);
      } catch {
        setBook(null);
        setGenres([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (book) {
      await fetch(`${"/api/books"}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
      });
      router.push("/estante");
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (!book) return <div>Livro não encontrado.</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Editar Livro</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
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
            <Input required value={book.author?.name || ""}  onChange={(e) =>
                setBook({
                  ...book,
                  author: { ...book.author, name: e.target.value },
                })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Gênero</label>
            <Select
              value={book.genre?.genre || ""}
              onValueChange={(val) =>
                setBook({
                  ...book,
                  genre: { ...book.genre, genre: val },
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o gênero" />
              </SelectTrigger>
              <SelectContent>
                {genres.length === 0 ? (
                  <SelectItem value="Carregando" disabled>Carregando...</SelectItem>
                ) : (
                  genres.map((g) => <SelectItem key={g.id} value={g.genre}>{g.genre}</SelectItem>)
                )}
              </SelectContent>
            </Select>
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
            <Input type="text" value={book.isbn ?? ""} onChange={(e) => setBook({ ...book, isbn: String(e.target.value) })} />
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
              Criado em
            </label>
            <Input
              type="date"
              disabled
              value={book.createdAt.toISOString().split("T")[0]}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Atualizado em
            </label>
            <Input
              type="date"
              disabled
              value={book.updatedAt.toISOString().split("T")[0]}
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
                <SelectItem value="LIDO">Lido</SelectItem>
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
            alt="Preview da Capa"
            className="w-40 h-60 object-contain border rounded"
          />
        </div>

        <div className="flex gap-4">
          <Button type="submit">Salvar</Button>
          <Button
            variant="outline"
            type="button"
            onClick={() => router.push("/estante")}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}