// insert this into index.js at the top of the file
// We need exactly 5 inputs, so if we don't have that something is wrong

if (process.argv.length !== 7) {
    console.log(`
      You gave ${process.argv.length - 2} arguments(s) to the program
  
      Please provide 5 arguments for
      
      weight (kg), 
      height (m), 
      age (years), 
      whether you exercise daily (yes or no)
      and your gender (m or f)
      
      Example:
  
      $ node index.js 82 1.79 32 yes m
    `);
  
    process.exit();
  }

const weightInKg = parseInt(process.argv[2]); // parse a whole number
const heightInM = parseFloat(process.argv[3]); //parse a decimal number
const age = parseInt(process.argv[4]);
const heightInCm = heightInM * 100; 
const dailyExercise = process.argv[5];
const gender = process.argv[6]

// The following are copy pate examples
if (isNaN(weightInKg) || isNaN(heightInM) || isNaN(age)) {
    console.log(`
      Please make sure weight, height and age are numbers:
  
      weight (kg) example: 82 | your input: ${process.argv[2]}
      height (m) example 1.79 | your input: ${process.argv[3]}
      age (years) example 32  | your input: ${process.argv[4]} 
  
      $ node index.js 82 1.79 32 yes m
    `);
}
// until here

if (age <= 20) {
    console.log(`
    WARNING!
    This BMI calculator is designed for people over 20 years old. 
    Values here do not apply.
    `);
}
if (weightInKg > 300 || weightInKg < 30) {
    console.log(`
    WARNING! 
    Please provide a number for weight in kilograms between 30 and 300

    weigh (kg example): 120  | your input: ${process.argv[2]}
    weigh (kg example): 45   |
    `)
}
if (dailyExercise !== "yes" && dailyExercise !== "no") {
    console.log(`
    WARNING!
    Please specify if you exercise daily with "yes" or "no":

    Daily Exercise example: yes | Your input: ${process.argv[5]}

    `);
}

// The formula for BMI: weight (in kg) / (height (in m) X height (in m))
const BMI = weightInKg / (heightInM * heightInM);

// Assumption 22.5 BMI is ideal
// The formula for ideal weight: IdealBMI X height (m) X height 
const idealWeight = 22.5 * heightInM * heightInM;

// The formula for calories per day
var bmr; 
    if (gender === "f") {
        bmr = (10 * weightInKg) + (6.25 * heightInCm) - (5 * age) - 150 
    } else {
        bmr = (10 * weightInKg) + (6.25 * heightInCm) - (5 * age) + 50
    }

var caloriesDay; //there is a difference here if I write const or let!

    if (dailyExercise === "yes") {
    caloriesDay = 1.6 * bmr

    } else {
       caloriesDay = 1.4 * bmr
    }
const weightToLose = weightInKg - idealWeight

var timeInWeeks = Math.abs(weightToLose / 0.5)

var targetCalories;
    if (weightToLose < 0) {
        targetCalories = caloriesDay + 500
    } else {
            targetCalories = caloriesDay - 500
    } 

console.log(`
**************
BMI CALCULATOR
**************

age: ${age}
gender: ${gender}
height: ${heightInM} m
weight: ${weightInKg} kg
Do you exercise daily? ${dailyExercise}


**************
FACING THE FACTS 
**************

Your BMI is ${Math.round(BMI)}

A BMI under 18.5 is considered underweight
A BMI above 25 is considered overweight

Your ideal weight is ${Math.round(idealWeight)} kg.
With a normal lifestyle you can burn ${Math.round(caloriesDay)} calories a day.

**************
Diet Plan 
**************

If you want to reach your ideal weight of ${Math.round(idealWeight)} kg:
Eat ${Math.round(targetCalories)} a day 
For ${Math.round(timeInWeeks)} weeks
`);