import React from "react";
import { Segment, Icon } from "semantic-ui-react";
import { HospitalEntry } from "../types";
import styles from "./Hospital.module.css";

import Date from "./Date";
import Description from "./Description";
import Diagnoses from "./Diagnoses";

interface HospitalProps {
  entry: HospitalEntry;
}
const Hospital: React.FC<HospitalProps> = ({ entry }) => {
  return (
    <Segment>
      <div>
        <Date>{entry.date}</Date>
        <span>
          <Icon name="hospital" size="large" />
        </span>
      </div>

      <Description>{entry.description}</Description>

      {entry.diagnosisCodes && <Diagnoses entry={entry} />}

      {entry.discharge && (
        <div>
          <span className={styles.discharge}>Discharge:</span>{" "}
          <span>{entry.discharge.criteria}</span>{" "}
          <span>{entry.discharge.date}</span>
        </div>
      )}
    </Segment>
  );
};

export default Hospital;
