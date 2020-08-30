const shortid = require("shortid");

import patientData from "../../data/patients";
import { Patient, NewPatient, PublicPatient, NewEntry, Entry } from "../types";

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

const addEntry = (patient: Patient, newEntry: NewEntry): Patient => {
  const id: string = shortid.generate();

  const entryToAdd: Entry = {
    ...newEntry,
    id,
  };
  patient.entries.push(entryToAdd);

  return patient;
};

export default {
  getPatients,
  findPatientById,
  addPatient,
  addEntry,
};
