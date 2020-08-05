import diagnoseData from "../../data/diagnose.json";

import { Diagnosis } from "../types";

const diagnoses: Array<Diagnosis> = diagnoseData;

const getDiagnoses = (): Array<Diagnosis> => {
  return diagnoses;
};

export default {
  getDiagnoses,
};
