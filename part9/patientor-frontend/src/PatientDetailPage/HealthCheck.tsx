import React from "react";
import { Segment, Icon } from "semantic-ui-react";
import { HealthCheckEntry, HealthCheckRating } from "../types";

import Date from "./Date";
import Description from "./Description";
import Diagnoses from "./Diagnoses";

interface HealthCheckProps {
  entry: HealthCheckEntry;
}
const HealthCheck: React.FC<HealthCheckProps> = ({ entry }) => {
  const getHealthCheckIcon = () => {
    if (entry.healthCheckRating === HealthCheckRating.Healthy) {
      return <Icon name="heart" size="small" color="green" />;
    } else if (entry.healthCheckRating === HealthCheckRating.LowRisk) {
      return <Icon name="heart" size="small" color="yellow" />;
    } else if (entry.healthCheckRating === HealthCheckRating.HighRisk) {
      return <Icon name="heart" size="small" color="orange" />;
    } else if (entry.healthCheckRating === HealthCheckRating.CriticalRisk) {
      return <Icon name="heart" size="small" color="red" />;
    }
  };
  return (
    <Segment>
      <div>
        <Date>{entry.date}</Date>
        <span>
          <Icon name="user md" size="large" />
        </span>
      </div>

      <Description>{entry.description}</Description>

      {entry.diagnosisCodes && <Diagnoses entry={entry} />}

      <div>{getHealthCheckIcon()}</div>
    </Segment>
  );
};

export default HealthCheck;
