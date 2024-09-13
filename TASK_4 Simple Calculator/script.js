const screen = document.querySelector(".screen");
const buttons = document.querySelectorAll("button");
const operators = ["%", "/", "*", "-", "+", "="];
let result = "";

const calculate = (buttonValue) => {
    if (buttonValue === "=" && result !== "") {
        try {
            result = eval(result.replace("%", "/100"));
        } catch (error) {
            result = "Error"; 
        }
    } else if (buttonValue === "AC") {
        result = "";
    } else if (buttonValue === "DEL") {
        result = result.toString().slice(0, -1);
    } else {
        if (result === "" && operators.includes(buttonValue)) return;
        result += buttonValue;
    }
    screen.value = result;
};

buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
        const buttonValue = e.target.dataset.value;
        calculate(buttonValue);
    });
});
