function runNumber (number) {
    if (number == "negative") {
        if (display.textContent == 0 || display.textContent == "") {
            numA = "-0";
            display.textContent = numA;
            return;
        }
        return;
    }
    if (operator == "" || operator == "equals") {
        if (numA == null) numA = 0;
        numA = Number(`${numA}` + number);
        display.textContent = numA;
    }  else {
        if (numB == null) numB = 0;
        numB = Number(`${numB}` + number);
        display.textContent = numB;
        return;
    }
    if (numA != null && numB != null) {
        restart();
        if (numA == null) numA = 0;
        numA = Number(`${numA}` + number);
        display.textContent = numA;
    }
}
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const clearAllButton = document.querySelector("#ac");
const display = document.querySelector("#display");

numberButtons.forEach((button) => {
    button.addEventListener("click", () => runNumber(button.id));
});

operatorButtons.forEach((button) => {
    button.addEventListener("click", () => runOperation(button.id));
});

clearAllButton.addEventListener("click", () => {
    restart();
    clearDisplay();
});

function runNumber (number) {
    if (number == "negative") {
        if (display.textContent == 0 || display.textContent == "") {
            numA = "-0";
            display.textContent = numA;
            return;
        }
        return;
    }
    if (operator == "" || operator == "equals") {
        if (numA == null) numA = 0;
        numA = Number(`${numA}` + number);
        display.textContent = numA;
    }  else {
        if (numB == null) numB = 0;
        numB = Number(`${numB}` + number);
        display.textContent = numB;
        return;
    }
    if (numA != null && numB != null) {
        restart();
        if (numA == null) numA = 0;
        numA = Number(`${numA}` + number);
        display.textContent = numA;
    }
}
function runOperation (symbol) {
    if (numA == null && numB == null) return;

    if (symbol == "equals") {
        if (numA != null && numB != null && (operator != "" || operator != "equals")) {
            numA = operate(numA, numB, operator);
            display.textContent = numA;
        } else if (numA != null && numB != null && operator == "equals") {
            numA = operate(numA, numB, lastUsedOperator);
            display.textContent = numA;
        } else if (numA != null && (operator != "" || operator != "equals")) {
            numB = numA;
            numA = operate(numA, numB, operator);
            display.textContent = numA;
        } else {
            return;
        }
    } else {
        if (numA != null && numB != null && operator != "" && operator != "equals") {
            numA = operate(numA, numB, operator);
            display.textContent = numA;
        }
        numB = null;
    }
    if (symbol != "equals") lastUsedOperator = symbol;
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

function add (a, b) {
    return a + b;
}

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