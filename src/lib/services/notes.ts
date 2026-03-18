import { prisma } from "@/lib/db";

export async function getAllNotes() {
  return prisma.note.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function createNote(data: { content: string }) {
  return prisma.note.create({ data });
}

export async function deleteNote(id: string) {
  return prisma.note.delete({ where: { id } });
}
