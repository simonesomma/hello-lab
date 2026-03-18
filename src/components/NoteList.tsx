"use client";

import { useEffect, useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { NoteForm } from "./NoteForm";

interface Note {
  id: string;
  content: string;
  createdAt: string;
}

export function NoteList() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = useCallback(async () => {
    try {
      const res = await fetch("/api/notes");
      const json = await res.json();
      setNotes(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  async function handleDelete(id: string) {
    try {
      await fetch(`/api/notes/${id}`, { method: "DELETE" });
      fetchNotes();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="space-y-4">
      <NoteForm onNoteAdded={fetchNotes} />

      {loading ? (
        <p className="text-muted-foreground">Caricamento...</p>
      ) : notes.length === 0 ? (
        <p className="text-muted-foreground">Nessuna nota ancora. Aggiungine una!</p>
      ) : (
        <div className="space-y-2">
          {notes.map((note) => (
            <Card key={note.id}>
              <CardContent className="flex items-center justify-between py-3">
                <div>
                  <p>{note.content}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(note.createdAt).toLocaleString("it-IT")}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(note.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
