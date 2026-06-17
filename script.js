const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const clearAllButton = document.querySelector("#ac");
const display = document.querySelector("#display");

let numA = null;
let numB = null;
let operator = "";
let lastUsedOperator = "";

numberButtons.forEach((button) => {
    button.addEventListener("click", () => runNumber(button.id));
});

operatorButtons.forEach((button) => {
    button.addEventListener("click", () => runOperation(button.id));
});

clearAllButton.addEventListener("click", () => {
    restart();
    clearDisplay();
    display.textContent = "0"; // Reset visual display back to zero
});

function runNumber (number) {
    if (number === "negative") {
        if (display.textContent === "0" || display.textContent === "") {
            numA = "-0";
            display.textContent = numA;
            return;
        }
        return;
    }

    if (operator === "" || operator === "equals") {
        if (numA === null || numA === 0) numA = "";
        numA = Number(`${numA}` + number);
        display.textContent = numA;
    } else {
        if (numB === null || numB === 0) numB = "";
        numB = Number(`${numB}` + number);
        display.textContent = numB;
    }
}

function runOperation (symbol) {
    if (numA === null && numB === null) return;

    if (symbol === "equals") {
        // FIXED: Changed || to && so it properly filters out both values
        if (numA !== null && numB !== null && operator !== "" && operator !== "equals") {
            numA = operate(numA, numB, operator);
            display.textContent = numA;
        } else if (numA !== null && numB !== null && operator === "equals") {
            numA = operate(numA, numB, lastUsedOperator);
            display.textContent = numA;
        } else if (numA !== null && operator !== "" && operator !== "equals") {
            numB = numA;
            numA = operate(numA, numB, operator);
            display.textContent = numA;
        } else {
            return;
        }
    } else {
        if (numA !== null && numB !== null && operator !== "" && operator !== "equals") {
            numA = operate(numA, numB, operator);
            display.textContent = numA;
        }
        numB = null;
    }
    if (symbol !== "equals") lastUsedOperator = symbol;
    operator = symbol;
}

function clearDisplay () {
    display.textContent = '';
}

function restart () {
    numA = null;
    numB = null;
    operator = "";
    lastUsedOperator = "";
}

function add (a, b) { return a + b; }

function subtract (a, b) {
    return a - b;
}

function multiply (a, b) {
    return a * b;
}

function divide (a, b) {
    if (b == 0) return "No";
    return a / b;
}

function operate (a, b, operator) {
    if (operator == "plus") {
        return add(a, b);
    } else if (operator == "subtract") {
        return subtract(a, b);
    } else if (operator == "multiply") {
        return multiply(a, b);
    } else if (operator == "divide") {
        return divide(a, b);
    } else {
        return "Could not calculate.";
    }
}