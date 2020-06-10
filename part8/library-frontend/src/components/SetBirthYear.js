import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import Select from "react-select";
import { UPDATE_AUTHOR, ALL_AUTHORS } from "../queries";
import styles from "./SetBirthYear.module.css";
import Button from "./Button";
import Input from "./Input";

const SetBirthYear = ({ options }) => {
  const [name, setName] = useState("");
  let [setBornTo, setBorn] = useState("");

  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submit = async (event) => {
    event.preventDefault();

    setBornTo = Number(setBornTo);
    updateAuthor({ variables: { name, setBornTo } });

    setName("");
    setBorn("");
  };

  return (
    <div>
      <h2 className={styles.header}>Set birth year</h2>
      <form className={styles.form} onSubmit={submit}>
        <Select
          placeholder="Select author..."
          className={styles.select}
          options={options}
          onChange={({ label }) => setName(label)}
          value={name ? { label: name, value: name?.toLowerCase() } : null}
        />
        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="born">
            Born
          </label>
          <Input
            id="born"
            type="number"
            value={setBornTo}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <Button type="submit">Update author</Button>
      </form>
    </div>
  );
};

export default SetBirthYear;
