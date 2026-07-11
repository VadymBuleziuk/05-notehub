import { useState } from "react";
import css from "./App.module.css";
import NoteList from "../NoteList/qwertyu";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes, type NoteResponse } from "../../services/noteService";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import SearchBox from "../SearchBox/SearchBox";
import { useDebouncedCallback } from "use-debounce";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import NoteForm from "../NoteForm/NoteForm";

function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(false);
  const perPage = 12;
  const debouncedSearch = useDebouncedCallback((value: string) => {
    setQuery(value);
    setPage(1);
  }, 500);
  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };
  const { data, isSuccess, isLoading, isError } = useQuery<NoteResponse>({
    queryKey: ["notes", query, page],
    queryFn: () => fetchNotes(query, page, perPage),
    placeholderData: keepPreviousData,
  });

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          {isError && <ErrorMessage />}

          <SearchBox value={query} onChange={debouncedSearch} />
          {isLoading && <Loader />}
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
        </header>
        {isSuccess && <NoteList notes={data.notes} />}
        {modal && (
          <Modal onClose={closeModal}>
            <NoteForm closeForm={closeModal} />
          </Modal>
        )}
      </div>
    </>
  );
}

export default App;
