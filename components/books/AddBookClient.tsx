"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Book, ReadingStatus, Genre } from "@/app/types/book";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";


export default function AddBookClient() {
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
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Busca os gêneros da API ao montar o componente
    fetch("/api/genres")
      .then((res) => res.json())
      .then((data: Genre[]) => setGenres(data))
      .catch(() => setGenres([]));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
      });
      router.push("/estante");
    } catch (err) {
      alert("Erro ao adicionar livro.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Adicionar Novo Livro</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Campos de entrada */}
          <div>
            <label className="block text-sm font-medium mb-1">Título *</label>
            <Input required value={book.title} onChange={(e) => setBook({ ...book, title: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Autor *</label>
            <Input required value={book.author.name}  onChange={(e) =>
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
              value={book.genre.genre}
              onValueChange={(val) =>
                setBook({
                  ...book,
                  genre: { ...book.genre, genre: val },
                })
              }
            >
              <SelectTrigger><SelectValue placeholder="Selecione o gênero" /></SelectTrigger>
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
            <label className="block text-sm font-medium mb-1">Ano de publicação</label>
            <Input type="number" value={book.year ?? ""} onChange={(e) => setBook({ ...book, year: Number(e.target.value) })} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Total de páginas</label>
            <Input type="number" value={book.pages ?? ""} onChange={(e) => setBook({ ...book, pages: Number(e.target.value) })} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Sinopse</label>
            <textarea
              className="w-full border rounded-md p-2"
              rows={3}
              value={book.synopsis ?? ""}
              onChange={(e) => setBook({ ...book, synopsis: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Avaliação (1-5)</label>
            <Input type="number" value={book.rating ?? ""} onChange={(e) => setBook({ ...book, rating: Number(e.target.value) })} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">URL da capa</label>
            <Input value={book.cover ?? ""} onChange={(e) => setBook({ ...book, cover: e.target.value })} />
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
            <label className="block text-sm font-medium mb-1">Status de leitura</label>
            <Select value={book.status} onValueChange={(val) => setBook({ ...book, status: val as ReadingStatus })}>
              <SelectTrigger><SelectValue placeholder="Selecione o status" /></SelectTrigger>
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
          <label className="block text-sm font-medium mb-1">Preview da Capa</label>
          <Image
            src={book.cover || "/default-cover.png"}
            alt="Preview da Capa"
            className="w-40 h-60 object-contain border rounded"
          />
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={loading}>{loading ? "Adicionando..." : "Adicionar"}</Button>
          <Button variant="outline" type="button" onClick={() => router.push("/estante")}>Cancelar</Button>
        </div>
      </form>
    </div>
  );
}