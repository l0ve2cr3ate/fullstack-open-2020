import React from "react";
import styles from "./Description.module.css";

interface DescriptionProps {
  children: React.ReactNode;
}

const Description: React.FC<DescriptionProps> = ({ children }) => (
  <span className={styles.description}>{children}</span>
);

export default Description;
