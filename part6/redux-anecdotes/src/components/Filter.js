import React from "react";
import { connect } from "react-redux";
import { filter } from "../reducers/filterReducer";
import styles from "./Filter.module.css";

const Filter = ({ filter }) => {
  const handleChange = (event) => {
    const filterValue = event.target.value;
    filter({ filter: filterValue });
  };

  return (
    <div className={styles.filter}>
      <label htmlFor="filter">Filter</label>{" "}
      <input id="filter" className={styles.input} onChange={handleChange} />
    </div>
  );
};

const ConnectedFilter = connect(null, { filter })(Filter);
export default ConnectedFilter;
