import type { CreateNoteRequest, Note, NoteId } from "../types/note.ts";
import axios from "axios";

const baseUrl = "https://notehub-public.goit.study/api";
const token = import.meta.env.VITE_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  },
});

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

// interface FetchNotesParams {
//   page: number;
//   search: string;
// }

//"Bearer ваш_токен"
export async function fetchNotes(pageNumber: number, search?: string): Promise<Note[]> {
  const res = await api.get<FetchNotesResponse>(`/notes`, {
    params: {
      perPage: 12,
      page: pageNumber,
      ...(search ? { search } : {})
    },
  });
  return res.data.notes;
}

export async function createNote(note: CreateNoteRequest): Promise<Note> {
  const res = await api.post<Note>(`/notes`, note);
  return res.data;
}

export async function deleteNote(id: NoteId): Promise<Note> {
  const res = await api.delete<Note>(`/notes/${id}`);
  return res.data;
}
