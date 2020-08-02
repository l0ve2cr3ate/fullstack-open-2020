export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  occupation: string;
}

export type NewPatient = Omit<Patient, "id">;

export enum Gender {
  male = "male",
  female = "female",
  other = "other",
}
