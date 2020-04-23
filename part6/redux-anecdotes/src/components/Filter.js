import React from "react";
import { useDispatch } from "react-redux";
import { filter } from "../reducers/filterReducer";
import styles from "./Filter.module.css";

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const filterValue = event.target.value;
    dispatch(filter({ filter: filterValue }));
  };

  return (
    <div className={styles.filter}>
      <label htmlFor="filter">Filter</label>{" "}
      <input id="filter" className={styles.input} onChange={handleChange} />
    </div>
  );
};

export default Filter;
