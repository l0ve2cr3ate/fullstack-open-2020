import diagnoseData from "../../data/diagnose.json";

import { Diagnose } from "../types";

const diagnoses: Array<Diagnose> = diagnoseData;

const getDiagnoses = (): Array<Diagnose> => {
  return diagnoses;
};

export default {
  getDiagnoses,
};
