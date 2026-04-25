import { useState } from "react";
import css from "./App.module.css";
import NoteList from "../NoteList/NoteList.tsx";
import Pagination from "../Pagination/Pagination.tsx";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../services/noteService.ts";
import Modal from "../Modal/Modal.tsx";
import NoteForm from "../NoteForm/NoteForm.tsx";

export default function App() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      {notes.length > 0 && <NoteList notes={notes} />}
      {isModalOpen &&
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>}
    </div>
  );
}
