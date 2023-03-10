function factorialDivision(firstNumber, secondNumber) {

    function getFactorial(num) {
        if (num === 1) {
            return num
        }

        return num * getFactorial(num - 1);
    }
    let result = getFactorial(firstNumber) / getFactorial(secondNumber)
    return result.toFixed(2)
}

console.log(factorialDivision(6, 2));
