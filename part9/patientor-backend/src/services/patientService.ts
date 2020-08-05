import patientData from "../../data/patients";

import { Patient, NewPatient, PublicPatient } from "../types";

const patients: Array<Patient> = patientData;

const getPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const findPatientById = (id: string): Patient | undefined => {
  let patient = patients.find((p) => p.id === id);

  if (patient && !patient?.entries)
    patient = {
      ...patient,
      entries: [],
    };

  return patient;
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient: Patient = {
    id: (patients.length + 1).toString(),
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  findPatientById,
  addPatient,
};
