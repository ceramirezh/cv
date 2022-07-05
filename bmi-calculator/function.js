function calculateBMI(weight, height) {
    const BMI = weight/ (height * height)
    return BMI;
}

const BMI = calculateBMI(80, 1.8)
console.log(BMI);
