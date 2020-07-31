interface ExerciseHourResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number | undefined;
  ratingDescription: string | undefined;
  target: number;
  average: number;
}

export const calculateExercises = (
  exerciseHours: number[],
  target: number
): ExerciseHourResult => {
  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.filter((exerciseHour) => exerciseHour > 0)
    .length;
  const average =
    exerciseHours.reduce((a, b) => a + b, 0) / exerciseHours.length;
  const success = average >= target;
  let rating;
  let ratingDescription;
  if (average < target) {
    rating = 1;
    ratingDescription = `Too bad you didn't reach your exercise goals this week, try again next week`;
  } else if (target === average) {
    rating = 2;
    ratingDescription = `Well done, you accomplished your exercise goals for this week!`;
  } else if (average > target) {
    rating = 3;
    ratingDescription = `Wooh, you did exercise more than you planned. Well done!`;
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};
