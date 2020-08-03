import React from "react";
import { CoursePart } from "../types";
import styles from "./Part.module.css";

interface PartProps {
  coursePart: CoursePart;
}

const Part: React.FC<PartProps> = ({ coursePart }) => {
  if (coursePart.name === "Fundamentals") {
    return (
      <>
        <h3 className={styles.courseName}>
          <span>Course name</span> <span>{coursePart.name}</span>
        </h3>
        <div>
          <span>Number of exercises</span>{" "}
          <span>{coursePart.exerciseCount}</span>
        </div>
        <div>
          <span>Course description</span> <span> {coursePart.description}</span>
        </div>
      </>
    );
  } else if (coursePart.name === "Using props to pass data") {
    return (
      <>
        <h3 className={styles.courseName}>
          <span>Course name</span> <span>{coursePart.name}</span>
        </h3>
        <div>
          <span>Number of exercises</span>{" "}
          <span>{coursePart.exerciseCount}</span>
        </div>
        <div>
          <span>Number of group projects</span>{" "}
          <span> {coursePart.groupProjectCount}</span>
        </div>
      </>
    );
  } else if (coursePart.name === "Deeper type usage") {
    return (
      <>
        <h3 className={styles.courseName}>
          <span>Course name</span> <span>{coursePart.name}</span>
        </h3>
        <div>
          <span>Number of exercises</span>{" "}
          <span>{coursePart.exerciseCount}</span>
        </div>
        <div>
          <span>Course description</span> <span> {coursePart.description}</span>
        </div>
        <div>
          <span>Exercise submission link</span>{" "}
          <span> {coursePart.exerciseSubmissionLink}</span>
        </div>
      </>
    );
  } else if (coursePart.name === "Special newly created course") {
    return (
      <>
        <h3 className={styles.courseName}>
          <span>Course name</span> <span>{coursePart.name}</span>
        </h3>
        <div>
          <span>Number of exercises</span>{" "}
          <span>{coursePart.exerciseCount}</span>
        </div>
        <div>
          <span>Course description</span> <span> {coursePart.description}</span>
        </div>
        <div>
          <span>Special</span> <span> {coursePart.special}</span>
        </div>
      </>
    );
  }
  return null;
};

export default Part;
