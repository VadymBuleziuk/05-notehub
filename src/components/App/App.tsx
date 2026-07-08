import { useState } from "react";
import css from "./App.module.css";
import NoteList from "../NoteList/NoteLIst";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  createNote,
  fetchNotes,
  type NoteResponse,
} from "../../services/noteServixes";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";

function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(false);

  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };
  const { data, isSuccess, isLoading, isError } = useQuery<NoteResponse>({
    queryKey: ["note", query, page],
    queryFn: () => fetchNotes(query, page),
    enabled: query !== "",
    placeholderData: keepPreviousData,
  });

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          {isSuccess && <NoteList notes={data.notes} />}
          {/* Компонент SearchBox */}
          {isSuccess && data.totalPages > 1 && (
            <Pagination
              pageCount={data.totalPages}
              forcePage={page}
              onPageChange={setPage}
            />
          )}
          <button className={css.button} onClick={openModal}>
            Create note +
          </button>
          {modal && <Modal onClose={closeModal} onSubmit={createNote} />}
        </header>
      </div>
    </>
  );
}

export default App;
