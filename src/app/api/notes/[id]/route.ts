import { deleteNote } from "@/lib/services/notes";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await deleteNote(id);
    return Response.json({ data: { deleted: true } });
  } catch (error) {
    console.error("DELETE /api/notes error:", error);
    return Response.json({ error: "Errore nell'eliminazione della nota" }, { status: 500 });
  }
}
