function calc() {
    const firstElement = document.getElementById("num1").value;
    const secondElement = document.getElementById("num2").value;
    let sum = document.getElementById('sum').value;

    let first = Number(firstElement);
    let second = Number(secondElement);
    
    sum = first + second;
    document.getElementById('sum').value = sum;
    
}
