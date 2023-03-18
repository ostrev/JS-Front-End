function subtract() {
    const firstNumRef = document.getElementById('firstNumber');
    const secondNumRef = document.getElementById('secondNumber');
    const resultRef = document.getElementById('result');

    let firstNum = Number(firstNumRef.value);
    let secondNum = Number(secondNumRef.value);

    let sum = firstNum - secondNum;

    resultRef.textContent = sum;

}