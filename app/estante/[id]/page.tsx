"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { Book } from "@/app/types/book";
import Image from "next/image";

export default function BookDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetch(`/api/books/${params.id}`)
        .then((res) => res.ok ? res.json() : null)
        .then((data) => {
          setBook(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [params.id]);

  const handleDelete = async () => {
    if (!params.id) return;
    await fetch(`/api/books/${params.id}`, {
      method: "DELETE",
    });
    router.push("/estante");
  };

  if (loading) return <p className="p-6 text-center">Carregando livro...</p>;
  if (!book) return <p className="p-6 text-center">Livro não encontrado.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="border rounded-lg shadow-md p-4">
        <Image
          src={book.cover || "/default-cover.png"}
          alt={book.title}
          className="w-full h-80 object-cover rounded-md mb-4"
          onError={(e) => (e.currentTarget.src = "/default-cover.png")}
        />

        <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
        <p className="text-lg text-gray-700 mb-1"><strong>Autor:</strong> {typeof book.author === "string" ? book.author : book.author?.name || "Desconhecido"}</p>
        <p className="text-lg text-gray-700 mb-1"><strong>Gênero:</strong> {typeof book.genre || "Não informado"}</p>
        {book.year && <p className="text-lg text-gray-700 mb-1"><strong>Ano:</strong> {book.year}</p>}
        {book.pages && <p className="text-lg text-gray-700 mb-1"><strong>Páginas:</strong> {book.pages}</p>}
        {book.rating !== undefined && (
          <p className="text-lg text-gray-700 mb-1">
            <strong>Avaliação:</strong> {book.rating > 0 ? `${book.rating}/5` : "Ainda não avaliado"}
          </p>
        )}
        <p className="text-lg text-gray-700 mb-1"><strong>Status:</strong> {book.status}</p>

        <h2 className="text-2xl font-semibold mt-4 mb-2">Sinopse</h2>
        <p className="text-gray-600 mb-6">{book.synopsis || "Nenhuma sinopse cadastrada."}</p>

        <div className="flex gap-4">
          <button
            onClick={() => router.push(`/estante/${book.id}/edit`)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Editar
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Excluir
          </button>
          <button
            onClick={() => router.push("/estante")}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}