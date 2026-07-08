import axios from "axios";
import type { Note, NoteTag } from "../types/note";

export interface NoteResponse {
  notes: Note[];
  totalPages: number;
}

const BASE_URL = "https://notehub-public.goit.study/api/notes";
const token = import.meta.env.VITE_NOTEHUB_TOKEN;

export const fetchNotes = async (
  query: string,
  page: number,
): Promise<NoteResponse> => {
  const response = await axios.get<NoteResponse>(BASE_URL, {
    params: { query, page },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const createNote = async (noteData: NoteTag): Promise<Note> => {
  const response = await axios.post<Note>(BASE_URL, noteData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response.data);

  return response.data;
};

export const deleteNote = async (idNote: string): Promise<Note> => {
  const response = await axios.delete<Note>(`${BASE_URL}/${idNote}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
