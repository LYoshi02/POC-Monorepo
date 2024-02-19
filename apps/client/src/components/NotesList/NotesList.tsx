/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Note } from "../../types";

interface Props {
  notes: Note[];
  onDelete: (noteId: number) => Promise<void>;
}

const NotesList = (props: Props) => {
  const clickHandler = (noteId: number) => {
    void props.onDelete(noteId);
  };

  return (
    <div className="notes">
      {props.notes.map((note) => (
        <div className="note" key={note.id}>
          <p>{note.title}</p>
          <p onClick={() => clickHandler(note.id)}>X</p>
        </div>
      ))}
    </div>
  );
};

export default NotesList;
