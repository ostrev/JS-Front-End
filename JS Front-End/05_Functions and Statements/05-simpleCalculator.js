function simpleCalculator(firstParameter, secondParameter, operator) {
    const add = (a, b) => a + b;
    const subtract = (a, b) => a - b;
    const multiply = (a, b) => a * b;
    const divide = (a, b) => a / b;
    const operationMap = {
        add: add,
        subtract: subtract,
        multiply: multiply,
        divide: divide
    }
    return operationMap[operator](firstParameter, secondParameter);
}

console.log(
    simpleCalculator(5, 5, 'multiply')
    );