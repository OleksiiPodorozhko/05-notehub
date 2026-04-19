export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: string;
}

export type NoteId = Pick<Note, "id">;

export type CreateNoteRequest = Pick<Note, "title" | "content" | "tag">;