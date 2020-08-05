import React from "react";
import { CoursePart } from "../types";
import { assertNever } from "../utils";
import Part from "./Part";

interface ContentProps {
  courseParts: CoursePart[];
}

const Content: React.FC<ContentProps> = ({ courseParts }) => {
  const parts = courseParts.map((coursePart) => {
    switch (coursePart.name) {
      case "Fundamentals":
        return <Part key={coursePart.name} coursePart={coursePart} />;
      case "Using props to pass data":
        return <Part key={coursePart.name} coursePart={coursePart} />;
      case "Deeper type usage":
        return <Part key={coursePart.name} coursePart={coursePart} />;
      case "Special newly created course":
        return <Part key={coursePart.name} coursePart={coursePart} />;
      default:
        return assertNever(coursePart);
    }
  });

  return <React.Fragment>{parts}</React.Fragment>;
};

export default Content;
