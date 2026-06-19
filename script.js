const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const clearAllButton = document.querySelector("#ac");
const display = document.querySelector("#display");

// Track numbers as strings for clean inline text concatenation
let numA = "";
let numB = "";
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
    display.textContent = "0"; // Default visual display reset
});

// Helper function to translate internal IDs into reader-friendly math symbols
function getOperatorSymbol(op) {
    if (op === "plus") return " + ";
    if (op === "subtract") return " - ";
    if (op === "multiply") return " × ";
    if (op === "divide") return " ÷ ";
    return "";
}

// Global update helper to keep the entire expression rendered dynamically
function updateExpressionDisplay() {
    let currentExpression = numA + getOperatorSymbol(operator) + numB;
    display.textContent = currentExpression || "0";
}

function runNumber (number) {
if (number == "negative") {
        if (operator == "" || operator == "equals") {
            // If numA doesn't exist yet, make it 0 so we can flip it
            if (numA == null) numA = 0; 
            numA = numA * -1; // Toggle between positive and negative
            display.textContent = numA;
        } else {
            if (numB == null) numB = 0;
            numB = numB * -1; // Toggle numB if we are working on the second number
            display.textContent = numB;
        }
        return; // Exit the function so it doesn't try to append text
    }

    if (operator === "" || operator === "equals") {
        if (operator === "equals") {
            numA = "";
            operator = "";
        }
        if (numA === "0" && number === "0") return;
        if (numA === "0") numA = "";
        
        numA += number;
    } else {
        if (numB === "0" && number === "0") return;
        if (numB === "0") numB = "";
        
        numB += number;
    }
    updateExpressionDisplay();
}

function runOperation (symbol) {
    if (numA === "") return;

    if (symbol === "equals") {
        if (numA !== "" && numB !== "" && operator !== "" && operator !== "equals") {
            let result = operate(Number(numA), Number(numB), operator);
            display.textContent = result;
            numA = String(result);
            numB = "";
            lastUsedOperator = operator;
        } else if (numA !== "" && numB !== "" && operator === "equals") {
            let result = operate(Number(numA), Number(numB), lastUsedOperator);
            display.textContent = result;
            numA = String(result);
            numB = "";
        } else if (numA !== "" && operator !== "" && operator !== "equals") {
            numB = numA;
            let result = operate(Number(numA), Number(numB), operator);
            display.textContent = result;
            numA = String(result);
            numB = "";
        } else {
            return;
        }
        operator = "equals";
    } else {
        if (numA !== "" && numB !== "" && operator !== "" && operator !== "equals") {
            let result = operate(Number(numA), Number(numB), operator);
            numA = String(result);
            numB = "";
        }
        if (operator === "equals") {
            operator = "";
        }
        operator = symbol;
        updateExpressionDisplay();
    }
}

function restart () {
    numA = "";
    numB = "";
    operator = "";
    lastUsedOperator = "";
}

function add (a, b) { return a + b; }
function subtract (a, b) { return a - b; }
function multiply (a, b) { return a * b; }
function divide (a, b) { return b === 0 ? "No" : a / b; }

function operate (a, b, operator) {
    if (operator === "plus") return add(a, b);
    if (operator === "subtract") return subtract(a, b);
    if (operator === "multiply") return multiply(a, b);
    if (operator === "divide") return divide(a, b);
    return "Could not calculate.";
}