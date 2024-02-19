import { useState } from "react";

interface Props {
  onCreate: (title: string) => Promise<void>;
}

const NotesForm = (props: Props) => {
  const [title, setTitle] = useState("");

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const clickHandler = () => {
    void props.onCreate(title);
    setTitle("");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter note title"
        onChange={changeHandler}
      />
      <button onClick={clickHandler}>Create Note</button>
    </div>
  );
};

export default NotesForm;
