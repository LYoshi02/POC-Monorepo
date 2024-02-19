import { useEffect, useState } from "react";

import "./App.css";
import NotesList from "./components/NotesList/NotesList";
import NotesForm from "./components/NotesForm/NotesForm";
import { fetchWrapper } from "./utils";
import { Note } from "./types";

function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const getNotes = async () => {
      const notes: Note[] = await fetchWrapper<Note[]>({ path: "/notes" });
      return notes;
    };

    void getNotes().then((notes) => {
      setNotes(notes);
    });
  }, []);

  const onCreateNote = async (title: string) => {
    if (!title) return;

    try {
      const result = await fetchWrapper<Note>({
        path: "/notes",
        config: {
          method: "POST",
          data: { title }
        }
      });

      setNotes((prevNotes) => [result, ...prevNotes]);
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteNote = async (noteId: number) => {
    if (!noteId) return;

    try {
      await fetchWrapper<Note>({
        path: `/notes/${noteId}`,
        config: {
          method: "DELETE"
        }
      });
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Notes</h1>
      <NotesForm onCreate={onCreateNote} />
      <NotesList onDelete={onDeleteNote} notes={notes} />
    </div>
  );
}

export default App;
