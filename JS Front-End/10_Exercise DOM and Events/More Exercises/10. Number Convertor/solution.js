function solve() {
    const buttonRef = document.getElementsByTagName('button')[0];

    const convertToRef = document.getElementById('selectMenuTo');

    buttonRef.addEventListener('click', calc);

    let optionBin = document.createElement('option');
    optionBin.textContent = 'Binary';
    optionBin.value = 'binary';

    let optionHex = document.createElement('option');
    optionHex.textContent = 'Hexadecimal';
    optionHex.value = 'hexadecimal';

    convertToRef.appendChild(optionBin);
    convertToRef.appendChild(optionHex);


    function calc() {
        const input = document.getElementById('input').value;
        const convertToRef = document.getElementById('selectMenuTo');
        if (convertToRef.value === 'binary') {
            let inputE = Number(input);
            let result = inputE.toString(2);
            document.getElementById('result').value = result
        } else if (convertToRef.value === 'hexadecimal') {
            let inputE = Number(input);
            let result = inputE.toString(16);
            let resultUp = String(result).toUpperCase();
            document.getElementById('result').value = resultUp 
        } 
    }
}