// function addAndSubtract(firstNumber, secondNumber, thirdNumber) {
//     let sum = (a, b) => a + b;
//     let subtract = (a, b) => a - b;
//     return subtract(sum(firstNumber, secondNumber), thirdNumber);
// }

const addAndSubtract = (firstNumber, secondNumber, thirdNumber) => {
    let sum = (a, b) => a + b;
    let subtract = (a, b) => a - b;
    return subtract(sum(firstNumber, secondNumber), thirdNumber);
}

console.log(addAndSubtract(23, 6, 10));