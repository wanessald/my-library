"use client";

import EditBookForm from "@/components/books/EditBookForm";
import { useParams } from "next/navigation";

export default function EditBookPage() {
  const params = useParams();

  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  if (!id)
    return (
      <p className="p-6 text-center text-red-500">
        ID do livro não encontrado.
      </p>
    );

  return <EditBookForm id={id} />;
}
