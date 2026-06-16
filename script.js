function runOperation (symbol) {
    if (numA === null && numB === null) return;

    if (symbol === "equals") {
        if (numA != null && numB != null && operator !== "equals") {
            numA = operate(numA, numB, operator);
            display.textContent = numA;
        }
        // Handle repeated equal presses with history tracking
    } else {
        if (numA != null && numB != null && operator !== "") {
            numA = operate(numA, numB, operator);
            display.textContent = numA;
        }
        numB = null;
    }
    if (symbol !== "equals") lastUsedOperator = symbol;
    operator = symbol;
}