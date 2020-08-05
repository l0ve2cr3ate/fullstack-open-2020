import React from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { Icon } from "semantic-ui-react";
import { Patient, Entry } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatientDetails } from "../state";
import styles from "./PatientDetailPage.module.css";
import EntryDetails from "./EntryDetails";

const PatientDetailPage: React.FC = () => {
  const [{ patient }, dispatch] = useStateValue();

  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const { data: patientDetailsFromApi } = await Axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );

        dispatch(setPatientDetails(patientDetailsFromApi));
      } catch (e) {
        console.error(e);
      }
    };

    if (!patient || patient?.id !== id) {
      fetchPatientDetails();
    }
  }, [patient, id, dispatch]);

  const displayGenderIcon = () => {
    if (patient?.gender === "male") {
      return <Icon name="mars" size="big" />;
    } else if (patient?.gender === "female") {
      return <Icon name="venus" size="big" />;
    } else if (patient?.gender === "other") {
      return <Icon name="genderless" size="big" />;
    } else return null;
  };

  return (
    <section>
      <div className={styles.subHeader}>
        <h2>{patient?.name}</h2> {displayGenderIcon()}
      </div>
      <div>
        <span>ssn:</span> <span>{patient?.ssn}</span>
      </div>
      <div>
        <span>occupation:</span> <span>{patient?.occupation}</span>
      </div>
      {patient?.entries && patient.entries?.length > 0 && <h3>Entries</h3>}
      {patient?.entries?.map((entry: Entry) => (
        <EntryDetails key={entry.id} entry={entry} />
      ))}
    </section>
  );
};

export default PatientDetailPage;
