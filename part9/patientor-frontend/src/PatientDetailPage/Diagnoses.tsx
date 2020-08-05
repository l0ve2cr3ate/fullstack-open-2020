import React from "react";
import { Entry } from "../types";
import { useStateValue } from "../state";
import styles from "./Diagnoses.module.css";

interface DiagnosesProps {
  entry: Entry;
}

const Diagnoses: React.FC<DiagnosesProps> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <ul className={styles.diagnosesList}>
      {entry.diagnosisCodes?.map((diagnosisCode: string, i: number) => {
        const diagnosis = diagnoses?.filter(
          (diagnosis) => diagnosis.code === diagnosisCode
        );
        return (
          <li key={`${entry.id}-${i}`}>
            <span className={styles.diagnosisCode}>{diagnosisCode}</span>{" "}
            <span>{diagnosis?.length > 0 && diagnosis[0].name}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default Diagnoses;
