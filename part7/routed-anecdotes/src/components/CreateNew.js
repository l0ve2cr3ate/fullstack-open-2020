import React from "react";
import { useHistory } from "react-router-dom";
import { useField } from "../hooks/index";
import InputField from "./InputField";
import styles from "./CreateNew.module.css";

const CreateNew = (props) => {
  const { reset: resetContent, ...content } = useField("text");
  const { reset: resetAuthor, ...author } = useField("text");
  const { reset: resetInfo, ...info } = useField("text");

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    history.push("/");
  };

  const resetInputFields = () => {
    resetContent();
    resetAuthor();
    resetInfo();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div>
          <InputField label="content" {...content} />

          <InputField label="author" {...author} />

          <InputField label="url for more info" {...info} />

          <button type="submit" className={styles.button}>
            create
          </button>
          <button
            type="button"
            onClick={resetInputFields}
            className={`${styles.button} ${styles.space}`}
          >
            reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNew;
