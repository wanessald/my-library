import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const parsedId = parseInt(id);

    if (isNaN(parsedId)) {
      return new Response(
        JSON.stringify({ success: false, error: "ID inválido" }),
        { status: 400 }
      );
    }

    // Chamada real ao backend ou banco
    const res = await fetch(`${process.env.LIBRARY_API_URL}${parsedId}`);
    if (!res.ok) {
      return new Response(
        JSON.stringify({ success: false, error: "Livro não encontrado" }),
        { status: 404 }
      );
    }

    const data = await res.json();
    return new Response(JSON.stringify({ success: true, data }));
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ success: false, error: "Erro ao buscar livro" }),
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const parsedId = parseInt(id);

    if (isNaN(parsedId)) {
      return new Response(
        JSON.stringify({ success: false, error: "ID inválido" }),
        { status: 400 }
      );
    }

    const res = await fetch(`${process.env.LIBRARY_API_URL}${parsedId}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      return new Response(
        JSON.stringify({ success: false, error: "Livro não encontrado" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Livro deletado com sucesso" })
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ success: false, error: "Erro ao deletar livro" }),
      { status: 500 }
    );
  }
}
