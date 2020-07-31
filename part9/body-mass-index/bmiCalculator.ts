export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / ((height / 100) * (height / 100));

  if (bmi < 15) {
    console.log("Very severely underweight");
    return "Very severely underweight";
  } else if (bmi >= 15 && bmi < 16) {
    console.log("Severely underweight");
    return "Severely underweight";
  } else if (bmi >= 16 && bmi < 18.5) {
    console.log("Underweight");
    return "Underweight";
  } else if (bmi >= 18.5 && bmi < 25) {
    console.log("Normal (healthy weight)");
    return "Normal (healthy weight)";
  } else if (bmi >= 25 && bmi < 30) {
    console.log("Overweight");
    return "Overweight";
  } else if (bmi >= 30 && bmi < 35) {
    console.log("Obese Class I (Moderately obese)");
    return "Obese Class I (Moderately obese)";
  } else if (bmi >= 35 && bmi < 40) {
    console.log("Obese Class II (Severely obese)");
    return "Obese Class II (Severely obese)";
  } else if (bmi >= 40) {
    console.log("Obese Class III (Very severely obese)");
    return "Obese Class III (Very severely obese)";
  }
  return `Oops something went wrong, unable to calculate bmi`;
};
