import type { Note } from "../types/note.ts";
import axios from "axios";

export const perPage = 12;
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

export type NoteId = Pick<Note, "id">;

export type CreateNoteRequest = Pick<Note, "title" | "content" | "tag">;

//"Bearer ваш_токен"
export async function fetchNotes(
  pageNumber: number,
  search?: string,
): Promise<FetchNotesResponse> {
  const res = await api.get<FetchNotesResponse>(`/notes`, {
    params: {
      perPage: perPage,
      page: pageNumber,
      ...(search ? { search } : {}),
    },
  });
  return res.data;
}

export async function createNote(note: CreateNoteRequest): Promise<Note> {
  const res = await api.post<Note>(`/notes`, note);
  return res.data;
}

export async function deleteNote(id: NoteId): Promise<Note> {
  const res = await api.delete<Note>(`/notes/${id}`);
  return res.data;
}
