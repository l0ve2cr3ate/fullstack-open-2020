import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Menu.module.css";

const Menu = () => {
  return (
    <nav>
      <NavLink
        to="/"
        exact
        activeClassName={styles.activeLink}
        className={styles.navLink}
      >
        anecdotes
      </NavLink>
      <NavLink
        exact
        to="/create"
        activeClassName={styles.activeLink}
        className={styles.navLink}
      >
        create new
      </NavLink>
      <NavLink
        to="/about"
        exact
        activeClassName={styles.activeLink}
        className={styles.navLink}
      >
        about
      </NavLink>
    </nav>
  );
};

export default Menu;
