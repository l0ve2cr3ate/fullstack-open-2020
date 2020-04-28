import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import InputField from "./InputField";
import styles from "./CreateNew.module.css";

const CreateNew = (props) => {
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [info, setInfo] = useState("");

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content,
      author,
      info,
      votes: 0,
    });
    history.push("/");
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div>
          <InputField
            label="content"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <InputField
            label="author"
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />

          <InputField
            label="url for more info"
            name="info"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
          />

          <button className={styles.button}>create</button>
        </div>
      </form>
    </div>
  );
};

export default CreateNew;
