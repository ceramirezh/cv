// Validation functions
function validateNumberOfInputs(argv) {
    console.log(argv);

    if (argv.length !== 7) {
        console.log(`
            You gave ${argv.length - 2} argument(s) to the program
  
      Please provide 5 arguments for
      
      weight (kg), 
      height (m), 
      age (years), 
      wether you exercise daily (yes or no)
      and your gender (m or f)
      
      Example:
  
      $ node index.js 82 1.79 32 yes m
        `);

        process.exit();
    }
}
function validateWeightHeightAge(weight, height, age) {
    console.log(weight, height, age);

    if (isNaN(weight) || isNaN(height) || isNaN(age)) {
        console.log(`
          Please make sure weight, height and age are numbers:
      
          weight (kg) example: 82 | your input: ${weight}
          height (m) example 1.79 | your input: ${height}
          age (years) example 32  | your input: ${age} 
      
          $ node index.js 82 1.79 32 yes m
        `);
    }

    if (age <= 20) {
        console.log(`
        WARNING!
        This BMI calculator is designed for people over 20. 
        Values here do not apply.
        `);
    }
    
    if (weight > 300 || weight < 30) {
        console.log(`
        WARNING! 
        Please provide a number for weight in kilograms between 30 and 300
    
        weigh (kg example): 120  | your input: ${process.argv[2]}
        weigh (kg example): 45   |
        `)
    process.exit();
    }

}
function validationOfDailyExercise(exercise) {
    if (exercise !== "yes" && exercise !== "no") {
        console.log(
        `WARNING! 
        Please provide a valid answer for exercise.
        
        For example:
        
        Do you do exercise daily: "yes" or "no" | Your input: ${process.argv[5]}
        `) 
        process.exit();
    }
    
}
function validationOfGender(gender) {
    if (gender !== "m" && gender !== "f") {
        console.log(
        `WARNING! 
        Please provide a valid answer for gender.
        
        For example:
        
        Gender: "m" or "f" | Your input: ${process.argv[6]}
        `) 
        process.exit();
    }
    
}

// Calculation functions
function calculateBMI(weight, height) {
    return weight / (height * height);
}
function calculateBMR(weight, height, ageOfUser, genderOfUser) {
    const heightInCm = height * 100
    
    let BMR;

    if (genderOfUser === "f") {
        BMR = 10 * weight + 6.25 * heightInCm - 5 * ageOfUser - 150
    } else {
        BMR = 10 * weight + 6.25 * heightInCm - 5 * ageOfUser + 50;
    }
    
    return BMR; 
}
function calculateIdealWeight(height) {
    
    return 22.5 * height * height
}
function calculateDailyCalories(BMR, exerciseOfUser) {

    let dailyCalories;

    if (exerciseOfUser === "yes") {
        dailyCalories = BMR * 1.6
    } else {
        dailyCalories = BMR * 1.4
    }

    return dailyCalories;
}
function calculateDietInWeeks(weightToLose) {
    return Math.abs(weightToLose / 0.5)
    
}
function calculateDietCalories(weightToLoseOfUser, dailyCaloriesOfUser) {
    let dietInCalories;
    if (weightToLoseOfUser > 0) {
        dietInCalories = dailyCaloriesOfUser - 500
    } else {
        dietInCalories = dailyCaloriesOfUser + 500
    }

    return dietInCalories
}

function formatOutput(userObject) {
    return `
    **************
    BMI CALCULATOR
    **************

    age: ${userObject.age} years
    gender: ${userObject.gender}
    height: ${userObject.heightInM} m
    weight: ${userObject.weightInKg} kg
    do you exercise daily? ${userObject.dailyExercise}

    ****************
    FACING THE FACTS
    ****************

    Your BMI is ${userObject.BMI}

    A BMI under 18.5 is considered underweight
    A BMI above 25 is considered overweight

    Your ideal weight is ${userObject.idealWeight} kg
    With a normal lifestyle you burn ${userObject.dailyCalories} calories a day

    **********
    DIET PLAN
    **********

    If you want to reach your ideal weight of ${userObject.idealWeight} kg:

    Eat ${userObject.dietCalories} calories a day
    For ${userObject.dietInWeeks} weeks
    `;
}
// Main Function
function bmiCalculator() {
    validateNumberOfInputs(process.argv);
    
    const weightInKg = parseInt(process.argv[2]);
    const heightInM = parseFloat(process.argv[3]);
    const age = parseInt(process.argv[4]);
    const dailyExercise = (process.argv[5]);
    const gender = (process.argv[6]);

    // In my original version these where at the top. I guess because this ones need to be taken into account once all the arguments are in place, they need to go under the arguments that come form user's input. 
    validateWeightHeightAge(process.argv[2], process.argv[3], process.argv[4]);
    validationOfDailyExercise(process.argv[5]);
    validationOfGender(process.argv[6]); 

    const BMI = calculateBMI(weightInKg, heightInM);
    const BMR = calculateBMR(weightInKg, heightInM, age, gender);
    const idealWeight = calculateIdealWeight(heightInM);
    const dailyCalories = calculateDailyCalories(BMR, dailyExercise);
    const weightToLose = weightInKg - idealWeight
    const dietInWeeks = calculateDietInWeeks(weightToLose);
    const dietCalories = calculateDietCalories(weightToLose, dailyCalories);

    // //NOTE: ALl the consolo.log were replaced by an User Object that constains all the data:
    // console.log("Weight:", weightInKg);
    // console.log("Height:", heightInM);
    // console.log("Age:", age);
    // console.log("Daily Exercise:", dailyExercise);
    // console.log("Gender:", gender);
    // console.log("BMI:", BMI);
    // console.log("Ideal Weight:", idealWeight);
    // console.log("BMR:", BMR);
    // console.log("Daily Calories:", dailyCalories);
    // console.log("Weight to lose:", weightToLose);
    // console.log("Diet in Weeks", Math.abs(dietInWeeks));
    // console.log("Diet Calories", dietCalories);

    const user = {
        weightInKg: weightInKg,
        heightInM: heightInM,
        age: age,
        dailyExercise: dailyExercise,
        gender: gender,
        BMI: BMI,
        idealWeight: idealWeight,
        dailyCalories: dailyCalories,
        weightToLose: weightToLose,
        dietInWeeks: Math.abs(dietInWeeks),
        dietCalories: dietCalories,
    };

    const output = formatOutput(user);

    console.log(output);
}

bmiCalculator();