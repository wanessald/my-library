export async function GET() {
  try {
    const res = await fetch("https://libraryapi.up.railway.app/genres", {
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      return new Response(JSON.stringify({ error: "Erro na API externa" }), {
        status: res.status,
      });
    }

    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    console.error("Erro ao buscar genres:", error);
    return new Response(JSON.stringify({ error: "Falha de conexão" }), {
      status: 500,
    });
  }
}
