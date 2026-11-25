// src/utils/notes-api.ts
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function createNote(input: {
  title: string;
  content: string;
  parentId: number | null;
}) {
  const response = await fetch(`${BASE_URL}/api/notes/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error(`Failed to create note: ${response.status}`);
  }

  return response.json();
}

export async function updateNote(input: {
  id: number;
  title: string;
  content: string;
}) {
  const { id, ...payload } = input;

  const response = await fetch(`${BASE_URL}/api/notes/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Failed to update note: ${response.status}`);
  }

  return response.json();
}