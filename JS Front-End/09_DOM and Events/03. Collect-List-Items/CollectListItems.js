function extractText() {
    const liElements = document.querySelectorAll('#items > li');
    const textArea = document.getElementById('result');
    
    for (let line of liElements) {
        textArea.value += line.textContent + '\n'
    }
}