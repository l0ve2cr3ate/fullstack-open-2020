import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Icon, Button } from "semantic-ui-react";
import { Patient, Entry } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatientDetails, addEntry } from "../state";
import styles from "./PatientDetailPage.module.css";
import EntryDetails from "./EntryDetails";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import {
  isHealthCheckEntry,
  isOccupationalHealthcareEntry,
  isHospitalEntry,
} from "../utils";

const PatientDetailPage: React.FC = () => {
  const [{ patient }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const { id } = useParams<{ id: string }>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
  };

  React.useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const { data: patientDetailsFromApi } = await axios.get<Patient>(
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

  const getEntryType = (values: EntryFormValues) => {
    let type;
    if (isHealthCheckEntry(values)) {
      type = "HealthCheck";
    } else if (isOccupationalHealthcareEntry(values)) {
      type = "OccupationalHealthcare";
    } else if (isHospitalEntry(values)) {
      type = "Hospital";
    }

    return type;
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    let entry;
    const type = getEntryType(values);

    if (isOccupationalHealthcareEntry(values)) {
      if (
        values.sickLeave &&
        values.sickLeave.startDate !== "" &&
        values.sickLeave.endDate !== ""
      ) {
        entry = { ...values, type };
      } else {
        entry = { ...values, type, sickLeave: undefined };
      }
    } else if (isHospitalEntry(values)) {
      if (
        values.discharge &&
        values.discharge.date !== "" &&
        values.discharge.criteria !== ""
      ) {
        entry = { ...values, type };
      } else {
        entry = { ...values, type, discharge: undefined };
      }
    }

    try {
      const { data: newEntry } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        entry
      );

      dispatch(addEntry(newEntry));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
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

      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        onClose={closeModal}
        error={error}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </section>
  );
};

export default PatientDetailPage;
