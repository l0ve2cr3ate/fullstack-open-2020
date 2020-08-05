/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/restrict-plus-operands, @typescript-eslint/no-unsafe-member-access */
import { NewPatient, Gender, Entry } from "./types";

const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (dateOfBirth: string): boolean => {
  return Boolean(Date.parse(dateOfBirth));
};

const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

const isEntryType = (entry: any): entry is Entry => {
  const healthCheck: boolean = entry.type === "HealthCheck";
  const occupationalHealthcare: boolean =
    entry.type === "OccupationalHealthcare";
  const hospital: boolean = entry.type === "Hospital";

  return healthCheck || occupationalHealthcare || hospital;
};

const parseEntries = (entries: any): Entry[] => {
  if (!entries || entries.map((entry: any) => !isEntryType(entry))) {
    throw new Error("Incorrect or missing entries: " + entries);
  }
  return entries;
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name: " + name);
  }

  return name;
};

const parseSsn = (ssn: any): string => {
  if (!isString(ssn)) {
    throw new Error(`Incorrect ${JSON.stringify(ssn)}`);
  }
  return ssn;
};

const parseDateOfBirth = (dateOfBirth: any): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error("Incorrect or missing date of birth: " + dateOfBirth);
  }
  return dateOfBirth;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation: " + occupation);
  }

  return occupation;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

// eslint-disable-next-line  @typescript-eslint/explicit-module-boundary-types
const toNewPatient = (object: any): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(object.name),
    ssn: parseSsn(object.ssn),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    occupation: parseOccupation(object.occupation),
    gender: parseGender(object.gender),
    entries: parseEntries(object.entries) || [],
  };

  return newPatient;
};

export default toNewPatient;
