import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import styles from "./AddEntryForm.module.css";

import {
  TextField,
  DiagnosisSelection,
  NumberField,
} from "../AddPatientModal/FormField";
import { NewEntry, HealthCheckRating } from "../types";
import { useStateValue } from "../state";
import { isValidDate, isValidHealthCeckValue } from "../utils";

export type EntryFormValues = Omit<NewEntry, "id" | "type">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        healthCheckRating: -1,
        employerName: "",
        sickLeave: { startDate: "", endDate: "" },
        discharge: { date: "", criteria: "" },
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        let errors:
          | { [field: string]: string }
          | {
              [key: string]: {
                [key: string]: string;
              };
            } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!isValidDate(values.date)) {
          errors.date = "Please provide the date in the format YYYY-MM-DD";
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (
          values.healthCheckRating !== -1 &&
          !isValidHealthCeckValue(values.healthCheckRating)
        ) {
          errors.healthCheckRating =
            "Please provide a valid health check rating between 0 and 3";
        }
        if (
          values.sickLeave?.startDate &&
          values.sickLeave?.endDate &&
          !values.employerName &&
          values.healthCheckRating === -1
        ) {
          errors.employerName = requiredError;
        }

        if (
          values.sickLeave?.startDate &&
          values.sickLeave?.endDate &&
          values.employerName &&
          values.healthCheckRating === -1 &&
          (!isValidDate(values.sickLeave?.startDate) ||
            !isValidDate(values.sickLeave?.endDate))
        ) {
          errors = {
            ...errors,
            sickLeave: {
              startDate:
                "Please provide start and enddate in YYYY-MM-DD format.",
            },
          };
        }

        if (
          values.discharge?.date &&
          !values.employerName &&
          values.healthCheckRating === -1 &&
          !isValidDate(values.discharge?.date)
        ) {
          errors = {
            ...errors,
            discharge: {
              date: "Please provide a discharge date in YYYY-MM-DD format.",
            },
          };
        }

        if (
          (values.employerName && values.discharge?.date) ||
          (values.employerName && values.discharge?.criteria)
        ) {
          errors = {
            ...errors,
            discharge: {
              date:
                "Occupational health entry does not support discharge date and/or criteria. Please remove these values.",
            },
          };
        }
        if (
          (values.healthCheckRating !== -1 && values.discharge?.date) ||
          (values.healthCheckRating !== -1 && values.discharge?.criteria)
        ) {
          errors = {
            ...errors,
            discharge: {
              date:
                "Healthcheck entry does not support discharge date and/or criteria. Please remove these values.",
            },
          };
        }
        if (
          (values.healthCheckRating !== -1 && values.sickLeave?.startDate) ||
          (values.healthCheckRating !== -1 && values.sickLeave?.endDate)
        ) {
          errors = {
            ...errors,
            sickLeave: {
              startDate:
                "Healthcheck entry does not support sickLeave startdate and/or enddate. Please remove these values.",
            },
          };
        }
        if (
          (values.employerName &&
            values.healthCheckRating === HealthCheckRating.Healthy) ||
          (values.employerName &&
            values.healthCheckRating === HealthCheckRating.LowRisk) ||
          (values.employerName &&
            values.healthCheckRating === HealthCheckRating.HighRisk) ||
          (values.employerName &&
            values.healthCheckRating === HealthCheckRating.CriticalRisk)
        ) {
          errors.employerName =
            "HealthCheck entry does not support employername. Please remove this value if you want to add a healthcheck entry.";
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />

            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Field
              label="healthCheckRating"
              name="healthCheckRating"
              component={NumberField}
              min={-1}
              max={3}
            />

            <Field
              label="Employer Name"
              placeholder="Employer Name"
              name="employerName"
              component={TextField}
            />

            <div className={styles.doubleField}>
              <div className={styles.inputFieldContainer}>
                <Field
                  label="SickLeave Start Date"
                  placeholder="Start Date"
                  name="sickLeave.startDate"
                  component={TextField}
                />
              </div>
              <Field
                label="SickleaveEnd Date"
                placeholder="SickLeave End Date"
                name="sickLeave.endDate"
                component={TextField}
              />
            </div>

            <div className={styles.doubleField}>
              <div className={styles.inputFieldContainer}>
                <Field
                  label="Discharge Date"
                  placeholder="Discharge Date"
                  name="discharge.date"
                  component={TextField}
                />
              </div>
              <Field
                label="Discharge criteria"
                placeholder="Discharge criteria"
                name="discharge.criteria"
                component={TextField}
              />
            </div>

            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
