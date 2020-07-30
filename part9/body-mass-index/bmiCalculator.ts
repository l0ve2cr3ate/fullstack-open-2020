const calculateBmi = (height: number, weight: number) => {
  const bmi = weight / ((height / 100) * (height / 100));

  if (bmi < 15) {
    console.log("Very severely underweight");
  } else if (bmi >= 15 && bmi < 16) {
    console.log("Severely underweight");
  } else if (bmi >= 16 && bmi < 18.5) {
    console.log("Underweight");
  } else if (bmi >= 18.5 && bmi < 25) {
    console.log("Normal (healthy weight)");
  } else if (bmi >= 25 && bmi < 30) {
    console.log("Overweight");
  } else if (bmi >= 30 && bmi < 35) {
    console.log("Obese Class I (Moderately obese)");
  } else if (bmi >= 35 && bmi < 40) {
    console.log("Obese Class II (Severely obese)");
  } else if (bmi >= 40) {
    console.log("Obese Class III (Very severely obese)");
  }
};

interface BmiInputValues {
  weight: number;
  height: number;
}

const parseArguments = (args: Array<string>): BmiInputValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error(
      "Provided values were not numbers! Please give in your height and weight."
    );
  }
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (e) {
  console.log(`Oh no, something went wrong. ${e}`);
}
