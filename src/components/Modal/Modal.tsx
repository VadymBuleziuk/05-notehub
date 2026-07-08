import css from "./Modal.module.css";
import { createPortal } from "react-dom";
import { useEffect } from "react";
import NoteForm from "../NoteForm/NoteForm";
import type { Note, NoteTag } from "../../types/note";

interface ModalProps {
  onSubmit: (noteData: NoteTag) => Promise<Note>;
  onClose: () => void;
}

export default function Modal({ onClose, onSubmit }: ModalProps) {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);
  return createPortal(
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal}>
        <NoteForm submitForm={onSubmit} />
      </div>
    </div>,
    document.body,
  );
}
