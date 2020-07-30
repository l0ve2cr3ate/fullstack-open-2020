interface ExerciseHourResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
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

interface ExerciseInputValues {
  exerciseHours: number[];
  target: number;
}

const parseExerciseArguments = (args: Array<string>): ExerciseInputValues => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const exerciseValues = args.slice(2);

  const notValid = exerciseValues.some((arg) => isNaN(Number(arg)));

  const validArgs = exerciseValues.map((arg) =>
    !isNaN(Number(arg)) ? Number(arg) : null
  );

  const target = validArgs.shift();

  const exerciseHours = validArgs;

  if (!notValid) {
    return {
      exerciseHours,
      target,
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

try {
  const { exerciseHours, target } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(exerciseHours, target));
} catch (e) {
  console.log(`Oh no, something went wrong. ${e}`);
}
