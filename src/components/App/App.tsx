import { useState } from "react";
import css from "./App.module.css";
import NoteList from "../NoteList/NoteList.tsx";
import Pagination from "../Pagination/Pagination.tsx";
import type { Note } from "../../types/note.ts";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes, perPage } from "../../services/noteService.ts";

export default function App() {
  // const [notes, setNotes] = useState<Note[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ["notes", currentPage], //todo add query
    queryFn: () => fetchNotes(currentPage), //todo add query
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  //todo add handleSearch

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* Компонент SearchBox */}
        {isSuccess && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            perPage={perPage}
          />
        )}
        {/* Кнопка створення нотатки */}
      </header>
      {notes.length > 0 && <NoteList notes={notes} />}
      {/*{notes && notes.length > 0 && <NoteList notes={notes} />}*/}
    </div>
  );
}
