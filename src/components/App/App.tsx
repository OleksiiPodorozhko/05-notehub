import { useState } from "react";
import css from "./App.module.css";
import "./App.module.css";
import NoteList from "../NoteList/NoteList.tsx";
import type { Note } from "../../types/note.ts";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../services/noteService.ts";

export default function App() {

  // const [notes, setNotes] = useState<Note[]>([]);
  const [page, setPage] = useState<number>(1);


  const { data: notes, error, isLoading, isError } = useQuery({
    queryKey: ["notes", page],
    queryFn: () => fetchNotes(page),
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* Компонент SearchBox */}
        {/* Пагінація */}
        {/* Кнопка створення нотатки */}
      </header>
      {notes && <NoteList notes={notes} />}
    </div>
  );
}
