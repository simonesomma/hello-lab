import { z } from "zod";
import { getAllNotes, createNote } from "@/lib/services/notes";

const CreateNoteSchema = z.object({
  content: z.string().min(1, "Il contenuto è obbligatorio"),
});

export async function GET() {
  try {
    const notes = await getAllNotes();
    return Response.json({ data: notes });
  } catch (error) {
    console.error("GET /api/notes error:", error);
    return Response.json({ error: "Errore nel recupero delle note" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = CreateNoteSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const note = await createNote(parsed.data);
    return Response.json({ data: note }, { status: 201 });
  } catch (error) {
    console.error("POST /api/notes error:", error);
    return Response.json({ error: "Errore nella creazione della nota" }, { status: 500 });
  }
}
