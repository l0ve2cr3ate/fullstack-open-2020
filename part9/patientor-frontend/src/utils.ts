import {
  HealthCheckRating,
  HealthCheckEntry,
  OccupationalHealthcareEntry,
  HospitalEntry,
} from "./types";

// Helper function for exhaustive type checking
export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const isHealthCheckEntry = (values: any): values is HealthCheckEntry => {
  return (
    values.healthCheckRating === HealthCheckRating.LowRisk ||
    values.healthCheckRating === HealthCheckRating.Healthy ||
    values.healthCheckRating === HealthCheckRating.HighRisk ||
    values.healthCheckRating === HealthCheckRating.CriticalRisk
  );
};

export const isOccupationalHealthcareEntry = (
  values: any
): values is OccupationalHealthcareEntry => {
  return values.employerName && values.employerName !== "";
};

export const isHospitalEntry = (values: any): values is HospitalEntry => {
  if (
    !values.healthCheckRating ||
    values.healthCheckRating !== 0 ||
    !values.employerName ||
    values.employerName === ""
  ) {
    return true;
  }
  return false;
};

export const isValidDate = (date: any): boolean => {
  const regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (!date.match(regEx)) return false; // Invalid format
  const d = new Date(date);
  const dNum = d.getTime();
  if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
  return d.toISOString().slice(0, 10) === date;
};

export const isValidHealthCeckValue = (value: any): boolean => {
  return (
    value === HealthCheckRating.Healthy ||
    value === HealthCheckRating.LowRisk ||
    value === HealthCheckRating.HighRisk ||
    value === HealthCheckRating.CriticalRisk
  );
};
