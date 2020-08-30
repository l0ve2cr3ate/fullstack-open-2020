import express from "express";
import patientService from "../services/patientService";
import toNewPatient, { toNewEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getPatients());
});

router.get("/:id", (req, res) => {
  const patient = patientService.findPatientById(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);

    const addedPatient = patientService.addPatient(newPatient);

    res.json(addedPatient);
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e?.message);
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const patient = patientService.findPatientById(req.params.id);

    const newEntry = toNewEntry(req.body);

    if (patient && newEntry) {
      const addedEntry = patientService.addEntry(patient, newEntry);
      res.json(addedEntry);
    }
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message);
  }
});

export default router;
