import { NoteList } from "@/components/NoteList";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const now = new Date().toLocaleString("it-IT", { timeZone: "Europe/Rome" });

  return (
    <div className="container mx-auto max-w-2xl p-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">
          Hello Lab — Infrastruttura OK ✓
        </h1>
        <p className="text-muted-foreground">
          Server time: {now}
        </p>
      </div>

      <NoteList />
    </div>
  );
}
