function solve(numberOne, numberTwo, operator) {
    let result
    switch(operator) {
        case '+':
            result = numberOne + numberTwo;
            break;
        case '-':
            result = numberOne - numberTwo;
            break;
        case '*':
            result = numberOne * numberTwo;
            break;
        case '/':
            result = numberOne / numberTwo;
            break;
        case '%':
            result = numberOne % numberTwo;
            break;
        case '**':
            result = numberOne ** numberTwo;
            break;
    }
    console.log(result)
}

solve(4, 2, '%')