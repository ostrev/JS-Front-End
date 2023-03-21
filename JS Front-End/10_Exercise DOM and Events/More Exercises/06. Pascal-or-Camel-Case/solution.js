function solve() {
    const text = document.getElementById('text').value;
    const type = document.getElementById('naming-convention').value;
    const resultRef = document.getElementById('result');
    let textArray = text.split(' ');
    textArray
        .forEach((word, index) => {
            textArray[index] = word.toLowerCase();
        });
    let resultWord = ''
    if (type === "Camel Case") {
        for (let i = 1; i < textArray.length; i += 1) {
            textArray[i] = capitalizeFirstLetter(textArray[i])
        }
        resultWord = textArray.join('');
    } else if (type === "Pascal Case") {
        for (let i = 0; i < textArray.length; i += 1) {
            textArray[i] = capitalizeFirstLetter(textArray[i])
        }
        resultWord = textArray.join('');
    } else {
        resultWord = 'Error!'
    }

    resultRef.textContent = resultWord;

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    document.getElementById('text').value = '';
    document.getElementById('naming-convention').value = '';
}