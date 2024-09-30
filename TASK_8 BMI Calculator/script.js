function calculateBMI() {
    const weight = document.getElementById('weight').value;
    const height = document.getElementById('height').value / 100; // Convert height to meters

    if (weight && height) {
        const bmi = (weight / (height * height)).toFixed(2);

        let category = '';
        if (bmi < 18.5) {
            category = 'Underweight';
        } else if (bmi >= 18.5 && bmi <= 24.9) {
            category = 'Normal weight';
        } else if (bmi >= 25 && bmi <= 29.9) {
            category = 'Overweight';
        } else {
            category = 'Obese';
        }

        document.getElementById('result').innerHTML = `Your BMI is ${bmi} (${category})`;
    } else {
        document.getElementById('result').innerHTML = 'Please enter valid weight and height!';
    }
}
